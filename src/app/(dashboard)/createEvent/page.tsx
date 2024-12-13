import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import UserAccountNav from "@/components/user-account-nav";
import StepperForm from "@/components/stepper-form";

export default async function Dashboard() {
  const user = await getCurrentUser();

  const eventsFound = false;
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <UserAccountNav active=""></UserAccountNav>
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Create Event</h1>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-2">
          {/* <EventsTable events={events}></EventsTable> */}
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Manage your Events and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StepperForm />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
