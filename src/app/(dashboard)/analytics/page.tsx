"use client";
import { useTheme } from "next-themes";

// import EventDashboard from "@/components/event-dashboard";
import UserAccountNav from "@/components/user-account-nav";
import Link from "next/link";
import {
  DollarSign,
  Ticket,
  BarChart,
  CalendarClock,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeftIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

// Mock function to simulate a GET request
const fetchData = () => {
  return {
    overviewData: [
      { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
      { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
    ],
    ticketTypeSales: [
      { type: "General Admission", total: 2000 },
      { type: "VIP", total: 500 },
      { type: "Bundles", total: 300 },
      { type: "Bundles", total: 300 },
      { type: "Bundles", total: 300 },
    ],
    salesRevenue: "$45,231.89",
    totalTicketsSold: 2500,
    totalAttendees: 2350,
    attendanceRate: "94%",
    avgTicketPrice: "$45.23",
    refundRate: "2%",
    checkinRate: "90%",
    onsiteTransactions: "3",
    topSellingEvents: [
      { name: "Techno Mania 2024 Arizona", totalSales: 1500 },
      { name: "Techno Mania 2024 Miami", totalSales: 1200 },
      { name: "Techno Mania 2024 Texas", totalSales: 1100 },
      { name: "Techno Mania 2024 Texas", totalSales: 1100 },

      { name: "Techno Mania 2024 Texas", totalSales: 1100 },
    ],
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
    graphData: [
      {
        average: 400,
        today: 240,
      },
      {
        average: 300,
        today: 139,
      },
      {
        average: 200,
        today: 980,
      },
      {
        average: 278,
        today: 390,
      },
      {
        average: 189,
        today: 480,
      },
      {
        average: 239,
        today: 380,
      },
      {
        average: 349,
        today: 430,
      },
    ],
  };
};

const events = [
  { name: "Techno Mania 2024 Arizona", address: "Madison Square, LV, USA" },
  { name: "Techno Mania 2022 Arizona", address: "Madison Square, LV, USA" },
  { name: "Techno Mania 2024 Miami", address: "Madison Square, LV, USA" },
  { name: "Techno Mania 2024 Texas", address: "Madison Square, LV, USA" },
];

export default function Dashboard({ active }: any) {
  const data = fetchData();
  const { theme: mode } = useTheme();
  //   const theme = themes.find((theme) => theme.name === config.theme);

  const [selectedEvent, setSelectedEvent] = useState(events[0]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="dashboard"></UserAccountNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="font-semibold text-lg md:text-xl">Analytics</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" className="hidden sm:flex">
                Today
              </Button>
              <Button variant="outline" className="hidden md:flex">
                This Month
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarClock className="mr-2 h-4 w-4" />
                    June 01, 2023 - June 30, 2023
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  {/* < Cal initialFocus mode="range" numberOfMonths={2} /> */}
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto">
                    {selectedEvent.name}
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Select an event..." />
                    <CommandList>
                      {events.length === 0 ? (
                        <CommandEmpty>No events found.</CommandEmpty>
                      ) : (
                        <CommandGroup>
                          {events.map((event, index) => (
                            <CommandItem
                              key={index}
                              className="space-y-1 flex flex-col items-start px-4 py-2"
                              onSelect={() => setSelectedEvent(event)}
                            >
                              <p>{event.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {event.address}
                              </p>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      )}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tickets Sold
                </CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.totalTicketsSold}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.salesRevenue}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance Rate
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.attendanceRate}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Ticket Price
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.avgTicketPrice}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Refund Rate
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.refundRate}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Check-in Rate
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.checkinRate}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Onsite transactions{" "}
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.onsiteTransactions}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Event Views
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.onsiteTransactions}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Add to carts{" "}
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.onsiteTransactions}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion rate{" "}
                </CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.onsiteTransactions}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2 xl:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ticket Type Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {data.ticketTypeSales.map((sale, index) => (
                    <div key={index}>
                      <h3 className="text-md font-medium">{sale.type}</h3>
                      <p className="text-2xl font-bold">{sale.total}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>Exercise Minutes</CardTitle>
                <CardDescription>
                  Your exercise minutes are ahead of where you normally are.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.graphData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 0,
                      }}
                    >
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Average
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                      {payload[0].value}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Today
                                    </span>
                                    <span className="font-bold">
                                      {payload[1].value}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        strokeWidth={2}
                        dataKey="average"
                        activeDot={{
                          r: 6,
                          style: {
                            fill: "var(--theme-primary)",
                            opacity: 0.25,
                          },
                        }}
                        style={
                          {
                            stroke: "var(--theme-primary)",
                            opacity: 0.25,
                            "--theme-primary": `hsl(
                                142.1 76.2% 36.3
                        )`,
                          } as React.CSSProperties
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="today"
                        strokeWidth={2}
                        activeDot={{
                          r: 8,
                          style: { fill: "var(--theme-primary)" },
                        }}
                        style={
                          {
                            stroke: "var(--theme-primary)",
                            "--theme-primary": `hsl(142.1 76.2% 36.3)`,
                          } as React.CSSProperties
                        }
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2 xl:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Top Selling Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {data.topSellingEvents.map((event, index) => (
                    <div key={index} className="flex justify-between">
                      <h3 className="text-md font-medium">{event.name}</h3>
                      <p className="text-2xl font-bold">{event.totalSales}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
