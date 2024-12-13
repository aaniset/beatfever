"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const supportFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(2, { message: "Subject must be at least 2 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

export function SupportForm() {
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
  });

  function onSubmit(data: SupportFormValues) {
    toast({
      title: "You submitted the following values:",
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
        <CardTitle>Contact Support</CardTitle>
        <CardDescription>
          Please fill out the form below to contact our support team. We will
          get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-2xl mx-auto"
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What issue are you facing?"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly summarize your issue or question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Information about your issue or question."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide detailed information about your issue or question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="border-t px-6 py-4">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  );
}
