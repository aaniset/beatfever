"use client";
import Link from "next/link";
import {
  Calendar,
  Tag,
  MapPin,
  DollarSign,
  Home,
  LineChart,
  Package,
  Package2,
  Menu as PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  User as Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./mode-toggle";

const navConfig = [
  {
    navItemId: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    navItemId: "events",
    title: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    navItemId: "orders",
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    navItemId: "attendees",
    title: "Attendees",
    href: "/attendees",
    icon: Users2,
  },
  {
    navItemId: "promocodes",
    title: "Promo codes",
    href: "/promocodes",
    icon: Tag,
  },
  {
    navItemId: "venue",
    title: "Venue",
    href: "/venue",
    icon: MapPin,
  },
  {
    navItemId: "payouts",
    title: "Payouts",
    href: "/payouts",
    icon: DollarSign,
  },
  {
    navItemId: "analytics",
    title: "Analytics",
    href: "/analytics",
    icon: LineChart,
  },
  {
    navItemId: "settings",
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const sideNavConfig = [
  {
    navItemId: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    navItemId: "events",
    title: "Events",
    href: "/events",
    icon: Package,
  },
  {
    navItemId: "settings",
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function UserAccountNav({ active }: any) {
  return (
    <>
      <header className="z-10 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {sideNavConfig.map((link) => (
            <Link
              key={link.navItemId}
              href={link.href}
              className={`${
                active === link.navItemId
                  ? "flex items-center gap-4 px-2.5 text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }`}
              passHref
            >
              {link.title}
            </Link>
          ))}
          <Link href="/events/create-event">
            <Button variant={"default"}>Create Event</Button>
          </Link>
          <ModeToggle />
        </nav>
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
              {navConfig.map((link) => (
                <Link
                  key={link.navItemId}
                  href={link.href}
                  className={`${
                    active === link.navItemId
                      ? "flex items-center gap-4 px-2.5 text-foreground"
                      : "flex items-center gap-4 px-2.5 text-muted-foreground transition-colors hover:text-foreground"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Events..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/settings">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <Link href="/settings/support">
                <DropdownMenuItem>Support</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(event) => {
                  event.preventDefault();
                  signOut({
                    callbackUrl: `${window.location.origin}/login`,
                  });
                  console.log("Signed out");
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
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
            {navConfig.map((link) => (
              <Tooltip key={link.navItemId}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={`${
                      active === link.navItemId
                        ? "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                    } md:h-8 md:w-8`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.title}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={`${
                    active === "settings"
                      ? "flex h-9 w-9 items-center justify-center rounded-lg text-foreground"
                      : "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  } md:h-8 md:w-8`}
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
    </>
  );
}
