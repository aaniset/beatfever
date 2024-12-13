"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@radix-ui/react-dropdown-menu";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const organizationFormSchema = z.object({
  organizationName: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters." }),
  organizationDescription: z.string().min(10, {
    message: "Organization description must be at least 10 characters.",
  }),
  currency: z.string().nonempty({ message: "Please select a currency." }),
  language: z.string().nonempty({ message: "Please select a language." }),
});

type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

const currencies = [
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
  { label: "INR", value: "inr" },
];

const languages = [
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
];

export function OrganizationForm() {
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(organizationFormSchema),
  });

  function onSubmit(data: OrganizationFormValues) {
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
        <CardTitle>Organization Settings</CardTitle>
        <CardDescription>
          Update your organization settings. Set your preferred currency and
          language.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
           
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.value}
                            value={currency.value}
                          >
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Choose the currency your organization uses.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the primary language of your organization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Update Organization</Button> */}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="border-t px-6 py-4">
        <Button type="submit">Update Organization</Button>
      </CardFooter>
    </Card>
  );
}
