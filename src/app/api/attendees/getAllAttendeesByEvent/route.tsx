import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

import { ObjectId } from "mongodb";
import { AttendeesInfoSchema } from "@/models/attendeesSchema";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const json = await req.json();
    const { eventId } = json;
    const userId = session.user.id;

    if (!userId) {
      return new Response("userId not found", { status: 403 });
    }

    const client = await db;
    const ticketsCollection = client.db().collection("tickets");
    let matchStage = {};
    if (eventId) {
      try {
        matchStage = { eventId: new ObjectId(eventId as string) };
      } catch (error) {
        console.error("Invalid eventId:", error);
        // If eventId is invalid, we'll fetch all tickets
      }
    }

    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "orders",
          let: { orderId: "$orderId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$orderId"] } } },
            { $project: { orderId: 1, tickets: 1 } },
          ],
          as: "order",
        },
      },
      { $unwind: { path: "$order", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          customerName: 1,
          email: "$customerEmail",
          ticketType: 1,
          checkedInTime: 1,
          checkedIn: 1,
         numberOfTickets: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$order.tickets",
                      as: "ticket",
                      cond: { $eq: ["$$ticket.type", "$ticketType"] },
                    },
                  },
                  0,
                ],
              },
              { quantity: 1 },
            ],
          },
          eventId: { $toString: "$eventId" },
          attendeeId: { $toString: "$_id" },

          orderId: { $ifNull: ["$order.orderId", "N/A"] },
          // checkInStatus: {
          //   $cond: {
          //     if: "$checkedIn",
          //     then: "Checked In",
          //     else: "Not Checked In",
          //   },
          // },
          createdAt: 1, // Assuming there's a createdAt field, if not, you might need to adjust this
        },
      },
      {
        $set: {
          numberOfTickets: "$numberOfTickets.quantity",
        },
      },
      { $sort: { createdAt: -1 } }, // Sort by createdAt in descending order
    ];

    const result = await ticketsCollection.aggregate(pipeline).toArray();

    // const validatedTicketInfo = result.map((ticket) =>
    //   AttendeesInfoSchema.parse(ticket)
    // );

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
