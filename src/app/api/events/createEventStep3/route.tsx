import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import * as z from "zod";
import { ObjectId } from "mongodb";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const ThirdFormSchema = z.object({
  eventId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  venueId: z.string({ required_error: "Select an option" }),
});

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    // const data = ThirdFormSchema.parse(req.body);
    const data = await req.json();

    const client = await db;
    const eventsCollection = client.db().collection("events");
    console.log("step3 data", data);
    const result = await eventsCollection.updateOne(
      {
        _id: new ObjectId(data.eventId as string),
        userId: new ObjectId(user.id),
      },
      {
        $set: {
          venueId: new ObjectId(data.venueId as string),
          step: 3,
          updatedAt: new Date(),
        },
      }
    );
    console.log("step 3 result", {
      eventId: new ObjectId(data.eventId as string),
      userid: new ObjectId(user.id),
    });
    if (result.matchedCount === 0) {
      return new Response("Event not found", { status: 404 });
    }

    return new Response("Step 2 saved", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error }), { status: 422 });
    }

    return new Response("Internal server error", { status: 422 });
  }
}
