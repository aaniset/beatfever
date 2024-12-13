import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);
    console.log("session,", session);
    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const client = await db;
    const collection = client.db().collection("venues");
    const venues = await collection
      .find({ userId: new ObjectId(session.user.id) })
      .toArray();

    return new Response(JSON.stringify(venues), { status: 200 });
  } catch (error) {
    console.error("Error fetching venues:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
