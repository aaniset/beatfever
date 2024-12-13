// import { useState } from "react";
// "use client";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "../ui/card";
import { FormDescription, FormLabel } from "../ui/form";

export function EventDetails({
  eventName,
  setEventName,
  eventDescription,
  setEventDescription,
}: any) {
  return (
    <div x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Event Information</CardTitle>
        <CardDescription>Provide details about your event.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormLabel>Event Name</FormLabel>
            <Input
              id="eventName"
              type="text"
              className="w-full"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <FormDescription>This is your public display name.</FormDescription>
          </div>
          <div className="grid gap-3">
            <FormLabel htmlFor="eventDescription">Event Description</FormLabel>
            <Textarea
              id="eventDescription"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="min-h-32"
            />
            <FormDescription>This is your public display name.</FormDescription>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
