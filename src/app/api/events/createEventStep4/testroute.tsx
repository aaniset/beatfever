// import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth/next';
// import * as z from 'zod';
// import { ObjectId } from 'mongodb';

// import { authOptions } from '@/lib/auth';
// import { db } from '@/lib/db';

// const FourthStepSchema = z.object({
//   eventId: z.string().regex(/^[0-9a-fA-F]{24}$/),
//   promocode: z.string().regex(/^[0-9a-f]{24}$/),
// });

// export async function POST(req: Request, res: Response) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     const { user } = session;
//     const data = FourthStepSchema.parse(req.body);

//     const client = await db;
//     const eventsCollection = client.db().collection('events');

//     const result = await eventsCollection.updateOne(
//       { _id: new ObjectId(data.eventId), userId: user.id },
//       { $set: { ...data, step: 4, updatedAt: new Date(), isLive: true } }
//     );

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     res.status(200).json({ message: 'Step 4 saved, event is live' });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(422).json(error.issues);
//     }

//     res.status(500).json({ message: 'Internal server error' });
//   }
// }
