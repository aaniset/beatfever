import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    console.log("session,", session);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const json = await req.json();
    // const reqBody = VenueSchema.parse(req.body);

    const data = json;
    const client = await db;
    const collection = client.db().collection("events");
    const eventDetails = await collection.findOne({
      userId: new ObjectId(session.user.id),
      _id: new ObjectId(data.eventId as string),
    });

    return new Response(JSON.stringify(eventDetails), { status: 200 });
  } catch (error) {
    console.error("Error fetching venues:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
