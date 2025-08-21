"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  // Function to handle protected navigation
  const handleProtectedRoute = (path) => {
    if (isSignedIn) {
      router.push(path); // Navigate if signed in
    } else {
      router.push("/sign-in"); // Redirect to sign-in if not signed in
    }
  };

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="GuidelyAI Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        {/* Main Navigation Buttons */}
        <div className="flex items-center space-x-4">
          {/* Industry Insights */}
          <Button
            variant="outline"
            onClick={() => handleProtectedRoute("/dashboard")}
            className="hidden md:inline-flex items-center gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Industry Insights
          </Button>

          {/* AI Cover Letter */}
          <Button
            variant="outline"
            onClick={() => handleProtectedRoute("/ai-cover-letter")}
            className="hidden md:inline-flex items-center gap-2"
          >
            <PenBox className="h-4 w-4" />
            Cover Letter
          </Button>

          {/* Interview Prep */}
          <Button
            variant="outline"
            onClick={() => handleProtectedRoute("/interview")}
            className="hidden md:inline-flex items-center gap-2"
          >
            <GraduationCap className="h-4 w-4" />
            Interview Prep
          </Button>
        </div>

        {/* Right-Side Authentication */}
        <div className="flex items-center space-x-4">
          {/* If signed out → Show Sign In */}
          <SignedOut>
            <SignInButton fallbackRedirectUrl="/dashboard">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          {/* If signed in → Show Profile */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
