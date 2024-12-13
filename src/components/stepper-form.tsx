"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

import * as z from "zod";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Step, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
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
import { ImageUpload } from "./EventDetails/EventFlyer";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MinusCircle, PlusCircle, Tag, Upload } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  CheckIcon,
  ChevronDownIcon,
  PlusCircledIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

import { CreateVenuDialog } from "./create-venue-dialog";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  { label: "Step 1", description: "Event Details" },
  { label: "Step 2", description: "Add tickets" },
  { label: "Step 3", description: "Add capacity" },
];

export default function StepperForm() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  console.log(eventId);
  const [firstStepFormData, setFirstStepFormData] = useState({
    eventName: "",
    eventDescription: "",
    eventFlyer: "",
    timings: [{ date: new Date(), startTime: "", endTime: "" }],
  });
  const [secondStepFormData, setSecondStepFormData] = useState({
    ticketVariants: [
      // {
      //   type: "",
      //   description: "",
      //   price: "",
      //   quantity: "",
      //   remaining: "",
      // },
    ],
    platformFee: "",
    paymentGatewayFee: "",
  });
  const [thirdStepFormData, setThirdStepFormData] = useState({
    venueId: "",
  });
  useEffect(() => {
    if (eventId) {
      axios
        .post(`/api/events/getEventDetails`, { eventId })
        .then((response) => {
          const eventDetails = response.data;
          const firstStepFormData = {
            eventName: eventDetails.eventName,
            eventDescription: eventDetails.eventDescription,
            eventFlyer: eventDetails.eventFlyer,
            timings: eventDetails.timings.map((timing: any) => ({
              date: timing.date ? new Date(timing.date) : new Date(),
              startTime: timing.startTime ? timing.startTime : "",
              endTime: timing.endTime ? timing.startTime : "",
            })),
          };
          setFirstStepFormData(firstStepFormData);
          console.log("firstStepFormData", firstStepFormData);

          const secondStepFormData = {
            ticketVariants: eventDetails.ticketVariants[0]?.type
              ? eventDetails.ticketVariants
              : [],

            // ticketVariants: [
            //   {
            //     type: eventDetails.type ? eventDetails.type : "",
            //     description: eventDetails.description
            //       ? eventDetails.description
            //       : "",
            //     price: eventDetails.price ? eventDetails.price : "",
            //     quantity: eventDetails.quantity ? eventDetails.quantity : 0,
            //     remaining: eventDetails.remaining ? eventDetails.remaining : 0,
            //   },
            // ],
            platformFee: eventDetails.platformFee,
            paymentGatewayFee: eventDetails.paymentGatewayFee,
          };
          setSecondStepFormData(secondStepFormData);
          console.log("secondStepFormData", secondStepFormData);

          const thirdStepFormData = {
            venueId: eventDetails.venueId,
          };
          setThirdStepFormData(thirdStepFormData);
          //console.log("thirdStepFormData",thirdStepFormData)
        })
        .catch((error) => {
          console.error("Error fetching event details:", error);
        });
    }
  }, [eventId]);

  return (
    <div className="flex w-full   flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FirstStepForm firstStepFormData={firstStepFormData} />
                {/* <SecondStepForm secondStepFormData={secondStepFormData} /> */}
              </Step>
            );
          }
          if (index === 1) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <SecondStepForm secondStepFormData={secondStepFormData} />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <ThirdStepForm thirdStepFormData={thirdStepFormData} />
            </Step>
          );

          // return (
          //   <Step key={stepProps.label} {...stepProps}>
          //     <ThirdStepForm />
          //   </Step>
          // );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

async function fetchDefaultValues() {
  // Simulating a dummy API call
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve({}), 1000)
  );

  return (
    response || {
      eventName: "",
      eventDescription: "",
      eventFlyer: "",
      timings: [{ startDate: null, endDate: null }],
    }
  );
}

const FirstFormSchema = z.object({
  eventName: z
    .string()
    .min(6, { message: "Event name must be at least 6 characters." }),
  eventDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  eventFlyer: z.string({ required_error: "Event flyer is required" }),
  timings: z
    .array(
      z.object({
        date: z.date({ required_error: "Start date is required." }).nullable(),
        endTime: z.string(),
        startTime: z.string(),
      })
    )
    .nonempty({ message: "At least one timing is required." }),
});

const SecondFormSchema = z.object({
  ticketVariants: z.array(
    z.object({
      type: z
        .string()
        .min(2, { message: "Event name must be at least 2 characters." }),
      description: z
        .string()
        .min(6, { message: "Event name must be at least 6 characters." }),
      quantity: z.string().optional(),
      remaining: z.string().optional(),

      price: z.string({ required_error: "Ticket Price is required" }),
    })
  ),
  platformFee: z.string({ required_error: "Select an option" }),
  paymentGatewayFee: z.string({ required_error: "Select an option" }),
});

const ThirdFormSchema = z.object({
  venueId: z.string({ required_error: "Select an option" }),
});

function FirstStepForm({ firstStepFormData }: any) {
  const router = useRouter();
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: firstStepFormData,
  });
  useEffect(() => {
    form.reset(firstStepFormData);
  }, [firstStepFormData, form]);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "timings",
  });

  async function onSubmit(data: any) {
    const response = await axios.post(`/api/events/createEventStep1`, data);
    console.log("response,", response);
    nextStep();
    router.push(`/events/create-event?eventId=${response.data.eventId}`);
    toast({
      title: "First step submitted!",
    });
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    try {
      // Request a presigned URL from your backend
      const { data } = await axios.post("/api/aws/getPreSignedURL", {
        params: {
          fileName: file.name,
          fileType: file.type,
        },
      });
      const { signedRequest, url } = data;
      // Upload the file to S3 using the presigned URL
      const uploadResponse = await axios.put(signedRequest, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      // Update the state with the uploaded image URL
      // Update the field value with the uploaded image URL
      form.setValue("eventFlyer", url);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  return (
    <Form {...form}>
      <CardHeader className="items-center">
        <CardTitle>Event Information</CardTitle>
        <CardDescription>Provide details about your event.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem className="p-6">
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input
                    id="eventName"
                    type="text"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }) => (
              <FormItem className="p-6 pt-0">
                <FormLabel htmlFor="eventDescription">
                  Event Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="eventDescription"
                    {...field}
                    className="min-h-32"
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of your event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventFlyer"
            render={({ field }) => (
              <FormItem className="p-6 max-w-sm">
                <FormLabel>Event Flyer</FormLabel>
                <FormDescription>
                  Upload an image for your event flyer.
                </FormDescription>

                <div className="grid gap-2">
                  <Image
                    alt="Event image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src={field.value || "/placeholder.svg"}
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <FormControl>
                      <input
                        type="file"
                        id="eventFlyer"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </FormControl>
                    <label
                      htmlFor="eventFlyer"
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </label>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormLabel>When is it happening?</FormLabel>
          <FormDescription>Provide the event date and time.</FormDescription>
          <div className="grid gap-6">
            <div className="grid gap-4">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 bg-muted rounded-md p-4"
                >
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name={`timings.${index}.date`}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-col items-start w-full h-auto"
                                >
                                  <span className="font-semibold uppercase text-[0.65rem]">
                                    Date
                                  </span>
                                  <span className="font-normal">
                                    {field.value
                                      ? field.value.toLocaleDateString()
                                      : "Select date"}
                                  </span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0 max-w-[276px]">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(newDate) =>
                                    field.onChange(newDate)
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name={`timings.${index}.startTime`}
                        render={({ field }) => (
                          <FormItem className="grid gap-1">
                            <FormLabel htmlFor={`start-time-${index}`}>
                              Start Time
                            </FormLabel>

                            <FormControl>
                              <Input
                                id={`start-time-${index}`}
                                type="time"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`timings.${index}.endTime`}
                        render={({ field }) => (
                          <FormItem className="grid gap-1">
                            <FormLabel htmlFor={`start-time-${index}`}>
                              Start Time
                            </FormLabel>

                            <FormControl>
                              <Input
                                id={`start-time-${index}`}
                                type="time"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 hover:bg-transparent text-muted-foreground hover:text-red-500"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="sr-only">Remove date</span>
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                append({
                  date: new Date(),
                  startDate: "",
                  endDate: "",
                });
              }}
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Date
            </Button>
          </div>

          <div className="p-6"></div>
          <StepperFormActions />
        </form>
      </CardContent>
    </Form>
  );
}

function SecondStepForm({ secondStepFormData }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(SecondFormSchema),
    defaultValues: secondStepFormData,
    mode: "onChange",
  });

  useEffect(() => {
    console.log("Resetting form with data: ", secondStepFormData);
    form.reset(secondStepFormData);
  }, [secondStepFormData, form]);

  async function onSubmit(data: any) {
    const eventId = searchParams.get("eventId");
    const response = await axios.post(`/api/events/createEventStep2`, {
      ...data,
      eventId,
    });
    console.log("response,", response);
    nextStep();
    router.push(`/events/create-event?eventId=${eventId}`);
    console.log(data); // Log the data
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
      <CardHeader className="items-center">
        <CardTitle>Ticket Variants</CardTitle>
        <CardDescription>
          Add different ticket options for your event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <TicketVariantForm form={form} />
          <CardHeader className="items-center">
            <CardTitle>Ticket Pricing Fees</CardTitle>
            <CardDescription>Who will pay the ticketing fees?</CardDescription>
          </CardHeader>
          <FormField
            control={form.control}
            name={`platformFee`}
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>BeatFever Fee</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">
                          Paid by user (added to ticket price)
                        </SelectItem>
                        <SelectItem value="organizer">
                          Paid by the organizer (cut from payout)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentGatewayFee"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel htmlFor="paymentGatewayFee">
                    Credit Card Fee / Payment Gateway Fee
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">
                          Paid by user (added to ticket price)
                        </SelectItem>
                        <SelectItem value="organizer">
                          Paid by the organizer (cut from payout)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <StepperFormActions />
        </form>
      </CardContent>
    </Form>
  );
}

// function ThirdStepForm({ thirdStepFormData }: any) {
//   const { nextStep } = useStepper();
//   const searchParams = useSearchParams();

//   const [defaultValues, setDefaultValues] = useState(thirdStepFormData);
//   const form = useForm({
//     resolver: zodResolver(ThirdFormSchema),
//     defaultValues,
//     mode: "onChange",
//   });

//   // Handle form submission
//   async function onSubmit(data: z.infer<typeof ThirdFormSchema>) {
//     const eventId = searchParams.get("eventId");
//     const response = await axios.post(`/api/events/createEventStep3`, {
//       ...data,
//       eventId,
//     });
//     console.log("response,", response);
//     nextStep();
//     console.log(data); // Log the data
//     toast({
//       title: "First step submitted!",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }
//   const [selectedVenue, setSelectedVenue] = useState<{
//     id: string;
//     name: string;
//     address: string;
//     venueId: string;
//   } | null>(null);

//   const handleSelectVenue = (venue: {
//     id: string;
//     name: string;
//     address: string;
//     venueId: string;
//   }) => {
//     setSelectedVenue(venue);
//     form.setValue("venueId", venue.venueId);
//     setIsOpenPopover(false);
//   };
//   const [isOpen, setIsOpen] = useState(false);
//   const [isOpenPopover, setIsOpenPopover] = useState(false);

//   const openDialog = () => {
//     setIsOpen(true);
//   };

//   const closeDialog = () => {
//     setIsOpen(false);
//   };
//   const handleCreateVenue = () => {
//     console.log("clicked");
//     openDialog();
//   };
//   const [venues, setVenues] = useState<Venue[]>([]);
//   type Venue = {
//     id: string;
//     venueId: string;
//     name: string;
//     address: string;
//   };

//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const response = await axios.get("/api/venue/getAllVenues");
//         const formattedVenues = response.data.map(
//           (venue: any, index: number) => ({
//             id: (index + 1).toString(),
//             venueId: venue._id,
//             name: venue.venueName,
//             address: `${venue.address}, ${venue.city}, ${venue.state}, ${venue.country}`,
//           })
//         );
//         setVenues(formattedVenues);
//         console.log("venue", response.data);
//       } catch (error) {
//         console.error("Error fetching venues:", error);
//       }
//     };

//     fetchVenues();
//   }, [isOpen]);

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//         <FormField
//           control={form.control}
//           name="venueId"
//           render={({ field }) => (
//             <FormItem>
//               <CardHeader>
//                 <CardTitle>Select Venue</CardTitle>
//                 <CardDescription>
//                   Select a venue for your event.
//                 </CardDescription>
//               </CardHeader>
//               <FormControl>
//                 <div className="">
//                   <CardContent className="grid gap-6">
//                     <div className="flex items-center justify-between space-x-4">
//                       {selectedVenue && (
//                         <div className="flex items-center space-x-4">
//                           <Avatar>
//                             <AvatarImage src="/avatars/01.png" />
//                             <AvatarFallback>
//                               {selectedVenue.name[0]}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <p className="text-sm font-medium leading-none">
//                               {selectedVenue.name}
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                               {selectedVenue.address}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                       <Popover open={isOpenPopover}>
//                         <PopoverTrigger asChild>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => setIsOpenPopover(true)}
//                             className="ml-auto"
//                           >
//                             {selectedVenue ? "Change Venue" : "Select Venue"}
//                             <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="p-0" align="end">
//                           <Command>
//                             <CommandInput placeholder="Search venues..." />
//                             <CommandList>
//                               <CommandEmpty>No venues found.</CommandEmpty>
//                               <CommandGroup>
//                                 {venues.map((venue) => (
//                                   <CommandItem
//                                     key={venue.id}
//                                     onSelect={() => handleSelectVenue(venue)}
//                                     className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
//                                   >
//                                     <p>{venue.name}</p>
//                                     <p className="text-sm text-muted-foreground truncate">
//                                       {venue.address}
//                                     </p>
//                                   </CommandItem>
//                                 ))}
//                               </CommandGroup>
//                               <CommandGroup className=" border-t">
//                                 <CommandItem
//                                   onSelect={handleCreateVenue}
//                                   className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
//                                 >
//                                   <p className="text-primary">Create Venue</p>
//                                 </CommandItem>
//                               </CommandGroup>
//                             </CommandList>
//                           </Command>
//                         </PopoverContent>
//                       </Popover>
//                     </div>
//                     <CreateVenuDialog
//                       isOpen={isOpen}
//                       setIsOpen={setIsOpen}
//                       closeDialog={closeDialog}
//                     />
//                   </CardContent>
//                 </div>
//               </FormControl>
//               {/* <FormMessage /> */}
//             </FormItem>
//           )}
//         />
//         <StepperFormActions />
//       </form>
//     </Form>
//   );
// }

function ThirdStepForm({ thirdStepFormData }: any) {
  const { nextStep } = useStepper();
  const searchParams = useSearchParams();

  const [defaultValues, setDefaultValues] = useState(thirdStepFormData);
  const form = useForm({
    resolver: zodResolver(ThirdFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof ThirdFormSchema>) {
    const eventId = searchParams.get("eventId");
    const response = await axios.post(`/api/events/createEventStep3`, {
      ...data,
      eventId,
    });
    console.log("response,", response);
    nextStep();
    console.log(data); // Log the data
    toast({
      title: "First step submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const [selectedVenue, setSelectedVenue] = useState<{
    id: string;
    name: string;
    address: string;
    venueId: string;
  } | null>(null);

  const handleSelectVenue = (venue: {
    id: string;
    name: string;
    address: string;
    venueId: string;
  }) => {
    setSelectedVenue(venue);
    form.setValue("venueId", venue.venueId);
    setIsOpenPopover(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleCreateVenue = () => {
    console.log("clicked");
    openDialog();
  };

  const [venues, setVenues] = useState<Venue[]>([]);
  type Venue = {
    id: string;
    venueId: string;
    name: string;
    address: string;
  };

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("/api/venue/getAllVenues");
        const formattedVenues = response.data.map(
          (venue: any, index: number) => ({
            id: (index + 1).toString(),
            venueId: venue._id,
            name: venue.venueName,
            address: `${venue.address}, ${venue.city}, ${venue.state}, ${venue.country}`,
          })
        );
        setVenues(formattedVenues);
        console.log("venue", response.data);

        // Set selected venue based on default venueId
        const defaultVenue = formattedVenues.find(
          (v: any) => v.venueId === defaultValues.venueId
        );
        if (defaultVenue) {
          setSelectedVenue(defaultVenue);
        }
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, [isOpen, defaultValues.venueId]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="venueId"
          render={({ field }) => (
            <FormItem>
              <CardHeader>
                <CardTitle>Select Venue</CardTitle>
                <CardDescription>
                  Select a venue for your event.
                </CardDescription>
              </CardHeader>
              <FormControl>
                <div className="">
                  <CardContent className="grid gap-6">
                    <div className="flex items-center justify-between space-x-4">
                      {selectedVenue && (
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/avatars/01.png" />
                            <AvatarFallback>
                              {selectedVenue.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">
                              {selectedVenue.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedVenue.address}
                            </p>
                          </div>
                        </div>
                      )}
                      <Popover open={isOpenPopover}>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpenPopover(true)}
                            className="ml-auto"
                          >
                            {selectedVenue ? "Change Venue" : "Select Venue"}
                            <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="end">
                          <Command>
                            <CommandInput placeholder="Search venues..." />
                            <CommandList>
                              <CommandEmpty>No venues found.</CommandEmpty>
                              <CommandGroup>
                                {venues.map((venue) => (
                                  <CommandItem
                                    key={venue.id}
                                    onSelect={() => handleSelectVenue(venue)}
                                    className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                  >
                                    <p>{venue.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">
                                      {venue.address}
                                    </p>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                              <CommandGroup className=" border-t">
                                <CommandItem
                                  onSelect={handleCreateVenue}
                                  className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                >
                                  <p className="text-primary">Create Venue</p>
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <CreateVenuDialog
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      closeDialog={closeDialog}
                    />
                  </CardContent>
                </div>
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

function TicketVariantForm({ form }: any) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ticketVariants",
  });

  const [newVariant, setNewVariant] = useState({
    type: "",
    description: "",
    price: "",
    quantity: "",
    remaining: "",
  });
  const [showPopover, setShowPopover] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const addVariant = () => {
    setEditingIndex(null);
    setShowPopover(true);
  };

  const editVariant = (index: any) => {
    setEditingIndex(index);
    setNewVariant(form.getValues(`ticketVariants.${index}`));
    setShowPopover(true);
  };

  const saveVariant = () => {
    if (editingIndex !== null) {
      form.setValue(`ticketVariants.${editingIndex}`, newVariant);
    } else {
      append(newVariant);
    }
    setNewVariant({
      type: "",
      description: "",
      price: "",
      quantity: "",
      remaining: "",
    });
    setShowPopover(false);
    setEditingIndex(null);
  };

  const removeVariant = (index: any) => {
    remove(index);
  };

  return (
    <div className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Ticket Variants</CardTitle>
        <CardDescription>
          Customize the ticket variants for your event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`ticketVariants.${index}`}
              render={({ field: formField }) => (
                <FormItem className="flex items-center justify-between gap-4 rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">${formField.value.price}</Badge>
                    <div className="grid gap-1">
                      <div className="text-lg font-semibold">
                        {formField.value.type}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formField.value.remaining} of{" "}
                        {formField.value.quantity} remaining
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formField.value.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => editVariant(index)}
                      className="shrink-0"
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeVariant(index)}
                      className="shrink-0"
                    >
                      Remove
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          ))}
          <Button type="button" variant="outline" onClick={addVariant}>
            Add New Variant
          </Button>
        </div>
      </CardContent>
      <Popover open={showPopover}>
        <PopoverTrigger asChild>
          <div />
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-6 space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={newVariant.type}
                    onChange={(e) =>
                      setNewVariant({ ...newVariant, type: e.target.value })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={newVariant.description}
                    onChange={(e) =>
                      setNewVariant({
                        ...newVariant,
                        description: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={newVariant.price}
                      onChange={(e) =>
                        setNewVariant({ ...newVariant, price: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={newVariant.quantity}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="remaining"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remaining</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    value={newVariant.remaining}
                    onChange={(e) =>
                      setNewVariant({
                        ...newVariant,
                        remaining: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowPopover(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={saveVariant}>
              {editingIndex !== null ? "Save Changes" : "Save"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  return (
    <div className="w-full flex justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="secondary"
          >
            Prev
          </Button>
          <Button size="sm">
            {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  );
}
