// pages/api/events/[userId].ts

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

interface EventResponse {
  id: string;
  name: string;
  status: string;
  date: string;
  location: string;
  imgUrl: string;
}

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    console.log("Success");

    const json = await req.json();
    const eventId = json.eventId;
    // const reqBody = VenueSchema.parse(req.body);
    const userId = session.user.id;

    if (!userId || typeof userId !== "string") {
      return new Response("Invalid UserId", { status: 400 });
    }
    console.log("get orders", eventId);
    const client = await db;
    const collection = client.db().collection("orders");
    const orders = await collection
      .find({
        eventId: new ObjectId(eventId as string),
      })
      .toArray();
    

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(date).toLocaleString("en-US", options);
}
