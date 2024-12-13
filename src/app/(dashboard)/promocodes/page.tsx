// import UserAccountNav from "@/components/user-account-nav";
// import { EventsTable } from "@/components/dashboard";
// import { PromocodesTable } from "@/components/promocodes-table";

// export default function Dashboard({ active }: any) {
// // Dummy data for the promocodes table
// const dummyPromocodes = [
//     {
//       id: 1,
//       name: "Winter Sale",
//       status: "active",
//       discount: 10,
//       timesUsed: 150,
//       code: "WINTER10",
//     },
//     {
//       id: 2,
//       name: "Summer Special",
//       status: "draft",
//       discount: 15,
//       timesUsed: 80,
//       code: "SUMMER15",
//     },
//     {
//       id: 3,
//       name: "Black Friday",
//       status: "archived",
//       discount: 50,
//       timesUsed: 300,
//       code: "BLACKFRIDAY50",
//     },
//     {
//       id: 4,
//       name: "New Year Offer",
//       status: "active",
//       discount: 20,
//       timesUsed: 200,
//       code: "NEWYEAR20",
//     },
//     {
//       id: 5,
//       name: "Spring Discount",
//       status: "draft",
//       discount: 5,
//       timesUsed: 60,
//       code: "SPRING5",
//     },
//     {
//       id: 6,
//       name: "Cyber Monday",
//       status: "archived",
//       discount: 30,
//       timesUsed: 250,
//       code: "CYBERMONDAY30",
//     },
//     {
//       id: 7,
//       name: "Holiday Promo",
//       status: "active",
//       discount: 25,
//       timesUsed: 100,
//       code: "HOLIDAY25",
//     },
//     {
//       id: 8,
//       name: "Valentine's Day",
//       status: "draft",
//       discount: 20,
//       timesUsed: 70,
//       code: "VALENTINE20",
//     },
//     {
//       id: 9,
//       name: "Halloween Deal",
//       status: "archived",
//       discount: 35,
//       timesUsed: 180,
//       code: "HALLOWEEN35",
//     },
//     {
//       id: 10,
//       name: "Flash Sale",
//       status: "active",
//       discount: 40,
//       timesUsed: 220,
//       code: "FLASH40",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <UserAccountNav active="promocodes"></UserAccountNav>
//       <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//         <PromocodesTable promocodes={dummyPromocodes}></PromocodesTable>
//       </div>
//     </div>
//   );
// }
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
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

const promocodes = [
  {
    id: "1",
    code: "SAVE10",
    description: "Save $10 on your order",
    timesUsed: 100,
    discount: "Flat $10 Off",
    status: "active",
  },
  {
    id: "2",
    code: "SUMMER20",
    description: "20% off summer sale",
    timesUsed: 50,
    discount: "20% Off",
    status: "draft",
  },
  {
    id: "3",
    code: "WELCOME15",
    description: "15% off for new customers",
    timesUsed: 150,
    discount: "15% Off",
    status: "active",
  },
  {
    id: "4",
    code: "FREESHIP",
    description: "Free shipping on orders over $50",
    timesUsed: 200,
    discount: "Free Shipping",
    status: "draft",
  },
  {
    id: "5",
    code: "HOLIDAY25",
    description: "25% off holiday sale",
    timesUsed: 75,
    discount: "25% Off",
    status: "active",
  },
];

export default function Dashboard({ active }: any) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPromocodes = promocodes.filter((promocode: any) => {
    const matchesTab =
      selectedTab === "all" || promocode.status === selectedTab;

    const promocodeValuesString = Object.values(promocode)
      .map((value) => value?.toString().toLowerCase())
      .join(" ");

    const matchesSearch = promocodeValuesString.includes(
      searchQuery.toLowerCase()
    );

    return matchesTab && matchesSearch;
  });

  const handleTabClick = (tabValue: string) => {
    setSelectedTab(tabValue);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="promocodes"></UserAccountNav>

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
                <BreadcrumbPage>Promocodes</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
          <Tabs value={selectedTab} onValueChange={handleTabClick}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <TabsList className="flex mb-4 md:mb-0 md:mr-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
              </TabsList>
              <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
                <Input
                  placeholder="Search Promocodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 mb-4 md:mb-0 md:mx-4 w-full md:w-[150px] lg:w-[250px]"
                />
              </div>
            </div>

            <TabsContent value="all">
              <PromocodeCardTable promocodes={filteredPromocodes} />
            </TabsContent>
            <TabsContent value="draft">
              <PromocodeCardTable promocodes={filteredPromocodes} />
            </TabsContent>
            <TabsContent value="active">
              <PromocodeCardTable promocodes={filteredPromocodes} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const PromocodeCardTable = ({ promocodes }: { promocodes: any[] }) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageCount = Math.ceil(promocodes.length / pageSize);
  const paginatedPromocodes = promocodes.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pageCount) {
      setPageIndex(newPage);
    }
  };

  return (
    <div x-chunk="dashboard-06-chunk-0">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Promocodes</CardTitle>
          <CardDescription>
            Manage your Promocodes and view their usage.
          </CardDescription>
        </div>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Promocode
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        {promocodes.length === 0 ? (
          <div className="flex flex-1 pt-32 pb-32 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no Promocodes
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start using promocodes as soon as you add one.
              </p>
              <Button className="mt-4">Add Promocode</Button>
            </div>
          </div>
        ) : (
          <div className="max-h-screen overflow-y-auto">
            <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {promocodes.map((promocode) => (
                <Card key={promocode.id} className="flex flex-col p-4">
                  <div className="flex flex-col flex-grow">
                    <CardHeader className="p-0 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>{promocode.code}</CardTitle>
                        <CardDescription>
                          {promocode.description}
                        </CardDescription>
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardHeader>
                    <CardContent className="p-0 mt-4">
                      <CardDescription className="text-sm text-muted-foreground">
                        Total Uses: {promocode.timesUsed}
                      </CardDescription>
                      <CardDescription className="text-sm text-muted-foreground">
                        Discount: {promocode.discount}
                      </CardDescription>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Rows per page:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-16">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <span className="text-sm">
            {pageIndex + 1} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex >= pageCount - 1}
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Next page</span>
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
      </CardFooter>
    </div>
  );
};
