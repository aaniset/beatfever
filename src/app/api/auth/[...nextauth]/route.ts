// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { connectDatabase } from "@/lib/db";
// import User from "@/models/user";
// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],

//   callbacks: {
//     async signIn({ profile }) {
//       console.log(profile);

//       try {
//         await connectDatabase();
//         const userExist = await User.findOne({ email: profile?.email });
//         if (!userExist && profile) {
//           const newUser = await User.create({
//             name: profile.name,
//             email: profile.email,
//             image: profile.picture,
//           });
//           return true;
//         }
//       } catch (error) {
//         console.log("Error in Sign In : ", error);
//         return false;
//       }
//     },
//     async session({ session }) {
//       console.log("session :", session);
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";

import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
