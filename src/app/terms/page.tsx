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

const TermsAndConditionsPage = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-center">
          Terms and Conditions
        </h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Psyfever ticketing platform ("Service"),
            you agree to be bound by these Terms and Conditions ("Terms"). If
            you disagree with any part of the terms, you may not access the
            Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Psyfever provides a ticketing platform for event organizers to
            create, manage, and sell tickets for various events, including but
            not limited to concerts, festivals, and performances.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            You must create an account to use certain features of the Service.
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>

          <h2>4. Event Organizer Responsibilities</h2>
          <ul>
            <li>Provide accurate and complete information about events.</li>
            <li>
              Ensure compliance with local laws and regulations regarding event
              organization.
            </li>
            <li>
              Handle customer service inquiries related to the event content.
            </li>
            <li>Fulfill all promises made in event descriptions.</li>
          </ul>

          <h2>5. Fees and Payments</h2>
          <p>
            Psyfever charges a fee for each ticket sold through the platform.
            The current fee structure is available on our pricing page. We
            reserve the right to change our fees at any time upon notice.
          </p>

          <h2>6. Payouts</h2>
          <p>
            Event organizers will receive payouts for ticket sales according to
            our payout schedule, minus our fees and any applicable taxes.
            Payouts are subject to our fraud prevention policies.
          </p>

          <h2>7. Refunds and Cancellations</h2>
          <p>
            Refund policies are set by event organizers. Psyfever will
            facilitate refunds according to the organizer's policy. In case of
            event cancellation, organizers are responsible for refunding ticket
            buyers.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality
            are owned by Psyfever and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </p>

          <h2>9. Prohibited Activities</h2>
          <p>Users agree not to engage in activities that may:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Interfere with the operation of the Service</li>
            <li>Attempt to gain unauthorized access to the Service</li>
          </ul>

          <h2>10. Limitation of Liability</h2>
          <p>
            Psyfever shall not be liable for any indirect, incidental, special,
            consequential or punitive damages resulting from your use of the
            Service.
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold Psyfever harmless from any claims,
            losses, liability, damages, and/or costs arising from your use of
            the Service or violation of these Terms.
          </p>

          <h2>12. Modifications to Service</h2>
          <p>
            Psyfever reserves the right to modify or discontinue, temporarily or
            permanently, the Service with or without notice.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of India, without regard to its conflict of law provisions.
          </p>

          <h2>14. Dispute Resolution</h2>
          <p>
            Any disputes arising out of or relating to these Terms or the
            Service will be resolved through arbitration in accordance with the
            Arbitration and Conciliation Act, 1996 of India.
          </p>

          <h2>15. Compliance with Local Laws</h2>
          <p>
            Users are responsible for ensuring compliance with all applicable
            local laws and regulations, including but not limited to
            entertainment tax laws and event licensing requirements in India.
          </p>

          <h2>16. Data Protection and Privacy</h2>
          <p>
            Our data collection and use practices are set forth in our Privacy
            Policy, which is incorporated into these Terms by reference.
          </p>

          <h2>17. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the
            Service immediately, without prior notice or liability, under our
            sole discretion, for any reason whatsoever.
          </p>

          <h2>18. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will
            notify users of any significant changes via email or through the
            Service.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            support@psyfever.com.
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

export default TermsAndConditionsPage;
