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

const RefundPage = () => {
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
      <div className="z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Refund Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. General Policy</h2>
          <p>
            At Psyfever, we strive to ensure a fair and transparent ticketing
            process for all users. Our refund policy is designed to protect both
            event organizers and ticket purchasers. Please read this policy
            carefully before making a purchase.
          </p>

          <h2>2. No Refunds After Purchase</h2>
          <p>
            As a general rule, <strong>all ticket sales are final</strong>. Once
            a ticket has been purchased, no refunds will be issued except in the
            specific circumstances outlined in this policy.
          </p>

          <h2>3. Exceptions for Event Rescheduling or Cancellation</h2>
          <p>Refunds may be possible in the following circumstances:</p>
          <ul>
            <li>The event is rescheduled by the organizer</li>
            <li>The event is cancelled by the organizer</li>
          </ul>
          <p>
            In these cases, the issuance of refunds is the sole responsibility
            of the event organizer. Psyfever will facilitate the refund process
            but is not responsible for the final decision or the actual refund.
          </p>

          <h2>4. Organizer Responsibility</h2>
          <p>Event organizers are solely responsible for:</p>
          <ul>
            <li>
              Deciding whether to issue refunds in case of rescheduling or
              cancellation
            </li>
            <li>Communicating their refund policy to ticket holders</li>
            <li>Processing and issuing any approved refunds</li>
          </ul>

          <h2>5. Refund Process</h2>
          <p>
            If an event is rescheduled or cancelled, and the organizer decides
            to offer refunds:
          </p>
          <ol>
            <li>
              The organizer will notify Psyfever of their decision to issue
              refunds
            </li>
            <li>
              Psyfever will facilitate communication between the organizer and
              ticket holders
            </li>
            <li>
              Ticket holders will be provided instructions on how to request a
              refund
            </li>
            <li>
              The organizer will process approved refunds through the Psyfever
              platform
            </li>
          </ol>

          <h2>6. Timeframe for Refunds</h2>
          <p>
            If a refund is approved by the event organizer, it may take 5-10
            business days for the refund to be processed and reflected in the
            ticket holder's account, depending on the payment method used.
          </p>

          <h2>7. Ticket Holder Acknowledgment</h2>
          <p>
            By purchasing a ticket through Psyfever, users acknowledge and agree
            that:
          </p>
          <ul>
            <li>They have read and understood this refund policy</li>
            <li>
              They are aware that all sales are final unless the event is
              rescheduled or cancelled
            </li>
            <li>
              Refunds are at the discretion of the event organizer in cases of
              rescheduling or cancellation
            </li>
            <li>
              This refund policy is clearly mentioned on each event details page
            </li>
          </ul>

          <h2>8. Disputes</h2>
          <p>
            Any disputes regarding refunds should be directed to the event
            organizer. Psyfever will not mediate disputes between organizers and
            ticket holders but may provide relevant transaction information if
            required.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this refund policy at any time.
            Changes will be effective immediately upon posting to our website.
            Your continued use of our service after any changes indicates your
            acceptance of the new policy.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about this Refund Policy, please contact
            us at:
          </p>
          <p>
            Psyfever
            <br />
            Level 6, N-Heights, Plot No 38, Phase 2,
            <br />
            Siddiq Nagar, HITEC City,
            <br />
            Hyderabad, Telangana 500081,
            <br />
            India
            <br />
            Email: support@psyfever.com
          </p>
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

export default RefundPage;
