"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CheckCircle, XCircle } from "lucide-react";

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

const privateContactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  emailVerified: z.boolean().optional(),
});

type PrivateContactFormValues = z.infer<typeof privateContactFormSchema>;

export function PrivateContactForm() {
  const form = useForm<PrivateContactFormValues>({
    resolver: zodResolver(privateContactFormSchema),
  });

  function onSubmit(data: PrivateContactFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function handleVerifyEmail() {
    toast({
      title: "Verification email sent",
      description: "Please check your inbox to verify your email address.",
    });
  }

  const emailVerified = form.getValues("emailVerified");

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Private Contact Information</CardTitle>
        <CardDescription>
          Provide your private contact information. This information will be
          kept confidential.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your first name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormDescription>Enter your last name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your address" {...field} />
                  </FormControl>
                  <FormDescription>Enter your address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormDescription>Enter your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    {emailVerified ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                    <span>
                      {emailVerified
                        ? "Email is verified"
                        : "Email is not verified"}
                    </span>
                    {!emailVerified && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleVerifyEmail}
                      >
                        Verify Now
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Update Contact Information</Button> */}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="border-t px-6 py-4">
        <Button type="submit">Update profile</Button>
      </CardFooter>
    </Card>
  );
}
