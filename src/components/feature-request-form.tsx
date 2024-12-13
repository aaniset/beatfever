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

const feedbackFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  feedbackType: z
    .string()
    .nonempty({ message: "Please select a feedback type." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

export function FeedbackForm() {
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
  });

  function onSubmit(data: FeedbackFormValues) {
    toast({
      title: "Thank you for your feedback!",
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
        <CardTitle>User Feedback / Feature Request</CardTitle>
        <CardDescription>
          We value your feedback and suggestions. Please fill out the form below
          to share your thoughts with us.
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
              name="feedbackType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Feature Request or Feedback"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify if this is a feature request or general feedback.
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
                    <Textarea placeholder="Your message" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide detailed information about your feedback or feature
                    request.
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
