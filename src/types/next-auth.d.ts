import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}
// import { User } from "next-auth"
// import { JWT } from "next-auth/jwt"
// import { ObjectId } from "mongodb"; // Import ObjectId from mongodb

// type UserId = string

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: ObjectId
//   }
// }

// declare module "next-auth" {
//   interface Session {
//     user: User & {
//       id: ObjectId
//     }
//   }
// }
