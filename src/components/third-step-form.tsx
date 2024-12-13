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
import { Step, Stepper, useStepper } from "@/components/stepper";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import Image from "next/image";
import TicketVariant from "./EventDetails/ticketVariant";
import { TicketPricingFeesForm } from "./ticket-pricing-fee-form";
import { SelectVenue } from "./select-venu";
const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = (i % 2) * 30;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
});
// Define the default values
const defaultValues = {
  eventName: "",
  eventDescription: "",
  image: null as File | null,
  venueId: 1,
  timings: [
    {
      startDate: undefined as Date | undefined,
      startTime: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      endTime: undefined as Date | undefined,
    },
  ],
};

// Define the schema for the first step
const FirstFormSchema = z.object({
  eventName: z
    .string()
    .min(2, { message: "Event name must be at least 2 characters." }),
  eventDescription: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  image: z
    .instanceof(File)
    .nullable()
    .refine((file) => !file || (file && file.size <= 10 * 1024 * 1024), {
      message: "Max file size is 10MB",
    }),
  venueId: z.number(),
  timings: z.array(
    z.object({
      startDate: z.date().nullable(),
      startTime: z.date().nullable(),
      endDate: z.date().nullable(),
      endTime: z.date().nullable(),
    })
  ),
});

type EventTimeProps = {
  timings: {
    startDate: Date | null;
    startTime: Date | null;
    endDate: Date | null;
    endTime: Date | null;
  }[];
  setTimings: any;
  onAddTiming: () => void;
  onRemoveTiming: (index: number) => void;
};

export default function ThirdStepForm({ StepperFormActions }: any) {
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(FirstFormSchema),
    defaultValues,
    mode: "onChange",
  });
  // Handle venue selection

  const handleSelectVenue = (venueId: number) => {
    form.setValue("venueId", venueId);
  };
  // Handle form submission
  function onSubmit(data: z.infer<typeof FirstFormSchema>) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <SelectVenue onSelect={handleSelectVenue} />
                </>
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
