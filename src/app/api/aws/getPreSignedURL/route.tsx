// import { NextApiRequest, NextApiResponse } from 'next';
// import aws from 'aws-sdk';

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// import prisma from "../../client";
// import { getSession } from "next-auth/client";
import aws from "aws-sdk";

// export default async function (req: NextApiRequest, res: NextApiResponse) {

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 403 });
  }
  const reqBody = await req.json();
 
  const { fileName, fileType } = reqBody.params;

  // Update AWS configuration with the provided credentials
  aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3Bucket = process.env.AWS_BUCKET;

  // Create a new instance of S3
  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
  });
  //   const fileName = req.body?.fileName;
  //   const fileType = req.body.fileType;

  const s3Params = {
    Bucket: s3Bucket,
    Key: `flyer/${fileName}`,
    ContentType: fileType,
    Expires: 60,
  };

  console.log("config", s3Params);
  try {
    const client = await db;

    // Get a signed URL from S3 for uploading an object
    // s3.getSignedUrl("putObject", s3Params, async (err, data) => {
    //   if (err) {
    //     // return res.json({ success: false, error: err });
    //     return new Response(JSON.stringify({ success: false, error: err }), {
    //       status: 200,
    //     });
    //   }
    //   const returnData = {
    //     signedRequest: data,
    //     url: `https://${s3Bucket}.s3.amazonaws.com/flyer/${fileName}`,
    //   };
    //   console.log("return data",returnData);

    //   return new Response(JSON.stringify(returnData), { status: 200 });

    // });
    const signedUrl = await new Promise((resolve, reject) => {
      s3.getSignedUrl("putObject", s3Params, (err, data) => {
        if (err) {
          console.log("Error in backend req sign url");
          reject(err);
        } else {
          console.log("sucess in backend req sign url");

          resolve(data);
        }
      });
    });
    // return new Response(JSON.stringify({ State: "Success" }), { status: 200 });
    const returnData = {
      signedRequest: signedUrl,
      url: `https://${s3Bucket}.s3.amazonaws.com/flyer/${fileName}`,
    };
    console.log("return data", returnData);

    return new Response(JSON.stringify(returnData), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
