// "use client";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useState } from "react";
// import { PlusCircle, MoreHorizontal } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   DoubleArrowLeftIcon,
//   DoubleArrowRightIcon,
// } from "@radix-ui/react-icons";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export function PromocodesTable({ promocodes }: any) {
//   const router = useRouter();
//   const [selectedTab, setSelectedTab] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter promocodes based on selected tab and search query
//   const filteredPromocodes = promocodes.filter((promocode: any) => {
//     const matchesTab =
//       selectedTab === "all" || promocode.status === selectedTab;

//     const promocodeValuesString = Object.values(promocode)
//       .map((value) => value?.toString().toLowerCase())
//       .join(" ");

//     const matchesSearch = promocodeValuesString.includes(
//       searchQuery.toLowerCase()
//     );

//     return matchesTab && matchesSearch;
//   });

//   // Handle tab trigger click
//   const handleTabClick = (tabValue: string) => {
//     setSelectedTab(tabValue);
//   };

//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//       <Tabs value={selectedTab} onValueChange={handleTabClick}>
//         <div className="flex items-center">
//           <TabsList>
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="active">Active</TabsTrigger>
//             <TabsTrigger value="draft">Draft</TabsTrigger>
//             {/* <TabsTrigger value="archived" className="hidden sm:flex">
//               Archived
//             </TabsTrigger> */}
//           </TabsList>
//           <Input
//             placeholder="Filter Promocodes..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="h-8 mx-4 w-[150px] lg:w-[250px]"
//           />
//         </div>
//         <TabsContent value="all">
//           <PromocodeCard promocodes={filteredPromocodes} />
//         </TabsContent>
//         <TabsContent value="active">
//           <PromocodeCard promocodes={filteredPromocodes} />
//         </TabsContent>
//         <TabsContent value="draft">
//           <PromocodeCard promocodes={filteredPromocodes} />
//         </TabsContent>
//         <TabsContent value="archived">
//           <PromocodeCard promocodes={filteredPromocodes} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// const PromocodeCard = ({ promocodes }: { promocodes: any[] }) => {
//   const router = useRouter();
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   const pageCount = Math.ceil(promocodes.length / pageSize);
//   const paginatedPromocodes = promocodes.slice(
//     pageIndex * pageSize,
//     pageIndex * pageSize + pageSize
//   );

//   const handlePageChange = (newPage: number) => {
//     if (newPage >= 0 && newPage < pageCount) {
//       setPageIndex(newPage);
//     }
//   };

//   return (
//     <Card x-chunk="dashboard-06-chunk-0">
//       <CardHeader className="flex flex-row items-center">
//         <div className="grid gap-2">
//           <CardTitle>Promocodes</CardTitle>
//           <CardDescription>
//             Manage your promocodes and view their usage statistics.
//           </CardDescription>
//         </div>
//         <Button size="sm" className="ml-auto gap-1">
//           <PlusCircle className="h-3.5 w-3.5" />
//           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//             Add Promocode
//           </span>
//         </Button>
//       </CardHeader>
//       <CardContent>
//         {promocodes.length === 0 ? (
//           <div className="flex flex-1 pt-32 pb-32 items-center justify-center rounded-lg border border-dashed shadow-sm">
//             <div className="flex flex-col items-center gap-1 text-center">
//               <h3 className="text-2xl font-bold tracking-tight">
//                 You have no Promocodes
//               </h3>
//               <p className="text-sm text-muted-foreground">
//                 You can start offering discounts as soon as you add a promocode.
//               </p>
//               <Button className="mt-4">Add Promocode</Button>
//             </div>
//           </div>
//         ) : (
//           <div className="max-h-screen overflow-y-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="hidden w-[100px] sm:table-cell sticky top-0 bg-white">
//                     <span className="sr-only">Image</span>
//                   </TableHead>
//                   <TableHead className="sticky top-0 bg-white">Name</TableHead>
//                   <TableHead className="sticky top-0 bg-white">
//                     Status
//                   </TableHead>
//                   <TableHead className="hidden md:table-cell sticky top-0 bg-white">
//                     Discount
//                   </TableHead>
//                   <TableHead className="hidden md:table-cell sticky top-0 bg-white">
//                     Times Used
//                   </TableHead>
//                   <TableHead className="hidden md:table-cell sticky top-0 bg-white">
//                     Promocode
//                   </TableHead>
//                   <TableHead className="sticky top-0 bg-white">
//                     <span className="sr-only">Actions</span>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {paginatedPromocodes.map((promocode: any) => (
//                   <TableRow key={promocode.id}>
//                     <TableCell className="hidden sm:table-cell">
//                       <Image
//                         alt="Promocode image"
//                         className="aspect-square rounded-md object-cover"
//                         height="64"
//                         src="/placeholder.svg"
//                         width="64"
//                       />
//                     </TableCell>
//                     <TableCell
//                       onClick={() => {
//                         router.push(`/promocode/${promocode.id}`);
//                       }}
//                       className="font-medium"
//                     >
//                       {promocode.name}
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline">{promocode.status}</Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell">
//                       ${promocode.discount}
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell">
//                       {promocode.timesUsed}
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell">
//                       {promocode.code}
//                     </TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button
//                             aria-haspopup="true"
//                             size="icon"
//                             variant="ghost"
//                           >
//                             <MoreHorizontal className="h-4 w-4" />
//                             <span className="sr-only">Toggle menu</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem>Edit</DropdownMenuItem>
//                           <DropdownMenuItem>Delete</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>
//       <CardFooter>
//         <div className="flex items-center justify-between px-2">
//           <div className="flex-1 text-sm text-muted-foreground">
//             Showing{" "}
//             <strong>
//               {pageIndex * pageSize + 1}-
//               {Math.min((pageIndex + 1) * pageSize, promocodes.length)}
//             </strong>{" "}
//             of <strong>{promocodes.length}</strong>
//           </div>
//           <div className="flex px-4 items-center space-x-6 lg:space-x-8">
//             <div className="flex items-center space-x-2">
//               <p className="text-sm font-medium">Rows per page</p>
//               <Select
//                 value={`${pageSize}`}
//                 onValueChange={(value) => {
//                   setPageSize(Number(value));
//                   setPageIndex(0);
//                 }}
//               >
//                 <SelectTrigger className="h-8 w-[70px]">
//                   <SelectValue placeholder={pageSize} />
//                 </SelectTrigger>
//                 <SelectContent side="top">
//                   {[10, 20, 30, 40, 50].map((size) => (
//                     <SelectItem key={size} value={`${size}`}>
//                       {size}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex w-[100px] items-center justify-center text-sm font-medium">
//               Page {pageIndex + 1} of {pageCount}
//             </div>
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 className="hidden h-8 w-8 p-0 lg:flex"
//                 onClick={() => handlePageChange(0)}
//                 disabled={pageIndex === 0}
//               >
//                 <span className="sr-only">Go to first page</span>
//                 <DoubleArrowLeftIcon className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="h-8 w-8 p-0"
//                 onClick={() => handlePageChange(pageIndex - 1)}
//                 disabled={pageIndex === 0}
//               >
//                 <span className="sr-only">Go to previous page</span>
//                 <ChevronLeftIcon className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="h-8 w-8 p-0"
//                 onClick={() => handlePageChange(pageIndex + 1)}
//                 disabled={pageIndex >= pageCount - 1}
//               >
//                 <span className="sr-only">Go to next page</span>
//                 <ChevronRightIcon className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="hidden h-8 w-8 p-0 lg:flex"
//                 onClick={() => handlePageChange(pageCount - 1)}
//                 disabled={pageIndex >= pageCount - 1}
//               >
//                 <span className="sr-only">Go to last page</span>
//                 <DoubleArrowRightIcon className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };
"use client";
import { useState } from "react";
import { PlusCircle, MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PromocodeCard = ({ promocode }: { promocode: any }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{promocode.name}</CardTitle>
      <CardDescription>{promocode.description}</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
      <div className="flex space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
          {promocode.startDate} - {promocode.endDate}
        </div>
        <div className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          Updated {promocode.updatedAt}
        </div>
        <div>{promocode.usage} times used</div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </div>
    </CardContent>
  </Card>
);

export function PromocodesTable({ promocodes }: { promocodes: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Filter Promocodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 w-full h-10"
        />
        <Button>
          <PlusCircle className="h-5 w-5" />
          Create Promocode
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedPromocodes.map((promocode) => (
          <PromocodeCard key={promocode.id} promocode={promocode} />
        ))}
      </div>
      <CardFooter className="border-t px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>

            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setPageIndex(0);
              }}
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectContent>
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                </SelectContent>
              ))}
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(0)}
              disabled={pageIndex === 0}
            >
              First
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              Prev
            </Button>
            <span>
              Page {pageIndex + 1} of {pageCount}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex >= pageCount - 1}
            >
              Next
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePageChange(pageCount - 1)}
              disabled={pageIndex >= pageCount - 1}
            >
              Last
            </Button>
          </div>
        </div>
      </CardFooter>
    </div>
  );
}
