"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusCircle, MapPin, MoreHorizontal } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { addDays, format, parse } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import UserAccountNav from "@/components/user-account-nav";
import StepperForm from "@/components/stepper-form";

import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard({ active }: any) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="events"></UserAccountNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Events</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Event</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>

          {/* <EventsTable events={events}></EventsTable> */}
          <div
            className="mx-auto grid w-full max-w-3xl gap-2 px-6"
            x-chunk="dashboard-06-chunk-0"
          >
            <CardHeader>
              <CardTitle>Create Event</CardTitle>
              <CardDescription>
                Manage your Events and view their sales performance.
              </CardDescription>
            </CardHeader>
            <StepperForm />

            <CardFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
