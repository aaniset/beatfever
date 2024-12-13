// import Image from "next/image";
// import Link from "next/link";
// import {
//   ChevronLeft,
//   Home,
//   LineChart,
//   Package,
//   Package2,
//   PlusCircle,
//   Search,
//   Settings,
//   ShoppingCart,
//   Upload,
//   Users,
//   Delete,
//   Trash,
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Textarea } from "@/components/ui/textarea";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Progress } from "@/components/ui/progress";

// import { Button } from "@/components/ui/button";

// import { getCurrentUser } from "@/lib/session";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { UserAccountNav } from "@/components/user-account-nav";
// import { DashboardTest } from "@/components/dashboard";
// import { EventDetails } from "@/components/EventDetails/EventDetails";
// import DatePickerWithRange from "@/components/ui/date-picker-with-range";
// import { EventTimeAndPlace } from "@/components/EventDetails/EventTimeAndPlace";
// import { EventFlyer } from "@/components/EventDetails/EventFlyer";
// import TicketVariant from "@/components/EventDetails/ticketVariant";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ChevronDownIcon } from "@radix-ui/react-icons";

// export default async function EventArchive() {
//   //   const user = await getCurrentUser();

//   //   if (!user) {
//   //     redirect(authOptions?.pages?.signIn || "/login");
//   //   }
//   return (
// <Card x-chunk="dashboard-07-chunk-5">
//   <CardHeader>
//     <CardTitle>Archive Product</CardTitle>
//     <CardDescription>
//       Lipsum dolor sit amet, consectetur adipiscing elit.
//     </CardDescription>
//   </CardHeader>
//   <CardContent>
//     <Select>
//       <SelectTrigger id="status" aria-label="Select location">
//         <SelectValue placeholder="Select location" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="draft">Draft</SelectItem>
//         <SelectItem value="published">Active</SelectItem>
//         <SelectItem value="archived" className="border-t">
//           Create Venu
//           <PlusCircle className="h-3.5 w-3.5"> </PlusCircle>
//         </SelectItem>
//       </SelectContent>
//     </Select>
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" className="ml-auto">
//           Owner{" "}
//           <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="p-0" align="end">
//         <Command>
//           <CommandInput placeholder="Select new role..." />
//           <CommandList>
//             <CommandEmpty>No roles found.</CommandEmpty>
//             <CommandGroup>
//               <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                 <p>Viewer</p>
//                 <p className="text-sm text-muted-foreground">
//                   Can view and comment.
//                 </p>
//               </CommandItem>
//               <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                 <p>Developer</p>
//                 <p className="text-sm text-muted-foreground">
//                   Can view, comment and edit.
//                 </p>
//               </CommandItem>
//               <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                 <p>Billing</p>
//                 <p className="text-sm text-muted-foreground">
//                   Can view, comment and manage billing.
//                 </p>
//               </CommandItem>
//               <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                 <p>Owner</p>
//                 <p className="text-sm text-muted-foreground">
//                   Admin-level access to all resources.
//                 </p>
//               </CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//     {/* <Button size="sm" variant="secondary">
//       Archive Product
//     </Button> */}
//   </CardContent>
// </Card>
//   );
// }

"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "./date-time-picker";
const notificationsFormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<NotificationsFormValues> = {
  communication_emails: false,
  marketing_emails: false,
  social_emails: true,
  security_emails: true,
};
type EventScheduleProps = {
  setSecheduleTickets: any;
};
export default function EventSchedule({
  setSecheduleTickets,
}: EventScheduleProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRadioChange = (value: string) => {
    setShowDatePicker(value === "schedule");
  };

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });

  function onSubmit(data: NotificationsFormValues) {
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
    <Card x-chunk="dashboard-07-chunk-5">
      <CardHeader>
        <CardTitle>Archive Product</CardTitle>
        <CardDescription>
          Schedule the ticket sale or set it live now.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Notify me about...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleRadioChange(value);
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="schedule" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Schedule Ticket Sale
                        </FormLabel>
                      </FormItem>
                      {showDatePicker && (
                        <div key={1} className="grid gap-6 sm:grid-cols-2 p-2">
                          <div className="grid gap-3  ">
                            <Label htmlFor={`startDate-${1}`}>Start Date</Label>
                            <DateTimePicker
                              onChange={(value) => {
                                // Updating the state with the updated timings array
                                setSecheduleTickets(value);
                                // Logging the updated timings array
                                console.log("events tickets schedule",value);
                              }}
                              granularity={"minute"}
                            />
                          </div>
                        </div>
                      )}
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="live" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Ticket Sale Live now
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update notifications</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
