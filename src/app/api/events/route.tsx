import { getServerSession } from "next-auth/next";
import * as z from "zod";
import { ObjectId } from "mongodb";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Define the schema for startDate and endDate objects
const dateTimeSchema = z.object({
  calendar: z.object({
    identifier: z.string(),
  }),
  era: z.string(),
  year: z.number(),
  month: z.number(),
  day: z.number(),
  hour: z.number(),
  minute: z.number(),
  second: z.number(),
  millisecond: z.number(),
});

const eventSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  eventName: z.string(),
  eventDescription: z.string(),
  variants: z.array(
    z.object({
      name: z.string(),
      stock: z.number(),
      price: z.number(),
      description: z.string(),
    })
  ),
  timings: z.array(
    z.object({
      startDate: dateTimeSchema,
      endDate: dateTimeSchema,
    })
  ),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const json = await req.json();
    const eventData = eventSchema.parse(json);
    const { eventName, eventDescription, variants, timings } = eventData;
    const { user } = session;
    console.log("Entered", user);

    const client = await db;
    if (eventData && eventData._id) {
      // Convert the event ID string to ObjectId
      const eventId = new ObjectId(eventData._id);

      // Check if an event with the provided ID exists in the database
      const existingEvent = await client.db().collection("events").findOne({
        _id: eventId,
        userId: session.user.id, // Assuming userId is stored in the database for each event
      });

      if (existingEvent) {
        // If the event exists, update it
        const updatedEvent = await client
          .db()
          .collection("events")
          .updateOne(
            { _id: eventId },
            {
              $set: {
                userId: session.user.id,
                eventName,
                eventDescription,
                variants,
                timings,
              },
            }
          );
        return new Response(JSON.stringify(updatedEvent), { status: 200 });
      }
    }

    // If the event ID is not provided or the event does not exist, create a new event
    const createdEvent = await client.db().collection("events").insertOne({
      userId: session.user.id,
      _id: new ObjectId(),
      createdAt: new Date(),
      eventName,
      eventDescription,
      variants,
      timings,
    });

    return new Response(JSON.stringify(createdEvent), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    const jsonBody = await req.json();
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const client = await db;
    const existingEvent = await client.db().collection("events").find({
      userId: session.user.id, // Assuming userId is stored in the database for each event
    }).toArray;
    return new Response(JSON.stringify(existingEvent));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
