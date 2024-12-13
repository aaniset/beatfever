"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Icons } from "@/components/icons";

const ContactPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <SiteHeader />
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center opacity-40 blur-[50px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-100"></div>
      </div>
      <div className="container z-10 max-w-lg mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={4} />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <p>support@psyfever.com</p>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 mt-1" />
              <p>
                Level 6, N-Heights, Plot No 38, Phase 2,
                <br />
                Siddiq Nagar, HITEC City,
                <br />
                Hyderabad, Telangana 500081,
                <br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-100 py-12 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-4">
              {/* <img src="/placeholder.svg" alt="Psyfever Logo" className="h-8 w-auto" /> */}
              <Icons.logo className="h-6 w-6" />

              <span className="text-xl font-bold text-gray-800">Psyfever</span>
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
              <Link href="/terms" className="text-gray-600 hover:text-gray-800">
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
  );
};

export default ContactPage;
