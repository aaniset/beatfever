import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import * as z from "zod";
import { ObjectId } from "mongodb";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const FirstFormSchema = z.object({
  eventName: z
    .string()
    .min(6, { message: "Event name must be at least 6 characters." }),
  eventDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  eventFlyer: z.string({ required_error: "Event flyer is required" }),
  timings: z
    .array(
      z.object({
        startDate: z
          .date({ required_error: "Start date is required." })
          .nullable(),
        endDate: z.date().nullable(),
      })
    )
    .nonempty({ message: "At least one timing is required." }),
});

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const json = await req.json();
    console.log("json", json);
    // const data = FirstFormSchema.parse(json);
    const data = json;
    const client = await db;
    const eventsCollection = client.db().collection("events");

    const result = await eventsCollection.insertOne({
      ...data,
      userId: new ObjectId(user.id),
      step: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      isLive: false,
    });
    return new Response(
      JSON.stringify({ message: "Step 1 saved", eventId: result.insertedId }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    return new Response("Internal server error", { status: 403 });
  }
}
