// pages/api/events/[userId].ts

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import z from "zod";
import moment from "moment";

const DashboardResponseSchema = z.object({
  overviewData: z.array(
    z.object({
      name: z.string(),
      total: z.number(),
    })
  ),
  totalRevenue: z.string(),
  receivedTickets: z.number(),
  pendingPayouts: z.string(),
  totalEvents: z.number(),
  revenueChange: z.string(),
  transactions: z.array(
    z.object({
      customer: z.string(),
      email: z.string().email(),
      type: z.string(),
      status: z.string(),
      date: z.string(),
      amount: z.string(),
    })
  ),
});

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const userId = session?.user.id;

    if (!userId) {
      return new Response("userId not found", { status: 403 });
    }

    const client = await db;

    // Get user's events
    const userEvents = await client
      .db()
      .collection("events")
      .find({ userId: new ObjectId(userId) })
      .toArray();
    const userEventIds = userEvents.map((event) => event._id);

    const sevenDaysAgo = moment().subtract(7, "days").toDate();

    const overviewDataPipeline = [
      {
        $match: {
          eventId: { $in: userEventIds },
          orderDate: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$orderDate" },
          total: { $sum: "$totalAmountPaid" },
        },
      },
      {
        $project: {
          _id: 0,
          name: {
            $let: {
              vars: {
                daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              },
              in: {
                $arrayElemAt: ["$$daysOfWeek", { $subtract: ["$_id", 1] }],
              },
            },
          },
          total: 1,
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    const overviewData = await client
      .db()
      .collection("orders")
      .aggregate(overviewDataPipeline)
      .toArray();

    // Fill in missing days with 0 total
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const filledOverviewData = daysOfWeek.map((day) => {
      const found = overviewData.find((item) => item.name === day);
      return found || { name: day, total: 0 };
    });

    // Get total revenue for user's events
    const totalRevenuePipeline = [
      {
        $match: { eventId: { $in: userEventIds } },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmountPaid" },
        },
      },
    ];
    const totalRevenueResult = await client
      .db()
      .collection("orders")
      .aggregate(totalRevenuePipeline)
      .toArray();
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Get received tickets count for user's events
    const receivedTickets = await client
      .db()
      .collection("tickets")
      .countDocuments({ eventId: { $in: userEventIds } });

    // Get pending payouts for user's events
    const pendingPayoutsPipeline = [
      {
        $match: {
          eventId: { $in: userEventIds },
          payoutStatus: "pending",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$payoutAmount" },
        },
      },
    ];
    const pendingPayoutsResult = await client
      .db()
      .collection("orders")
      .aggregate(pendingPayoutsPipeline)
      .toArray();
    const pendingPayouts = pendingPayoutsResult[0]?.total || 0;

    // Get total events for the user
    const totalEvents = userEvents.length;

    // Calculate revenue change for user's events (comparing to previous 7 days)
    const previousSevenDays = moment().subtract(14, "days").toDate();
    const revenueChangePipeline = [
      {
        $match: {
          eventId: { $in: userEventIds },
          orderDate: { $gte: previousSevenDays },
        },
      },
      {
        $group: {
          _id: {
            period: {
              $cond: [
                { $gte: ["$orderDate", sevenDaysAgo] },
                "current",
                "previous",
              ],
            },
          },
          total: { $sum: "$totalAmountPaid" },
        },
      },
    ];
    const revenueChangeResult = await client
      .db()
      .collection("orders")
      .aggregate(revenueChangePipeline)
      .toArray();
    const currentRevenue =
      revenueChangeResult.find((r) => r._id.period === "current")?.total || 0;
    const previousRevenue =
      revenueChangeResult.find((r) => r._id.period === "previous")?.total || 0;
    const revenueChange =
      previousRevenue !== 0
        ? (
            ((currentRevenue - previousRevenue) / previousRevenue) *
            100
          ).toFixed(1) + "%"
        : "0%";

    // Get recent transactions for user's events
    const transactionsPipeline = [
      {
        $match: { eventId: { $in: userEventIds } },
      },
      {
        $sort: { orderDate: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          customer: "$customerName",
          email: "$customerEmail",
          type: { $literal: "Ticket Purchase" },
          status: {
            $cond: [
              { $eq: ["$paymentStatus", "completed"] },
              "Approved",
              "Pending",
            ],
          },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          amount: { $toString: "$totalAmountPaid" },
        },
      },
    ];
    const transactions = await client
      .db()
      .collection("orders")
      .aggregate(transactionsPipeline)
      .toArray();

    const response = {
      overviewData: filledOverviewData,
      totalRevenue: `$${totalRevenue.toFixed(2)}`,
      receivedTickets,
      pendingPayouts: `$${pendingPayouts.toFixed(2)}`,
      totalEvents,
      revenueChange,
      transactions,
    };
    // Validate response
    const validatedResponse = DashboardResponseSchema.parse(response);

    return new Response(JSON.stringify(validatedResponse), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
