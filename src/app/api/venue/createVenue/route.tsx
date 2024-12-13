// pages/api/venues/create.ts

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import * as z from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const VenueSchema = z.object({
  venueName: z.string().min(1, { message: "Venue name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  timeZone: z.string().min(1, { message: "Time zone is required" }),
  capacity: z.string().min(1, { message: "Capacity is required" }),
  mapsUrl: z.string().url({ message: "Valid Maps URL is required" }),
});

export type Venue = z.infer<typeof VenueSchema>;

export async function POST(req: Request, res: Response) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const json = await req.json();
    // const reqBody = VenueSchema.parse(req.body);

    const data = json;
    const client = await db;
    const collection = client.db().collection("venues");

    const newVenue = {
      ...data,
      userId: new ObjectId(user.id),
    };

    const result = await collection.insertOne(newVenue);
    const venueId = result.insertedId;

    return new Response(JSON.stringify(venueId), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error }), { status: 422 });
    }
    console.error("Error creating venue:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
