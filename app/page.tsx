"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";
import { useState } from "react";
import { ArrowDown, ArrowUpNarrowWide } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSession } from "next-auth/react";

const features = [
  {
    title: "Create instant Google Meet links for quick meetings.",
    id: 1,
  },
  {
    title: "Schedule meetings at your preferred date and time.",
    id: 2,
  },
  {
    title: "Automatically sync with your Google Calendar (optional).",
    id: 3,
  },
  {
    title: "Secure authentication with Google Single Sign-On (SSO).",
    id: 4,
  },
];

export default function HomePage() {
  const [openItems, setOpenItems] = useState<Number[]>([]);
  const { data: session } = useSession();

  const toggleItem = (id: Number) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  return (
    <main className="min-h-screen px-4 pb-32 bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100">
      <div className="container mx-auto ">
        <div className="flex min-h-[600px] flex-row justify-around items-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Google Meet Link Generator
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
              Instantly create or schedule Google Meet links with ease. Secure,
              fast, and fully integrated with Google SSO.
            </p>
          </div>
          <div>
            <Card className="w-full max-w-md border-0">
              <CardContent className="py-8">
                <AuthButtons />
              </CardContent>
            </Card>
          </div>
        </div>
        <section className="mt-16 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            What You Can Do
          </h2>
          <Accordion
            type="single"
            className="bg-white border border-gray-200 shadow-lg rounded-2xl"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium px-6 py-5 hover:bg-blue-50 rounded-t-2xl transition">
                Create instant Google Meet links for quick meetings.
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-700 text-base">
                Generate a Google Meet link with a single click—no extra steps,
                no hassle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium px-6 py-5 hover:bg-blue-50 transition">
                Schedule meetings at your preferred date and time.
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-700 text-base">
                Plan ahead by scheduling meetings and sharing links in advance
                with your team or guests.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium px-6 py-5 hover:bg-blue-50 transition">
                Automatically sync with your Google Calendar (optional).
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-700 text-base">
                Seamlessly add meetings to your Google Calendar to stay
                organized and get reminders.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium px-6 py-5 hover:bg-blue-50 rounded-b-2xl transition">
                Secure authentication with Google Single Sign-On (SSO).
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-700 text-base">
                Your data is protected—sign in safely using your Google account
                with industry-standard security.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </main>
  );
}
