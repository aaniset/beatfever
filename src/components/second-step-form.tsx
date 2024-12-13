"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,useFieldArray } from "react-hook-form";
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
  platformFee: "",
  paymentGatewayFee: "",
  ticketVariants: [
    {
      ticketName: undefined as Date | undefined,
      ticketDesc: undefined as Date | undefined,
      ticketStock: undefined as Date | undefined,
      ticketPrice: undefined as Date | undefined,
    },
  ],
};

const secondFormSchema = z.object({
  ticketVariants: z.array(
    z.object({
      ticketName: z
        .string()
        .min(2, { message: "Event name must be at least 2 characters." }),
      ticketDesc: z
        .string()
        .min(6, { message: "Event name must be at least 6 characters." }),
      ticketStock: z.number().optional(),
      ticketPrice: z.number({ required_error: "Ticket Price is required" }),
    })
  ),
  platformFee: z.string({ required_error: "Select an option" }),
  paymentGatewayFee: z.string({ required_error: "Select an option" }),
});

export default function SecondStepForm({ StepperFormActions }: any) {
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(secondFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // Handle form submission
  function onSubmit(data: z.infer<typeof secondFormSchema>) {
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
  const [beatFeverFee, setBeatFeverFee] = useState("");
  const [creditCardFee, setCreditCardFee] = useState("");
  const [variants, setVariants] = useState([
    {
      name: "Standard Ticket",
      stock: 100,
      price: 99.99,
      description: "Includes entry to the event.",
    },
  ]);
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      { name: "", stock: 0, price: 0, description: "" },
    ]);
  };
  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };
  const handleDeleteVariant = (index: number) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ticketVariants",
  });
  return (
    <Form {...form}>
      <CardHeader className=" items-center">
        <CardTitle>Ticket Variants</CardTitle>
        <CardDescription>
          Add different ticket options for your event.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      {  fields.map((field,index)=>(

        ))}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <CardContent>
              <FormItem className="p-6">
                {variants.map((variant, index) => (
                  <div key={index} className="grid gap-6">
                    <div className=" grid gap-2">
                      <FormLabel htmlFor={`name-${index}`}>Name</FormLabel>
                      <FormControl>
                        <Input
                          id={`name-${index}`}
                          type="text"
                          className="w-full"
                          value={variant.name}
                          onChange={(e) =>
                            handleInputChange(index, "name", e.target.value)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                    </div>
                    <div className=" grid gap-2 ">
                      <FormLabel htmlFor={`description-${index}`}>
                        Description
                      </FormLabel>
                      <Textarea
                        id={`description-${index}`}
                        value={variant.description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="min-h-16"
                      />
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FormItem>
                        <FormLabel htmlFor={`stock-${index}`}>Stock</FormLabel>
                        <Input
                          id={`stock-${index}`}
                          type="number"
                          value={variant.stock}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "stock",
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      </FormItem>

                      <FormItem>
                        <FormLabel htmlFor={`price-${index}`}>Price</FormLabel>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          value={variant.price}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                        />
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                      </FormItem>
                    </div>
                    <div className="grid gap-3">
                      {variants[index] ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="gap-1 w-full"
                          onClick={() => handleDeleteVariant(index)}
                        >
                          <MinusCircle className="h-3.5 w-3.5" />
                          Remove Variant
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="gap-1 w-full"
                          onClick={handleAddVariant}
                        >
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Variant{" "}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-1 w-full"
                  onClick={handleAddVariant}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant{" "}
                </Button>
              </FormItem>
              <FormItem className="mx-auto p-6 w-full">
                <CardHeader className=" items-center">
                  <CardTitle>Ticket Pricing Fees</CardTitle>
                  <CardDescription>
                    Who will pay the ticketing fees?
                  </CardDescription>
                </CardHeader>
                <div className="grid grid-col-2 gap-4 ">
                  <div className="grid gap-2 ">
                    <FormLabel>BeatFever Fee</FormLabel>
                    <Select
                      defaultValue={beatFeverFee}
                      onValueChange={setBeatFeverFee}
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
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                  </div>
                  <div className="grid gap-2 ">
                    <FormLabel htmlFor="creditCardFee">
                      Credit Card Fee / Payment Gateway Fee
                    </FormLabel>
                    <Select
                      defaultValue={creditCardFee}
                      onValueChange={setCreditCardFee}
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
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                  </div>
                </div>
              </FormItem>
            </CardContent>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}
