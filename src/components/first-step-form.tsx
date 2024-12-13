// "use client";
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { PlusCircle, MinusCircle, Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/components/ui/use-toast";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { format } from "date-fns";
// import { Separator } from "@/components/ui/separator";
// import { useStepper } from "@/components/stepper";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import Image from "next/image";
// import { Badge } from "./ui/badge";

// const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
//   const hours = Math.floor(i / 2);
//   const minutes = (i % 2) * 30;
//   return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//     2,
//     "0"
//   )}`;
// });

// const defaultValues = {
//   eventName: "",
//   eventDescription: "",
//   image: "",
//   timings: [
//     {
//       startDate: undefined as Date | undefined,
//       startTime: undefined as Date | undefined,
//       endDate: undefined as Date | undefined,
//       endTime: undefined as Date | undefined,
//     },
//   ],
// };

// const FirstFormSchema = z.object({
//   eventName: z
//     .string()
//     .min(2, { message: "Event name must be at least 2 characters." }),
//   eventDescription: z
//     .string()
//     .min(10, { message: "Description must be at least 10 characters." }),
//   timings: z.array(
//     z.object({
//       startDate: z.date().nullable(),
//       startTime: z.date().nullable(),
//       endDate: z.date().nullable(),
//       endTime: z.date().nullable(),
//     })
//   ),
// });

// export default function FirstStepForm({ StepperFormActions }: any) {
//   const { nextStep } = useStepper();
//   const form = useForm({
//     resolver: zodResolver(FirstFormSchema),
//     defaultValues,
//     mode: "onChange",
//   });
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [showEndDate, setShowEndDate] = useState<boolean[]>([false]);

//   const onAddTiming = () => {
//     form.setValue("timings", [
//       ...form.getValues("timings"),
//       {
//         startDate: undefined,
//         startTime: undefined,
//         endDate: undefined,
//         endTime: undefined,
//       },
//     ]);
//     setShowEndDate([...showEndDate, false]);
//   };

//   const onRemoveTiming = (index: number) => {
//     const updatedTimings = form
//       .getValues("timings")
//       .filter((_, i) => i !== index);
//     form.setValue("timings", updatedTimings);
//     setShowEndDate(showEndDate.filter((_, i) => i !== index));
//   };
//   const handleImageUpload = (event: any) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       // Code to upload the image to S3 should be added here
//     }
//   };
//   function onSubmit(data: z.infer<typeof FirstFormSchema>) {
//     nextStep();
//     console.log(data);
//     toast({
//       title: "First step submitted!",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return (
//     <Form {...form}>
//       <CardHeader className=" items-center">
//         <CardTitle>Event Information</CardTitle>
//         <CardDescription>Provide details about your event.</CardDescription>
//       </CardHeader>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//         <FormField
//           control={form.control}
//           name="image"
//           render={({ field }) => (
//             <CardContent>
//               <FormItem className="p-6">
//                 <FormLabel>Event Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     id="eventName"
//                     type="text"
//                     className="w-full"
//                     value={form.watch("eventName")}
//                     onChange={(e) => form.setValue("eventName", e.target.value)}
//                   />
//                 </FormControl>

//                 <FormDescription>
//                   This is your public display name.
//                 </FormDescription>
//               </FormItem>
//               <FormItem className="p-6">
//                 <FormLabel htmlFor="eventDescription">
//                   Event Description
//                 </FormLabel>
//                 <FormControl>
//                   <Textarea
//                     id="eventDescription"
//                     value={form.watch("eventDescription")}
//                     onChange={(e) =>
//                       form.setValue("eventDescription", e.target.value)
//                     }
//                     className="min-h-32"
//                   />
//                 </FormControl>
//                 <FormDescription>
//                   Provide a detailed description of your event.
//                 </FormDescription>
//               </FormItem>
//               <FormItem className="p-6 max-w-sm">
//                 <FormLabel>Event Flyer</FormLabel>
//                 <FormDescription>
//                   Upload an image for your event flyer.
//                 </FormDescription>

//                 <div className="grid gap-2">
//                   <Image
//                     alt="Event image"
//                     className="aspect-square w-full rounded-md object-cover"
//                     height="300"
//                     src={uploadedImage || "/placeholder.svg"}
//                     width="300"
//                   />
//                   <div className="grid grid-cols-3 gap-2">
//                     <input
//                       type="file"
//                       id="imageUpload"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageUpload}
//                     />
//                     <label
//                       htmlFor="imageUpload"
//                       className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
//                     >
//                       <Upload className="h-4 w-4 text-muted-foreground" />
//                       <span className="sr-only">Upload</span>
//                     </label>
//                   </div>
//                 </div>
//               </FormItem>
//               <FormItem className="p-6">
//                 <FormLabel>When is it happening?</FormLabel>
//                 <FormDescription>
//                   Provide the event date and time.
//                 </FormDescription>

//                 {form.watch("timings").map((timing, index) => (
//                   <FormControl>
//                     <div key={index} className="py-4 grid gap-3">
//                       <FormDescription>
//                         Event End Date and Time{" "}
//                         <Badge
//                           variant="outline"
//                           className="w-fit mx-2 text-xsm flex-row "
//                         >
//                           Day {index + 1}
//                         </Badge>
//                       </FormDescription>

//                       <div className="flex items-center gap-2">
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <Button
//                               variant="outline"
//                               className="flex-col items-start w-full h-auto"
//                             >
//                               <span className="font-semibold uppercase text-[0.65rem]">
//                                 Start Date
//                               </span>
//                               {timing.startDate ? (
//                                 <span className="font-normal text-muted-foreground">
//                                   {format(timing.startDate, "PPP")}
//                                 </span>
//                               ) : (
//                                 <span className="font-normal text-muted-foreground">
//                                   Pick a date
//                                 </span>
//                               )}
//                             </Button>
//                           </PopoverTrigger>
//                           <PopoverContent className="p-0 max-w-[276px]">
//                             <div className="flex space-x-4 p-4">
//                               <Calendar
//                                 mode="single"
//                                 selected={timing.startDate}
//                                 onSelect={(date) => {
//                                   const newTimings = form.getValues("timings");
//                                   newTimings[index].startDate = date;
//                                   form.setValue("timings", newTimings);
//                                 }}
//                                 initialFocus
//                               />
//                             </div>
//                           </PopoverContent>
//                         </Popover>
//                         <Select
//                           onValueChange={(value) => {
//                             const newTimings = form.getValues("timings");
//                             newTimings[index].startTime = new Date(
//                               `1970-01-01T${value}:00`
//                             );
//                             form.setValue("timings", newTimings);
//                           }}
//                         >
//                           <SelectTrigger className="w-full h-full">
//                             <div className="flex-row items-start">
//                               <div className="font-semibold uppercase text-[0.65rem]">
//                                 Start Time
//                               </div>
//                               <div className="text-muted-foreground font-normal">
//                                 <SelectValue placeholder="Pick a time" />
//                               </div>
//                             </div>
//                           </SelectTrigger>
//                           <SelectContent>
//                             {timeOptions.map((time) => (
//                               <SelectItem key={time} value={time}>
//                                 {time}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       {showEndDate[index] && (
//                         <div className="grid gap-3 mt-2">
//                           <FormDescription>
//                             Event End Date and Time
//                           </FormDescription>
//                           <div className="flex items-center gap-2">
//                             <Popover>
//                               <PopoverTrigger asChild>
//                                 <Button
//                                   variant="outline"
//                                   className="flex-col items-start w-full h-auto"
//                                 >
//                                   <span className="font-semibold uppercase text-[0.65rem]">
//                                     End Date
//                                   </span>
//                                   {timing.endDate ? (
//                                     <span className="font-normal text-muted-foreground">
//                                       {format(timing.endDate, "PPP")}
//                                     </span>
//                                   ) : (
//                                     <span className="font-normal text-muted-foreground">
//                                       Pick a date
//                                     </span>
//                                   )}
//                                 </Button>
//                               </PopoverTrigger>
//                               <PopoverContent className="p-0 max-w-[276px]">
//                                 <div className="flex space-x-4 p-4">
//                                   <Calendar
//                                     mode="single"
//                                     selected={timing.endDate ?? undefined}
//                                     onSelect={(date) => {
//                                       const newTimings =
//                                         form.getValues("timings");
//                                       newTimings[index].endDate = date;
//                                       form.setValue("timings", newTimings);
//                                     }}
//                                     initialFocus
//                                   />
//                                 </div>
//                               </PopoverContent>
//                             </Popover>

//                             <Select
//                               onValueChange={(value) => {
//                                 const newTimings = form.getValues("timings");
//                                 newTimings[index].endTime = new Date(
//                                   `1970-01-01T${value}:00`
//                                 );
//                                 form.setValue("timings", newTimings);
//                               }}
//                             >
//                               <SelectTrigger className="w-full h-full">
//                                 <div className="flex-row items-start">
//                                   <div className="font-semibold uppercase text-[0.65rem]">
//                                     End Time
//                                   </div>
//                                   <div className="text-muted-foreground font-normal">
//                                     <SelectValue placeholder="Pick a time" />
//                                   </div>
//                                 </div>
//                               </SelectTrigger>
//                               <SelectContent>
//                                 {timeOptions.map((time) => (
//                                   <SelectItem key={time} value={time}>
//                                     {time}
//                                   </SelectItem>
//                                 ))}
//                               </SelectContent>
//                             </Select>
//                           </div>
//                         </div>
//                       )}
//                       <div className="flex  items-center mt-2 space-x-2">
//                         {showEndDate[index] ? (
//                           <Button
//                             size="sm"
//                             variant="link"
//                             className="gap-1 text-destructive"
//                             onClick={() =>
//                               setShowEndDate(
//                                 showEndDate.map((val, idx) =>
//                                   idx === index ? !val : val
//                                 )
//                               )
//                             }
//                           >
//                             <MinusCircle className="h-3.5 w-3.5" />
//                             Remove end date
//                           </Button>
//                         ) : (
//                           <Button
//                             size="sm"
//                             variant="link"
//                             className="gap-1"
//                             onClick={() =>
//                               setShowEndDate(
//                                 showEndDate.map((val, idx) =>
//                                   idx === index ? !val : val
//                                 )
//                               )
//                             }
//                           >
//                             <PlusCircle className="h-3.5 w-3.5" />
//                             Add end date
//                           </Button>
//                         )}
//                       </div>
//                       <Button
//                         className=" w-full justify-center "
//                         size="sm"
//                         variant="secondary"
//                         onClick={() => onRemoveTiming(index)}
//                       >
//                         <MinusCircle className="h-3.5" /> Remove day {index + 1}
//                       </Button>
//                     </div>
//                   </FormControl>
//                 ))}
//                 <Button
//                   size="sm"
//                   variant="secondary"
//                   className="gap-1 w-full justify-center"
//                   onClick={onAddTiming}
//                 >
//                   <PlusCircle className="h-3.5 w-3.5" />
//                   Add another day
//                 </Button>
//               </FormItem>
//               <CardFooter>
//                 <StepperFormActions />
//               </CardFooter>
//             </CardContent>
//             // <FormMessage />
//           )}
//         />
//       </form>
//     </Form>
//   );
// }
"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusCircle, MinusCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { useStepper } from "@/components/stepper";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Badge } from "./ui/badge";

const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = (i % 2) * 30;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
});

const defaultValues = {
  eventName: "",
  eventDescription: "",
  image: "",
  timings: [
    {
      startDate: undefined as Date | undefined,
      startTime: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      endTime: undefined as Date | undefined,
    },
  ],
};

const FirstFormSchema = z.object({
  eventName: z
    .string()
    .min(2, { message: "Event name must be at least 2 characters." }),
  eventDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  timings: z.array(
    z.object({
      startDate: z.string(),
      startTime: z.string(),
      endDate: z.string(),
      endTime: z.string()
    })
  ),
});

export default function FirstStepForm({ StepperFormActions }: any) {
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(FirstFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showEndDate, setShowEndDate] = useState<boolean[]>([false]);

  const onAddTiming = () => {
    form.setValue("timings", [
      ...form.getValues("timings"),
      {
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
      },
    ]);
    setShowEndDate([...showEndDate, false]);
  };

  const onRemoveTiming = (index: number) => {
    const updatedTimings = form
      .getValues("timings")
      .filter((_, i) => i !== index);
    form.setValue("timings", updatedTimings);
    setShowEndDate(showEndDate.filter((_, i) => i !== index));
  };
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Code to upload the image to S3 should be added here
    }
  };
  function onSubmit(data: z.infer<typeof FirstFormSchema>) {
    nextStep();
    console.log(data);
    toast({
      title: "First step submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <CardHeader className=" items-center">
        <CardTitle>Event Information</CardTitle>
        <CardDescription>Provide details about your event.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <CardContent>
              <FormItem className="p-6">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    id="eventName"
                    type="text"
                    className="w-full"
                    value={form.watch("eventName")}
                    onChange={(e) => form.setValue("eventName", e.target.value)}
                  />
                </FormControl>

                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormItem>
              <FormItem className="p-6">
                <FormLabel htmlFor="eventDescription">
                  Event Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="eventDescription"
                    value={form.watch("eventDescription")}
                    onChange={(e) =>
                      form.setValue("eventDescription", e.target.value)
                    }
                    className="min-h-32"
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your event.
                </FormDescription>
              </FormItem>
              {/* <FormItem className="p-6 max-w-sm">
                <FormLabel>Event Flyer</FormLabel>
                <FormDescription>
                  Upload an image for your event flyer.
                </FormDescription>

                <div className="grid gap-2">
                  <Image
                    alt="Event image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={uploadedImage || "/placeholder.svg"}
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="imageUpload"
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </label>
                  </div>
                </div>
              </FormItem> */}
              <FormItem className="p-6">
                <FormLabel>When is it happening?</FormLabel>
                <FormDescription>
                  Provide the event date and time.
                </FormDescription>

                {form.watch("timings").map((timing, index) => (
                  <FormControl>
                    <div key={index} className="py-4 grid gap-3">
                      <FormDescription>
                        Event End Date and Time{" "}
                        <Badge
                          variant="outline"
                          className="w-fit mx-2 text-xsm flex-row "
                        >
                          Day {index + 1}
                        </Badge>
                      </FormDescription>

                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex-col items-start w-full h-auto"
                            >
                              <span className="font-semibold uppercase text-[0.65rem]">
                                Start Date
                              </span>
                              {timing.startDate ? (
                                <span className="font-normal text-muted-foreground">
                                  {format(timing.startDate, "PPP")}
                                </span>
                              ) : (
                                <span className="font-normal text-muted-foreground">
                                  Pick a date
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 max-w-[276px]">
                            <div className="flex space-x-4 p-4">
                              <Calendar
                                mode="single"
                                selected={timing.startDate}
                                onSelect={(date) => {
                                  const newTimings = form.getValues("timings");
                                  newTimings[index].startDate = date;
                                  form.setValue("timings", newTimings);
                                }}
                                initialFocus
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Select
                          onValueChange={(value) => {
                            const newTimings = form.getValues("timings");
                            newTimings[index].startTime = new Date(
                              `1970-01-01T${value}:00`
                            );
                            form.setValue("timings", newTimings);
                          }}
                        >
                          <SelectTrigger className="w-full h-full">
                            <div className="flex-row items-start">
                              <div className="font-semibold uppercase text-[0.65rem]">
                                Start Time
                              </div>
                              <div className="text-muted-foreground font-normal">
                                <SelectValue placeholder="Pick a time" />
                              </div>
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {showEndDate[index] && (
                        <div className="grid gap-3 mt-2">
                          <FormDescription>
                            Event End Date and Time
                          </FormDescription>
                          <div className="flex items-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="flex-col items-start w-full h-auto"
                                >
                                  <span className="font-semibold uppercase text-[0.65rem]">
                                    End Date
                                  </span>
                                  {timing.endDate ? (
                                    <span className="font-normal text-muted-foreground">
                                      {format(timing.endDate, "PPP")}
                                    </span>
                                  ) : (
                                    <span className="font-normal text-muted-foreground">
                                      Pick a date
                                    </span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0 max-w-[276px]">
                                <div className="flex space-x-4 p-4">
                                  <Calendar
                                    mode="single"
                                    selected={timing.endDate ?? undefined}
                                    onSelect={(date) => {
                                      const newTimings =
                                        form.getValues("timings");
                                      newTimings[index].endDate = date;
                                      form.setValue("timings", newTimings);
                                    }}
                                    initialFocus
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>

                            <Select
                              onValueChange={(value) => {
                                const newTimings = form.getValues("timings");
                                newTimings[index].endTime = new Date(
                                  `1970-01-01T${value}:00`
                                );
                                form.setValue("timings", newTimings);
                              }}
                            >
                              <SelectTrigger className="w-full h-full">
                                <div className="flex-row items-start">
                                  <div className="font-semibold uppercase text-[0.65rem]">
                                    End Time
                                  </div>
                                  <div className="text-muted-foreground font-normal">
                                    <SelectValue placeholder="Pick a time" />
                                  </div>
                                </div>
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <div className="flex  items-center mt-2 space-x-2">
                        {showEndDate[index] ? (
                          <Button
                            size="sm"
                            variant="link"
                            className="gap-1 text-destructive"
                            onClick={() =>
                              setShowEndDate(
                                showEndDate.map((val, idx) =>
                                  idx === index ? !val : val
                                )
                              )
                            }
                          >
                            <MinusCircle className="h-3.5 w-3.5" />
                            Remove end date
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="link"
                            className="gap-1"
                            onClick={() =>
                              setShowEndDate(
                                showEndDate.map((val, idx) =>
                                  idx === index ? !val : val
                                )
                              )
                            }
                          >
                            <PlusCircle className="h-3.5 w-3.5" />
                            Add end date
                          </Button>
                        )}
                      </div>
                      <Button
                        className=" w-full justify-center "
                        size="sm"
                        variant="secondary"
                        onClick={() => onRemoveTiming(index)}
                      >
                        <MinusCircle className="h-3.5" /> Remove day {index + 1}
                      </Button>
                    </div>
                  </FormControl>
                ))}
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-1 w-full justify-center"
                  onClick={onAddTiming}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add another day
                </Button>
              </FormItem>
              <CardFooter>
                <StepperFormActions />
              </CardFooter>
            </CardContent>
            // <FormMessage />
          )}
        />
      </form>
    </Form>
  );
}
