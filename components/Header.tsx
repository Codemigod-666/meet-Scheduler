"use client"; // Mark this as a Client Component

import React from "react";
import { Clock2, CalendarCheck2, ListCheckIcon } from "lucide-react";
import Link from "next/link";
// Image is not used directly in the current rendering logic for avatar, so commented out for cleanliness.
// import Image from "next/image";

import { Button } from "./ui/button"; // Assuming shadcn/ui Button
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // Assuming shadcn/ui Avatar components
import { useSession, signIn, signOut } from "next-auth/react"; // Import signIn and signOut
import { useDispatch } from "react-redux";
import { clearUser } from "@/app/store/userSlice";
import { persistor } from "@/app/store/store";

export default function Header() {
  const { data: session, status } = useSession(); // Get session data and loading status
  const dispatch = useDispatch();

  // Render loading state if session is still being fetched
  if (status === "loading") {
    return (
      <header className="fixed top-0 w-full border-b border-gray-300 bg-white/90 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-white/70">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-gray-900">
            Logo
          </Link>
          <div className="flex items-center space-x-4">
            <p className="text-gray-700">Loading...</p>{" "}
          </div>
        </nav>
      </header>
    );
  }

  // Once session status is not loading, render based on authentication
  const isLoggedIn = !!session?.user;

  return (
    <header className="fixed shadow-lg top-0 w-full border-b border-gray-300 bg-white/90 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-white/70">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* <Link
        
          href="/"
          className="text-lg font-bold text-gray-900 hover:text-blue-700 transition-colors"
        >
          MeetGenie
        </Link> */}

        <Link
          href="/"
          className="
    text-2xl md:text-3xl font-extrabold tracking-wide 
    bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
    bg-clip-text text-transparent 
    hover:brightness-110 transition duration-300 ease-in-out
    drop-shadow-md
  "
        >
          MeetGenie
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {isLoggedIn && ( // Only show these links if the user is logged in
            <>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center rounded-xl gap-2 border-blue-600 text-blue-700 hover:bg-blue-100 hover:border-blue-700"
                >
                  <Clock2 className="h-4 w-4 text-blue-600" />
                  Instant Meeting
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 text-blue-700 hover:bg-blue-100"
                >
                  <Clock2 className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/meeting">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center rounded-xl gap-2 border-indigo-600 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-700"
                >
                  <CalendarCheck2 className="h-4 w-4 text-indigo-600" />
                  Schedule a Meeting
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 text-indigo-700 hover:bg-indigo-100"
                >
                  <CalendarCheck2 className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/list">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center rounded-xl gap-2 border-indigo-600 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-700"
                >
                  <ListCheckIcon className="h-4 w-4 text-indigo-600" />
                  Meetings List
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 text-indigo-700 hover:bg-indigo-100"
                >
                  <CalendarCheck2 className="h-4 w-4" />
                </Button>
              </Link>
            </>
          )}

          {isLoggedIn ? (
            // If logged in, show avatar and a sign-out button
            <>
              <Avatar>
                <AvatarImage
                  src={session.user?.image || "https://github.com/shadcn.png"}
                  alt={session.user?.name || "User Avatar"}
                />
                <AvatarFallback className="bg-blue-600 text-white font-medium">
                  {session.user?.name
                    ? session.user.name.charAt(0).toUpperCase()
                    : session.user?.email
                    ? session.user.email.charAt(0).toUpperCase()
                    : "CN"}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                onClick={async () => {
                  await signOut();
                  dispatch(clearUser());
                  persistor.purge();
                }}
                className="text-gray-800 rounded-xl border-[2px] hover:bg-red-100 hover:text-red-700 transition-colors"
              >
                Sign Out
              </Button>
            </>
          ) : (
            // If not logged in, show a sign-in button
            <Link href="/auth/signin">
              {" "}
              {/* Link directly to your custom login page */}
              <Button
                style={{ borderRadius: "10px" }}
                variant="default"
                className="bg-blue-700 text-white hover:bg-blue-800 transition-colors shadow-md"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
