"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function VendorPayoutsTable({ payouts }: any) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter payouts based on selected tab and search query
  const filteredPayouts = payouts.filter((payout: any) => {
    const matchesTab = selectedTab === "all" || payout.status === selectedTab;

    const payoutValuesString = Object.values(payout)
      .map((value) => value?.toString().toLowerCase())
      .join(" ");

    const matchesSearch = payoutValuesString.includes(
      searchQuery.toLowerCase()
    );

    return matchesTab && matchesSearch;
  });

  // Handle tab trigger click
  const handleTabClick = (tabValue: string) => {
    setSelectedTab(tabValue);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Tabs value={selectedTab} onValueChange={handleTabClick}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed" className="hidden sm:flex">
              Failed
            </TabsTrigger>
          </TabsList>
          <Input
            placeholder="Filter Payouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 mx-4 w-[150px] lg:w-[250px]"
          />
        </div>
        <TabsContent value="all">
          <PayoutCard payouts={filteredPayouts} />
        </TabsContent>
        <TabsContent value="completed">
          <PayoutCard payouts={filteredPayouts} />
        </TabsContent>
        <TabsContent value="pending">
          <PayoutCard payouts={filteredPayouts} />
        </TabsContent>
        <TabsContent value="failed">
          <PayoutCard payouts={filteredPayouts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const PayoutCard = ({ payouts }: { payouts: any[] }) => {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageCount = Math.ceil(payouts.length / pageSize);
  const paginatedPayouts = payouts.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pageCount) {
      setPageIndex(newPage);
    }
  };

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Vendor Payouts</CardTitle>
          <CardDescription>
            Manage your payouts and view their details.
          </CardDescription>
        </div>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Payout
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        {payouts.length === 0 ? (
          <div className="flex flex-1 pt-32 pb-32 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no Payouts
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start managing payouts as soon as you add one.
              </p>
              <Button className="mt-4">Add Payout</Button>
            </div>
          </div>
        ) : (
          <div className="max-h-screen overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 bg-white">Payout ID</TableHead>
                  <TableHead className="sticky top-0 bg-white">Date</TableHead>
                  <TableHead className="sticky top-0 bg-white">Amount</TableHead>
                  <TableHead className="sticky top-0 bg-white">Status</TableHead>
                  <TableHead className="sticky top-0 bg-white">Description</TableHead>
                  <TableHead className="sticky top-0 bg-white">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedPayouts.map((payout: any) => (
                  <TableRow key={payout.id}>
                    <TableCell
                      onClick={() => {
                        router.push(`/payout/${payout.id}`);
                      }}
                      className="font-medium"
                    >
                      {payout.id}
                    </TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell>${payout.amount}</TableCell>
                    <TableCell>{payout.status}</TableCell>
                    <TableCell>{payout.description}</TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {pageIndex * pageSize + 1}-
              {Math.min((pageIndex + 1) * pageSize, payouts.length)}
            </strong>{" "}
            of <strong>{payouts.length}</strong>
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
    </Card>
  );
};
