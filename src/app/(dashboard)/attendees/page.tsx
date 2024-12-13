"use client";
import { DataTable } from "./table/components/data-table";
import { columns } from "./table/components/columns";
import { z } from "zod";
import UserAccountNav from "@/components/user-account-nav";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { AttendeeInfo, AttendeesInfoSchema } from "@/models/attendeesSchema";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Attendees() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [attendees, setAttendees] = useState<AttendeeInfo[]>([]);
  useEffect(() => {
    axios
      .post(`/api/attendees/getAllAttendeesByEvent`, { eventId })
      .then((response) => {
        const allOrders = response.data;
        const cleanedOrder = z.array(AttendeesInfoSchema).parse(allOrders);
        setAttendees(cleanedOrder);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setIsLoading(false);
      });
  }, [eventId]);
  console.log("orders cleaned", attendees);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="attendees"></UserAccountNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div>
          <CardHeader>
            <CardTitle>Attendees</CardTitle>
            <CardDescription>
              Dolore minim ea quis fugiat ullamco.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DataTable
              data={attendees}
              columns={columns}
              isLoading={isLoading}
            />
          </CardContent>
        </div>
      </div>
    </div>
  );
}
