// import { Progress } from "@/components/ui/progress";
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { getCurrentUser } from "@/lib/session";
// import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { UserAccountNav } from "@/components/user-account-nav";
// import { EventsTable } from "@/components/dashboard";
// const events = [
//   {
//     id: "1",
//     name: "Sample Event 1",
//     status: "active",
//     price: "29.99",
//     sales: "500",
//     date: "12 June 2024 at 10:30 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "2",
//     name: "Sample Event 2",
//     status: "draft",
//     price: "19.99",
//     sales: "200",
//     date: "12 June 2024 at 2:45 PM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "3",
//     name: "Sample Event 3",
//     status: "active",
//     price: "39.99",
//     sales: "750",
//     date: "12 June 2024 at 4:00 PM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "4",
//     name: "Sample Event 4",
//     status: "draft",
//     price: "15.99",
//     sales: "150",
//     date: "12 June 2024 at 6:15 PM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "5",
//     name: "Sample Event 5",
//     status: "active",
//     price: "49.99",
//     sales: "1000",
//     date: "12 June 2024 at 8:30 PM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "6",
//     name: "Sample Event 6",
//     status: "draft",
//     price: "9.99",
//     sales: "50",
//     date: "12 June 2024 at 10:45 PM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "7",
//     name: "Sample Event 7",
//     status: "active",
//     price: "59.99",
//     sales: "1200",
//     date: "13 June 2024 at 12:00 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "8",
//     name: "Sample Event 8",
//     status: "archived",
//     price: "5.99",
//     sales: "20",
//     date: "13 June 2024 at 2:15 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "9",
//     name: "Sample Event 9",
//     status: "active",
//     price: "69.99",
//     sales: "1500",
//     date: "13 June 2024 at 4:30 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "10",
//     name: "Sample Event 10",
//     status: "archived",
//     price: "4.99",
//     sales: "10",
//     date: "13 June 2024 at 6:45 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "6",
//     name: "Sample Event 6",
//     status: "draft",
//     price: "9.99",
//     sales: "50",
//     date: "12 June 2024 at 10:45 PM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "7",
//     name: "Sample Event 7",
//     status: "active",
//     price: "59.99",
//     sales: "1200",
//     date: "13 June 2024 at 12:00 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "8",
//     name: "Sample Event 8",
//     status: "archived",
//     price: "5.99",
//     sales: "20",
//     date: "13 June 2024 at 2:15 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "9",
//     name: "Sample Event 9",
//     status: "active",
//     price: "69.99",
//     sales: "1500",
//     date: "13 June 2024 at 4:30 AM",
//     imgUrl: "./placeholder.svg",
//   },
//   {
//     id: "10",
//     name: "Sample Event 10",
//     status: "archived",
//     price: "4.99",
//     sales: "10",
//     date: "13 June 2024 at 6:45 AM",
//     imgUrl: "./placeholder.svg",
//   },
// ];
// export default async function Dashboard() {
//   const user = await getCurrentUser();

//   const eventsFound = false;
//   if (!user) {
//     redirect(authOptions?.pages?.signIn || "/login");
//   }
//   return (
//     <div className="flex min-h-screen w-full flex-col">
//       <UserAccountNav></UserAccountNav>
//       <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
//         <div className="mx-auto grid w-full max-w-6xl gap-2">
//           <h1 className="text-3xl font-semibold">Dashboard</h1>
//         </div>

//         <div className="mx-auto grid w-full max-w-6xl gap-2">
//           <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
//             <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
//               <CardHeader className="pb-3">
//                 <CardTitle>Your Orders</CardTitle>
//                 <CardDescription className="max-w-lg text-balance leading-relaxed">
//                   Introducing Our Dynamic Orders Dashboard for Seamless
//                   Management and Insightful Analysis.
//                 </CardDescription>
//               </CardHeader>
//               <CardFooter>
//                 <Button>Create New Order</Button>
//               </CardFooter>
//             </Card>
//             <Card x-chunk="dashboard-05-chunk-1">
//               <CardHeader className="pb-2">
//                 <CardDescription>This Week</CardDescription>
//                 <CardTitle className="text-4xl">$1,329</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-xs text-muted-foreground">
//                   +25% from last week
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Progress value={25} aria-label="25% increase" />
//               </CardFooter>
//             </Card>
//             <Card x-chunk="dashboard-05-chunk-2">
//               <CardHeader className="pb-2">
//                 <CardDescription>This Month</CardDescription>
//                 <CardTitle className="text-4xl">$5,329</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-xs text-muted-foreground">
//                   +10% from last month
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Progress value={12} aria-label="12% increase" />
//               </CardFooter>
//             </Card>
//             <Card x-chunk="dashboard-05-chunk-1">
//               <CardHeader className="pb-2">
//                 <CardDescription>This Week</CardDescription>
//                 <CardTitle className="text-4xl">$1,329</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-xs text-muted-foreground">
//                   +25% from last week
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Progress value={25} aria-label="25% increase" />
//               </CardFooter>
//             </Card>
//             <Card x-chunk="dashboard-05-chunk-2">
//               <CardHeader className="pb-2">
//                 <CardDescription>This Month</CardDescription>
//                 <CardTitle className="text-4xl">$5,329</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-xs text-muted-foreground">
//                   +10% from last month
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Progress value={12} aria-label="12% increase" />
//               </CardFooter>
//             </Card>
//           </div>

//           <EventsTable events={events}></EventsTable>
//         </div>

//       </div>
//     </div>
//   );
// // }
// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import {
//   Bell,
//   User as CircleUser,
//   Home,
//   LineChart,
//   Menu,
//   Package,
//   Package2,
//   Search,
//   ShoppingCart,
//   Users,
// } from "lucide-react";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import EventDashboard from "@/components/event-dashboard";

// export default function Dashboard() {
//   const [currentView, setCurrentView] = useState("dashboard");

//   const renderContent = () => {
//     switch (currentView) {
//       case "dashboard":
//         return <EventDashboard />;
//       case "orders":
//         return <div>Orders Component</div>;
//       case "products":
//         return <div>Products Component</div>;
//       case "customers":
//         return <div>Customers Component</div>;
//       case "analytics":
//         return <div>Analytics Component</div>;
//       default:
//         return <EventDashboard />;
//     }
//   };

//   return (
//     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//       <div className="hidden border-r bg-muted/40 md:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//             <Link href="/" className="flex items-center gap-2 font-semibold">
//               <Package2 className="h-6 w-6" />
//               <span className="">Acme Inc</span>
//             </Link>
//             <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
//               <Bell className="h-4 w-4" />
//               <span className="sr-only">Toggle notifications</span>
//             </Button>
//           </div>
//           <div className="flex-1">
//             <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//               <a
//                 onClick={() => setCurrentView("dashboard")}
//                 className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer"
//               >
//                 <Home className="h-4 w-4" />
//                 Dashboard
//               </a>
//               <a
//                 onClick={() => setCurrentView("orders")}
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
//               >
//                 <ShoppingCart className="h-4 w-4" />
//                 Orders
//                 <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                   6
//                 </Badge>
//               </a>
//               <a
//                 onClick={() => setCurrentView("products")}
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
//               >
//                 <Package className="h-4 w-4" />
//                 Products{" "}
//               </a>
//               <a
//                 onClick={() => setCurrentView("customers")}
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
//               >
//                 <Users className="h-4 w-4" />
//                 Customers
//               </a>
//               <a
//                 onClick={() => setCurrentView("analytics")}
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer"
//               >
//                 <LineChart className="h-4 w-4" />
//                 Analytics
//               </a>
//             </nav>
//           </div>
//           <div className="mt-auto p-4">
//             <Card x-chunk="dashboard-02-chunk-0">
//               <CardHeader className="p-2 pt-0 md:p-4">
//                 <CardTitle>Upgrade to Pro</CardTitle>
//                 <CardDescription>
//                   Unlock all features and get unlimited access to our support
//                   team.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
//                 <Button size="sm" className="w-full">
//                   Upgrade
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//       <div>
//         <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="shrink-0 md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle navigation menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="flex flex-col">
//               <nav className="grid gap-2 text-lg font-medium">
//                 <Link
//                   href="#"
//                   className="flex items-center gap-2 text-lg font-semibold"
//                 >
//                   <Package2 className="h-6 w-6" />
//                   <span className="sr-only">Acme Inc</span>
//                 </Link>
//                 <a
//                   onClick={() => setCurrentView("dashboard")}
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
//                 >
//                   <Home className="h-5 w-5" />
//                   Dashboard
//                 </a>
//                 <a
//                   onClick={() => setCurrentView("orders")}
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground cursor-pointer"
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   Orders
//                   <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
//                     6
//                   </Badge>
//                 </a>
//                 <a
//                   onClick={() => setCurrentView("products")}
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
//                 >
//                   <Package className="h-5 w-5" />
//                   Products
//                 </a>
//                 <a
//                   onClick={() => setCurrentView("customers")}
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
//                 >
//                   <Users className="h-5 w-5" />
//                   Customers
//                 </a>
//                 <a
//                   onClick={() => setCurrentView("analytics")}
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground cursor-pointer"
//                 >
//                   <LineChart className="h-5 w-5" />
//                   Analytics
//                 </a>
//               </nav>
//               <div className="mt-auto">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Upgrade to Pro</CardTitle>
//                     <CardDescription>
//                       Unlock all features and get unlimited access to our
//                       support team.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button size="sm" className="w-full">
//                       Upgrade
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             </SheetContent>
//           </Sheet>
//           <div className="w-full flex-1">
//             <form>
//               <div className="relative">
//                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search products..."
//                   className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
//                 />
//               </div>
//             </form>
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="secondary" size="icon" className="rounded-full">
//                 <CircleUser className="h-5 w-5" />
//                 <span className="sr-only">Toggle user menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Settings</DropdownMenuItem>
//               <DropdownMenuItem>Support</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </header>
//         <main>{renderContent()}</main>
//         // <EventsTable events={events}></EventsTable>
//       </div>
//     </div>
//   );
// }import Image from "next/image"
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  Menu as PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  User as Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
// import EventDashboard from "@/components/event-dashboard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Events</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Events</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <EventDashboard></EventDashboard>
      </div>
    </div>
  );
}
