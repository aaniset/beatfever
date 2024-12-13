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

const PrivacyPolicyPage = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>
            Psyfever ("we", "our", or "us") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our ticketing platform
            and related services (collectively, the "Service").
          </p>

          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <p>We may collect personally identifiable information, such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing address</li>
            <li>Payment information</li>
          </ul>

          <h3>2.2 Non-Personal Information</h3>
          <p>We may also collect non-personal information, including:</p>
          <ul>
            <li>Browser type</li>
            <li>IP address</li>
            <li>Device information</li>
            <li>Usage data</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use the collected information for various purposes, including:
          </p>
          <ul>
            <li>Providing and maintaining the Service</li>
            <li>
              Processing transactions and sending transaction notifications
            </li>
            <li>Responding to your inquiries and customer support requests</li>
            <li>
              Sending you marketing and promotional communications (with your
              consent)
            </li>
            <li>Improving our Service and developing new features</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>
              Event organizers (limited to necessary information for event
              management)
            </li>
            <li>
              Service providers and business partners who assist in operating
              our Service
            </li>
            <li>
              Law enforcement or government authorities when required by law
            </li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            and we cannot guarantee absolute security.
          </p>

          <h2>6. Your Rights and Choices</h2>
          <p>
            You have certain rights regarding your personal information,
            including:
          </p>
          <ul>
            <li>Accessing and updating your information</li>
            <li>Opting out of marketing communications</li>
            <li>
              Requesting deletion of your data (subject to legal requirements)
            </li>
          </ul>

          <h2>7. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience on our Service. You can manage your cookie preferences
            through your browser settings.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these sites.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We
            do not knowingly collect personal information from children under
            13.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>

          <h2>11. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            provide the Service and fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required by law.
          </p>

          <h2>12. International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries
            other than India. We will take appropriate measures to ensure that
            your personal information remains protected in accordance with this
            Privacy Policy and applicable laws.
          </p>

          <h2>13. Compliance with Indian Laws</h2>
          <p>
            We comply with applicable Indian laws, including the Information
            Technology Act, 2000 and its amendments. We implement reasonable
            security practices and procedures as mandated by the Information
            Technology (Reasonable Security Practices and Procedures and
            Sensitive Personal Data or Information) Rules, 2011.
          </p>

          {/* <h2>14. Grievance Officer</h2>
          <p>
            In accordance with Information Technology Act 2000 and rules made
            there under, the name and contact details of the Grievance Officer
            are provided below:
          </p>
          <p>
            [Name of Grievance Officer]
            <br />
            Psyfever
            <br />
            [Address]
            <br />
            Email: grievance@psyfever.com
          </p> */}

          <h2>15. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
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
            Email: privacy@psyfever.com
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

export default PrivacyPolicyPage;
