import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChartIcon,
  CircleBackslashIcon,
  Link1Icon,
} from "@radix-ui/react-icons";
import {
  CalendarCheck,
  IndianRupee,
  MapPin,
  PieChart,
  QrCode,
  Tag,
} from "lucide-react";
// import { Icons } from "./icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { Icons } from "@/components/icons";
export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <SiteHeader />
      <>
        <div className="w-full relative md:top-[-100px] py-16 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          {/* Background image and overlay */}
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
            <img
              src="/hero.jpg"
              alt="Background"
              className="w-full h-full object-cover object-center opacity-40 blur-[50px]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-100"></div>
          </div>
          {/* Content */}
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_600px]">
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-bottom sm:w-full lg:order-last"
                height="310"
                src="/hero-main.jpg" // Replace with your actual hero image
                width="550"
              />
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Experience Live Events Like Never Before
                  </h1>
                  <p className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400">
                    Psyfever is your go-to ticketing platform for music
                    festivals, concerts, and gigs. Zero subscription fees – pay
                    only when you sell tickets!
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-4">
                  <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input
                      className="max-w-lg flex-1"
                      placeholder="Enter your email to get started"
                      type="email"
                    />
                    <Button type="submit">Get Early Access</Button>
                  </form>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Join us today and start selling tickets effortlessly.{" "}
                    <Link className="underline underline-offset-2" href="#">
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Powerful Features for Event Organizers
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl mx-auto">
                  Psyfever provides everything you need to host successful
                  events and manage ticket sales effortlessly.
                </p>
              </div>
              <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: CalendarCheck,
                      color: "blue",
                      title: "Host Events & Sell Tickets",
                      description:
                        "Easily create and manage events, and sell tickets directly through our platform.",
                    },
                    {
                      icon: PieChart,
                      color: "purple",
                      title: "Personalized Dashboard",
                      description:
                        "Get a comprehensive overview of your events, sales, and analytics in one place.",
                    },
                    {
                      icon: Tag,
                      color: "green",
                      title: "Add Promo Codes",
                      description:
                        "Create and manage promotional codes to boost ticket sales and attract attendees.",
                    },
                    {
                      icon: BarChartIcon,
                      color: "red",
                      title: "Powerful Analytics",
                      description:
                        "Gain insights into your event performance with detailed analytics and reports.",
                    },
                    {
                      icon: QrCode,
                      color: "yellow",
                      title: "QR Ticket Validation",
                      description:
                        "Quickly and securely validate tickets at the entrance using QR code technology.",
                    },
                    {
                      icon: MapPin,
                      color: "indigo",
                      title: "Manage Venue & Attendees",
                      description:
                        "Efficiently manage your venue layout and keep track of attendee information.",
                    },
                    {
                      icon: IndianRupee,
                      color: "pink",
                      title: "Instant Automated Payout",
                      description:
                        "Receive your earnings quickly with our automated payout system.",
                    },
                    {
                      icon: Link1Icon,
                      color: "orange",
                      title: "Personalized Event Page",
                      description:
                        "Get a Linktree-style listing page for all your events, perfect for sharing in your bio.",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-4 border border-gray-200 p-6 rounded-lg"
                    >
                      <div
                        className={`p-3 bg-${feature.color}-100 rounded-full`}
                      >
                        <feature.icon
                          className={`text-${feature.color}-500 h-8 w-8`}
                        />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 text-center">
                        {feature.title}
                      </h2>
                      <p className="text-gray-600 text-center">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-100 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex items-center space-x-4">
                {/* <img src="/placeholder.svg" alt="Psyfever Logo" className="h-8 w-auto" /> */}
                <Icons.logo className="h-6 w-6" />

                <span className="text-xl font-bold text-gray-800">
                  Psyfever
                </span>
              </div>
              <nav className="flex flex-wrap justify-center md:justify-end gap-6">
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Terms & Conditions
                </Link>
                <Link
                  href="/refund"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Refund Policy
                </Link>
              </nav>
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Psyfever. All rights reserved.
            </div>
          </div>
        </footer>
      </>
      {/* <Hero />
      <Features /> */}
    </div>
  );
}