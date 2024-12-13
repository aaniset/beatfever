// {
//     "_id": {
//       "$oid": "668722ba7728615009d46415"
//     },
//     "eventName": "Advanced bottom-line internet solution",
//     "eventDescription": "Accommodo nam ulterius dignissimos ea cultellus aliqua eaque sodalitas. Temeritas dicta amplitudo rerum alter tempore vito culpa quod avaritia. Adficio cohaero creo sunt.",
//     "eventFlyer": "https://picsum.photos/seed/Gvp2G/640/480",
//     "timings": [
//       {
//         "date": {
//           "$date": "2024-10-07T20:32:11.839Z"
//         },
//         "startTime": "13:56",
//         "endTime": "10:05"
//       }
//     ],
//     "userId": {
//       "$oid": "6681971d54bbd146fcee3741"
//     },
//     "step": 3,
//     "createdAt": {
//       "$date": "2024-02-13T15:55:38.213Z"
//     },
//     "updatedAt": {
//       "$date": "2024-07-04T00:46:19.238Z"
//     },
//     "status": "draft",
//     "eventId": "668722ba7728615009d46416",
//     "paymentGatewayFee": "organizer",
//     "platformFee": "organizer",
//     "ticketVariants": [
//       {
//         "type": "General Entry",
//         "description": "Standard admission ticket",
//         "quantity": 334,
//         "remaining": 98,
//         "price": 82
//       },
//       {
//         "type": "VIP Access",
//         "description": "VIP ticket with exclusive perks",
//         "quantity": 179,
//         "remaining": 36,
//         "price": 85
//       }
//     ],
//     "venueId": {
//       "$oid": "668722ba7728615009d4640c"
//     }
//   }

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
import { SiteHeader } from "@/components/site-header";
import { EventHomeDetails } from "@/components/event-home-details";

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
      <SiteHeader />
      {/* <UserAccountNav active="dashboard"></UserAccountNav> */}
      <EventHomeDetails />
    </div>
  );
}
