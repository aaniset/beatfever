// "use client";
// import Image from "next/image";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import { z } from "zod";
// import { toast } from "@/components/ui/use-toast";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Upload } from "lucide-react";
// const profileFormSchema = z.object({
//   username: z
//     .string()
//     .min(2, {
//       message: "Username must be at least 2 characters.",
//     })
//     .max(30, {
//       message: "Username must not be longer than 30 characters.",
//     }),
//   email: z
//     .string({
//       required_error: "Please select an email to display.",
//     })
//     .email(),
//   bio: z.string().max(160).min(4),
//   urls: z
//     .array(
//       z.object({
//         value: z.string().url({ message: "Please enter a valid URL." }),
//       })
//     )
//     .optional(),
// });

// type ProfileFormValues = z.infer<typeof profileFormSchema>;

// // This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   bio: "I own a computer.",
//   urls: [
//     { value: "https://shadcn.com" },
//     { value: "http://twitter.com/shadcn" },
//   ],
// };
// import { useEffect, useState } from "react";

// export function EventFlyer({
//   uploadedImage,
//   setUploadedImage,
//   handleFileUpload,
// }: any) {
//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues,
//     mode: "onChange",
//   });

//   const { fields, append } = useFieldArray({
//     name: "urls",
//     control: form.control,
//   });

//   function onSubmit(data: ProfileFormValues) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return (
//     <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
//       <CardHeader>
//         <CardTitle>Event Flyer</CardTitle>
//         <CardDescription>
//           Lipsum dolor sit amet, consectetur adipiscing elit
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="grid gap-2">
//           {uploadedImage ? (
//             <img
//               alt="Product image"
//               className="aspect-square w-full rounded-md object-cover"
//               src={uploadedImage}
//             />
//           ) : (
//             <Image
//               alt="Product image"
//               className="aspect-square w-full rounded-md object-cover"
//               height="300"
//               src="/placeholder.svg"
//               width="300"
//             />
//           )}
//           <div className="grid grid-cols-3 gap-2">
//             <label
//               htmlFor="file-upload"
//               className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
//             >
//               <Upload className="h-4 w-4 text-muted-foreground" />
//               <span className="sr-only">Upload</span>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*"
//                 className="sr-only"
//                 onChange={handleFileUpload}
//               />
//             </label>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import * as React from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

// Define the schema
const imageUploadSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= 10 * 1024 * 1024, "Max file size is 10MB"),
});

// Define the default values
const defaultValues = {
  image: null,
};

// Define the component props
interface ImageUploadProps {
  uploadedImage: string | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// The ImageUpload component
export function ImageUpload({
  uploadedImage,
  handleFileUpload,
}: ImageUploadProps) {
  return (
    <Card className="overflow-hidden w-fit h-fit">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Upload an image (max size 10MB)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {uploadedImage ? (
            <img
              alt="Uploaded image"
              className="aspect-square w-full rounded-md object-cover"
              src={uploadedImage}
            />
          ) : (
            <Image
              alt="Image placeholder"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src="/placeholder.svg"
              width="300"
            />
          )}
          <div className="grid grid-cols-3 gap-2">
            <label
              htmlFor="file-upload"
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
