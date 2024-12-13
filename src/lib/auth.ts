import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { sendEmailRequest } from "./email";
import { Adapter } from "next-auth/adapters";
import { ObjectId } from "mongodb"; // Import ObjectId from mongodb

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        console.log("proveiderr", JSON.stringify(provider));
        const client = await db;
        const user = await client
          .db()
          .collection("users")
          .findOne({ email: identifier });
        const action = user?.emailVerified ? "SIGNIN" : "ACTIVATE";
        await sendEmailRequest({
          to: identifier,
          action: action,
          variables: { name: identifier, url: url },
        });
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const client = await db;
      const dbUser = await client
        .db()
        .collection("users")
        .findOne({ email: token.email });
      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }
      token.id = dbUser._id.toString();
      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      return token;
    },
  },
};
