"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, CreditCard, FileText, Upload, Banknote } from "lucide-react";

const paymentFormSchema = z.object({
  accountHolderName: z
    .string()
    .min(2, { message: "Account holder name must be at least 2 characters." }),
  indianBankAccount: z
    .string()
    .min(10, { message: "Please enter a valid Indian bank account number." })
    .max(18, { message: "Please enter a valid Indian bank account number." })
    .optional(),
  indianIFSC: z
    .string()
    .min(11, { message: "Please enter a valid IFSC code." })
    .max(11, { message: "IFSC code must be 11 characters." })
    .optional(),
  usBankAccount: z
    .string()
    .min(10, { message: "Please enter a valid US bank account number." })
    .max(12, { message: "Please enter a valid US bank account number." })
    .optional(),
  usRoutingNumber: z
    .string()
    .min(9, { message: "Routing number must be 9 digits." })
    .max(9, { message: "Routing number must be 9 digits." })
    .optional(),
  idProof: z.string().nonempty({ message: "Please upload an ID proof." }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

export function PaymentForm() {
  const [bankType, setBankType] = useState<"indian" | "us" | "">("");
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
  });

  function onSubmit(data: PaymentFormValues) {
    toast({
      title: "Your payment account details have been submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Payment Accounts</CardTitle>
        <CardDescription>
          Please fill out the form below to upload your bank information and ID
          verification details. Ensure all information is accurate to avoid any
          issues.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="accountHolderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Account holder name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the name as it appears on your bank account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Select Bank Type</FormLabel>
                <Select
                  onValueChange={(value) => setBankType(value as "indian" | "us")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indian">Indian Bank</SelectItem>
                    <SelectItem value="us">US Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {bankType === "indian" && (
                <>
                  <FormField
                    control={form.control}
                    name="indianBankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Indian Bank Account Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Indian bank account number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your Indian bank account number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="indianIFSC"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Indian Bank IFSC Code</FormLabel>
                        <FormControl>
                          <Input placeholder="IFSC code" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the IFSC code of your Indian bank branch.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {bankType === "us" && (
                <>
                  <FormField
                    control={form.control}
                    name="usBankAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>US Bank Account Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="US bank account number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter your US bank account number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usRoutingNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>US Routing Number</FormLabel>
                        <FormControl>
                          <Input placeholder="US routing number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the 9-digit routing number of your US bank.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="idProof"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Proof</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormDescription>
                      Upload a scanned copy of your ID proof (e.g., passport,
                      driver's license).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-2xl mx-auto dark:bg-gray-800 "
          >
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Account Holder Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name as it appears on your bank account"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide the name exactly as it appears on your bank
                    account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="font-semibold">Select Bank Type</FormLabel>
              <Select
                onValueChange={(value) => setBankType(value as "indian" | "us")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your bank type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian Bank</SelectItem>
                  <SelectItem value="us">US Bank</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the type of bank account you are using.
              </FormDescription>
            </div>

            {bankType === "indian" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="indianBankAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Indian Bank Account Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Indian bank account number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your Indian bank account number should be 11-16 digits
                        long.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="indianIFSC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Indian Bank IFSC Code
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your IFSC code" {...field} />
                      </FormControl>
                      <FormDescription>
                        The IFSC code is used for electronic payment
                        applications.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {bankType === "us" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="usBankAccount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        US Bank Account Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your US bank account number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter your 10-12 digit US bank account number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usRoutingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        US Routing Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your 9-digit routing number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The routing number is a 9-digit number used for bank
                        transactions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="idProof"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">ID Proof</FormLabel>
                  <FormControl>
                    <Input type="file" multiple {...field} />
                  </FormControl>
                  <FormDescription>
                    Upload a scanned copy of your ID proof (e.g., passport,
                    driver's license).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="border-t px-6 py-4">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  );
}
