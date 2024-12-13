"use client";
import UserAccountNav from "@/components/user-account-nav";
import { DataTable } from "./table/components/data-table";
import { columns } from "./table/components/columns";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { OrderSchema, OrderType } from "@/models/orderSchema";

export default function Orders() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderType[]>([]);
  useEffect(() => {
    axios
      .post(`/api/orders/getOrderByEventId`, { eventId })
      .then((response) => {
        const allOrders = response.data;

        const cleanedOrder = z.array(OrderSchema).parse(allOrders);
        setOrders(cleanedOrder);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setIsLoading(false);
      });
  }, [eventId]);
  console.log("orders cleaned", orders);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="orders"></UserAccountNav>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div>
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Dolore minim ea quis fugiat ullamco.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DataTable data={orders} columns={columns} isLoading={isLoading} />
          </CardContent>
        </div>
      </div>
    </div>
  );
}
