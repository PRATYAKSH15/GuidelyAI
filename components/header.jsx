import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox, GraduationCap, BookOpen, Home } from "lucide-react";

export default async function Header() {
  const { userId } = auth();
  const isSignedIn = !!userId;

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-gradient-to-r from-blue-50/70 via-white/60 to-blue-50/70 border-b border-gray-200/50 shadow-md">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="GuidelyAI Logo"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-purple-600 transition-colors text-base font-medium"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>

          <Link
            href="/about"
            className="flex items-center gap-2 hover:text-purple-600 transition-colors text-base font-medium"
          >
            <BookOpen className="h-5 w-5" />
            About
          </Link>

          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-blue-100/50 transition text-base font-medium">
              <LayoutDashboard className="h-5 w-5" />
              Industry Insights
            </Button>
          </Link>

          <Link href={isSignedIn ? "/ai-cover-letter" : "/sign-in"}>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-blue-100/50 transition text-base font-medium">
              <PenBox className="h-5 w-5" />
              Cover Letter
            </Button>
          </Link>

          <Link href={isSignedIn ? "/interview" : "/sign-in"}>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-blue-100/50 transition text-base font-medium">
              <GraduationCap className="h-5 w-5" />
              Interview Prep
            </Button>
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-3">
          {!isSignedIn ? (
            <SignInButton fallbackRedirectUrl="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm px-5 py-2 text-sm font-semibold">
                Sign In
              </Button>
            </SignInButton>
          ) : (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border border-gray-300 shadow-sm",
                },
              }}
              afterSignOutUrl="/"
            />
          )}
        </div>
      </nav>
    </header>
  );
}
