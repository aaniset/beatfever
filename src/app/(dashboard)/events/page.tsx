"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PlusCircle, MapPin, MoreHorizontal, Ghost } from "lucide-react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { addDays, format, parse } from "date-fns";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import UserAccountNav from "@/components/user-account-nav";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import axios from "axios";
// const events = [
//   {
//     id: "1",
//     name: "Sample Event 1",
//     status: "active",
//     price: "29.99",
//     sales: "500",
//     date: "12 June 2024 at 10:30 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "2",
//     name: "Sample Event 2",
//     status: "draft",
//     price: "19.99",
//     sales: "200",
//     date: "12 June 2024 at 2:45 PM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "3",
//     name: "Sample Event 3",
//     status: "active",
//     price: "39.99",
//     sales: "750",
//     date: "12 June 2024 at 4:00 PM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "4",
//     name: "Sample Event 4",
//     status: "draft",
//     price: "15.99",
//     sales: "150",
//     date: "12 June 2024 at 6:15 PM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "5",
//     name: "Sample Event 5",
//     status: "active",
//     price: "49.99",
//     sales: "1000",
//     date: "12 June 2024 at 8:30 PM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "6",
//     name: "Sample Event 6",
//     status: "draft",
//     price: "9.99",
//     sales: "50",
//     date: "12 June 2024 at 10:45 PM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "7",
//     name: "Sample Event 7",
//     status: "active",
//     price: "59.99",
//     sales: "1200",
//     date: "13 June 2024 at 12:00 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "8",
//     name: "Sample Event 8",
//     status: "completed",
//     price: "5.99",
//     sales: "20",
//     date: "13 June 2024 at 2:15 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "9",
//     name: "Sample Event 9",
//     status: "active",

//     date: "13 June 2024 at 4:30 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "10",
//     name: "Sample Event 10",
//     status: "completed",
//     price: "4.99",
//     sales: "10",
//     date: "13 June 2024 at 6:45 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "6",
//     name: "Sample Event 6",
//     status: "draft",
//     price: "9.99",
//     sales: "50",
//     date: "12 June 2024 at 10:45 PM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "7",
//     name: "Sample Event 7",
//     status: "active",
//     price: "59.99",
//     sales: "1200",
//     date: "13 June 2024 at 12:00 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "8",
//     name: "Sample Event 8",
//     status: "completed",
//     price: "5.99",
//     sales: "20",
//     date: "13 June 2024 at 2:15 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "9",
//     name: "Sample Event 9",
//     status: "active",
//     price: "69.99",
//     sales: "1500",
//     date: "13 June 2024 at 4:30 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "10",
//     name: "Sample Event 10",
//     status: "completed",
//     price: "4.99",
//     sales: "10",
//     date: "13 June 2024 at 6:45 AM",
//     location: "madison square garden",
//     imgUrl: "./placeholder.svg",
//   },
// ];

export default function Dashboard({ active }: any) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post("/api/events/getEventsbyUser");
        console.log("feycjed event data ", response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchEvents();
  }, []);

  // const filteredEvents = events?.filter((event: any) => {
  //   const matchesTab = selectedTab === "all" || event.status === selectedTab;

  //   const eventValuesString = Object.values(event)
  //     .map((value) => value?.toString().toLowerCase())
  //     .join(" ");

  //   const matchesSearch = eventValuesString.includes(searchQuery.toLowerCase());

  //   const eventDate = parse(event.date, "dd MMMM yyyy 'at' h:mm a", new Date());
  //   const matchesDateRange =
  //     date?.from && date?.to
  //       ? eventDate >= date.from && eventDate <= date.to
  //       : true;

  //   return matchesTab && matchesSearch && matchesDateRange;
  // });

  useEffect(() => {
    const filterEvents = () => {
      console.log("Filtering events:", events); // Debug: log events data

      const filtered = events.filter((event: any) => {
        const matchesTab =
          selectedTab === "all" || event.status === selectedTab;

        const eventValuesString = Object.values(event)
          .map((value) => value?.toString().toLowerCase())
          .join(" ");

        const matchesSearch = eventValuesString.includes(
          searchQuery.toLowerCase()
        );

        const eventDate = parse(
          event.date,
          "MMMM d, yyyy 'at' h:mm a",
          new Date()
        );

        const matchesDateRange =
          date?.from && date?.to
            ? eventDate >= date.from && eventDate <= date.to
            : true;

        return matchesTab && matchesSearch && matchesDateRange;
      });
      setFilteredEvents(filtered);
    };

    filterEvents();
  }, [events, selectedTab, searchQuery, date]);
  // Handle tab trigger click
  const handleTabClick = (tabValue: string) => {
    setSelectedTab(tabValue);
  };
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }
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
                <BreadcrumbPage>Events</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
          {
            <Tabs value={selectedTab} onValueChange={handleTabClick}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <TabsList className="flex mb-4 md:mb-0 md:mr-4">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="active">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="completed">Past Events</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                </TabsList>
                <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
                  <Input
                    placeholder="Search Events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 mb-4 md:mb-0 md:mx-4 w-full md:w-[150px] lg:w-[250px]"
                  />
                  <div className={cn("w-full md:w-auto grid gap-2 md:ml-auto")}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full md:w-[260px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4" align="end">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                        <Button variant="secondary" className="w-full ">
                          All time
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <TabsContent value="all">
                <EventCardTable events={filteredEvents} />
              </TabsContent>
              <TabsContent value="active">
                <EventCardTable events={filteredEvents} />
              </TabsContent>
              <TabsContent value="completed">
                <EventCardTable events={filteredEvents} />
              </TabsContent>
              <TabsContent value="draft">
                <EventCardTable events={filteredEvents} />
              </TabsContent>
            </Tabs>
          }
        </div>
      </div>
    </div>
  );
}
const EventCardTable = ({ events }: { events: any[] }) => {
  const router = useRouter();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageCount = Math.ceil(events.length / pageSize);
  const paginatedEvents = events.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );
  console.log("paginatedEvents", paginatedEvents);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pageCount) {
      setPageIndex(newPage);
    }
  };
  const deleteEvent = () => {};
  return (
    <div x-chunk="dashboard-06-chunk-0">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Manage your Events and view their sales performance.
          </CardDescription>
        </div>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Event
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        {paginatedEvents.length === 0 ? (
          <div className="flex flex-1 pt-32 pb-32 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no Events
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add an Event.
              </p>
              <Button className="mt-4">Add Event</Button>
            </div>
          </div>
        ) : (
          <div className=" max-h-screen overflow-y-auto">
            <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {paginatedEvents && paginatedEvents.length > 0 ? (
                paginatedEvents.map((event, index) => (
                  <Card key={index} className="flex flex-row p-4 items-center">
                    <img
                      src={event.imgUrl || "/placeholder.svg"}
                      alt="Event Image"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4 flex flex-col flex-grow">
                      <CardHeader className="p-0 flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>{event.name}</CardTitle>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/events/create-event?eventId=${event.id}`
                                )
                              }
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={deleteEvent}>
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/orders?eventId=${event.id}`)
                              }
                            >
                              View orders
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/attendees?eventId=${event.id}`)
                              }
                            >
                              View attendees
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/analytics?eventId=${event.id}`)
                              }
                            >
                              View sales
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardHeader>
                      <CardContent className="p-0">
                        <CardDescription className="text-sm text-muted-foreground flex items-center">
                          <CalendarIcon className="mr-1 h-4 w-4" /> {event.date}
                        </CardDescription>
                        <CardDescription className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />{" "}
                          {event.location.address}
                        </CardDescription>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <div>No events found</div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {pageIndex * pageSize + 1}-
              {Math.min((pageIndex + 1) * pageSize, events.length)}
            </strong>{" "}
            of <strong>{events.length}</strong>
          </div>
          <div className="flex px-4 items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPageIndex(0);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {pageIndex + 1} of {pageCount}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => handlePageChange(0)}
                disabled={pageIndex === 0}
              >
                <span className="sr-only">Go to first page</span>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => handlePageChange(pageIndex - 1)}
                disabled={pageIndex === 0}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => handlePageChange(pageIndex + 1)}
                disabled={pageIndex >= pageCount - 1}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => handlePageChange(pageCount - 1)}
                disabled={pageIndex >= pageCount - 1}
              >
                <span className="sr-only">Go to last page</span>
                <DoubleArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </div>
  );
};
