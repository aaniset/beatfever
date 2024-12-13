"use client";
// import EventDashboard from "@/components/event-dashboard";
import UserAccountNav from "@/components/user-account-nav";
import Link from "next/link";
import {
  DollarSign,
  Ticket,
  Clock,
  Calendar,
  ArrowUpRight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Overview } from "@/components/overview";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/loading";
import { z } from "zod";

// Mock function to simulate a GET request
const fetchData = () => {
  return {
    overviewData: [
      {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
    ],

    totalRevenue: "$45,231.89",
    receivedTickets: 2350,
    pendingPayouts: "$12,234",
    totalEvents: 10,
    revenueChange: "+20.1%",
    transactions: [
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        type: "Ticket Purchase",
        status: "Approved",
        date: "2023-06-23",
        amount: "$250.00",
      },
      {
        customer: "Olivia Smith",
        email: "olivia@example.com",
        type: "Refund",
        status: "Declined",
        date: "2023-06-24",
        amount: "$150.00",
      },
      {
        customer: "Noah Williams",
        email: "noah@example.com",
        type: "Subscription",
        status: "Approved",
        date: "2023-06-25",
        amount: "$350.00",
      },
      {
        customer: "Emma Brown",
        email: "emma@example.com",
        type: "Ticket Purchase",
        status: "Approved",
        date: "2023-06-26",
        amount: "$450.00",
      },
      {
        customer: "Liam Johnson",
        email: "liam@example.com",
        type: "Ticket Purchase",
        status: "Approved",
        date: "2023-06-27",
        amount: "$550.00",
      },
    ],
  };
};
// Define your Zod schema
const DashboardResponseSchema = z.object({
  overviewData: z.array(
    z.object({
      name: z.string(),
      total: z.number(),
    })
  ),
  totalRevenue: z.string(),
  receivedTickets: z.number(),
  pendingPayouts: z.string(),
  totalEvents: z.number(),
  revenueChange: z.string(),
  transactions: z.array(
    z.object({
      customer: z.string(),
      email: z.string().email(),
      type: z.string(),
      status: z.string(),
      date: z.string(),
      amount: z.string(),
    })
  ),
});

// Infer the type from the Zod schema
type DashboardDetails = z.infer<typeof DashboardResponseSchema>;

export default function Dashboard({ active }: any) {
  const [dashboardDetails, setDashboardDetails] =
    useState<DashboardDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        console.log("dashboard", response.data);
        setDashboardDetails(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setIsLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchEvents();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="dashboard"></UserAccountNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {isLoading ? (
          <Loading />
        ) : (
          dashboardDetails && (
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card x-chunk="dashboard-01-chunk-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardDetails?.totalRevenue}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardDetails?.revenueChange} from last month
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Awaiting
                    </CardTitle>
                    <Ticket className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardDetails?.receivedTickets}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <a href="/payouts" className="underline">
                        View last payout
                      </a>
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pending Payouts
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardDetails?.pendingPayouts}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <a href="/payouts" className="underline">
                        View upcoming payout
                      </a>
                    </p>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Events
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardDetails?.totalEvents}
                    </div>
                    <a
                      href="/payouts"
                      className="text-xs text-muted-foreground underline"
                    >
                      View all events
                    </a>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>Sales Overview</CardTitle>
                      <CardDescription>
                        Recent ticket sales and transactions.
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href="#">
                        Analytics
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Overview data={dashboardDetails.overviewData} />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-01-chunk-5">
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>
                        Details of recent ticket purchases.
                      </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                      <Link href="#">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden xl:table-column">
                            Type
                          </TableHead>
                          <TableHead className="hidden xl:table-column">
                            Status
                          </TableHead>
                          <TableHead className="hidden xl:table-column">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardDetails.transactions.map(
                          (transaction, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="font-medium">
                                  {transaction.customer}
                                </div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                  {transaction.email}
                                </div>
                              </TableCell>
                              <TableCell className="hidden xl:table-column">
                                {transaction.type}
                              </TableCell>
                              <TableCell className="hidden xl:table-column">
                                <Badge className="text-xs" variant="outline">
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                {transaction.date}
                              </TableCell>
                              <TableCell className="text-right">
                                {transaction.amount}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </main>
          )
        )}
      </div>
    </div>
  );
}
