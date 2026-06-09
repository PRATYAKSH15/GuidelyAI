// "use client";

// import React from "react";
// import { Button } from "./ui/button";
// import {
//   PenBox,
//   LayoutDashboard,
//   GraduationCap,
// } from "lucide-react";
// import Link from "next/link";
// import { SignedIn, SignedOut, SignInButton, useUser, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const { isSignedIn } = useUser();
//   const router = useRouter();

//   // Function to handle protected navigation
// const handleProtectedRoute = (path) => {
//   // Define public routes (accessible without sign-in)
//   const publicRoutes = ["/", "/about"];

//   if (publicRoutes.includes(path)) {
//     router.push(path); // ✅ Directly navigate if it's a public page
//     return;
//   }

//   // For protected routes, check authentication
//   if (isSignedIn) {
//     router.push(path);
//   } else {
//     router.push("/sign-in"); // Redirect to sign-in if not signed in
//   }
// };

//   return (
//     <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
//       <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src={"/logo.png"}
//             alt="GuidelyAI Logo"
//             width={200}
//             height={60}
//             className="h-12 py-1 w-auto object-contain"
//           />
//         </Link>

//         {/* Main Navigation Buttons */}
//         <div className="flex items-center space-x-4">

//           {/* Home */}
//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <LayoutDashboard className="h-4 w-4" />
//             Home
//           </Button>

//           {/* About */}
//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/about")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <LayoutDashboard className="h-4 w-4" />
//             About
//           </Button>

//           {/* Industry Insights */}
//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/dashboard")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <LayoutDashboard className="h-4 w-4" />
//             Industry Insights
//           </Button>

//           {/* AI Cover Letter */}
//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/ai-cover-letter")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <PenBox className="h-4 w-4" />
//             Cover Letter
//           </Button>

//           {/* Interview Prep */}
//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/interview")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <GraduationCap className="h-4 w-4" />
//             Interview Prep
//           </Button>
//         </div>

//         {/* Right-Side Authentication */}
//         <div className="flex items-center space-x-4">
//           {/* If signed out → Show Sign In */}
//           <SignedOut>
//             <SignInButton fallbackRedirectUrl="/dashboard">
//               <Button variant="outline">Sign In</Button>
//             </SignInButton>
//           </SignedOut>

//           {/* If signed in → Show Profile */}
//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: "w-10 h-10",
//                   userButtonPopoverCard: "shadow-xl",
//                   userPreviewMainIdentifier: "font-semibold",
//                 },
//               }}
//               afterSignOutUrl="/"
//             />
//           </SignedIn>
//         </div>
//       </nav>
//     </header>
//   );
// }




"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  PenBox,
  LayoutDashboard,
  GraduationCap,
  Map,
  FileText,
  ChevronDown,
  Briefcase,
} from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const tools = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Industry Insights" },
  { href: "/resume", icon: FileText, label: "Resume Builder" },
  { href: "/ai-cover-letter", icon: PenBox, label: "Cover Letter" },
  { href: "/interview", icon: GraduationCap, label: "Interview Prep" },
  { href: "/career-roadmap", icon: Map, label: "Career Roadmap" },
];

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="GuidelyAI Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <SignedIn>
            {/* Tools dropdown — desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Tools
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {tools.map(({ href, icon: Icon, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link href={href} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools dropdown — mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Briefcase className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {tools.map(({ href, icon: Icon, label }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link href={href} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton fallbackRedirectUrl="/dashboard">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
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

// "use client";
// import React from "react";
// import { Button } from "./ui/button";
// import {
//   PenBox,
//   LayoutDashboard,
//   GraduationCap,
//   Home,
//   Info,
// } from "lucide-react";
// import Link from "next/link";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import Image from "next/image";

// export default function Header() {
//   const handleProtectedRoute = (path) => {
//     window.location.href = path;
//   };

//   return (
//     <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
//       <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/logo.png"
//             alt="Sensai Logo"
//             width={200}
//             height={60}
//             className="h-12 py-1 w-auto object-contain"
//           />
//         </Link>

//         {/* Action Buttons */}
//         <div className="flex items-center space-x-2 md:space-x-4">
//           {/* Home and About visible to everyone */}
//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <Home className="h-4 w-4" />
//             Home
//           </Button>

//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/about")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <Info className="h-4 w-4" />
//             About
//           </Button>

//           {/* Signed-in only buttons */}
//           <SignedIn>
//             {/* Dashboard */}
//             <Link href="/dashboard">
//               <Button
//                 variant="outline"
//                 className="hidden md:inline-flex items-center gap-2"
//               >
//                 <LayoutDashboard className="h-4 w-4" />
//                 Industry Insights
//               </Button>
//               <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
//                 <LayoutDashboard className="h-4 w-4" />
//               </Button>
//             </Link>

//             {/* Growth Tools (inline) */}
//             <Link href="/ai-cover-letter">
//               <Button variant="outline" className="flex items-center gap-2">
//                 <PenBox className="h-4 w-4" />
//                 Cover Letter
//               </Button>
//             </Link>

//             <Link href="/interview">
//               <Button variant="outline" className="flex items-center gap-2">
//                 <GraduationCap className="h-4 w-4" />
//                 Interview Prep
//               </Button>
//             </Link>

//             {/* Mobile compact icons */}
//             <div className="md:hidden flex space-x-1">
//               <Link href="/ai-cover-letter">
//                 <Button variant="ghost" className="w-10 h-10 p-0">
//                   <PenBox className="h-4 w-4" />
//                 </Button>
//               </Link>
//               <Link href="/interview">
//                 <Button variant="ghost" className="w-10 h-10 p-0">
//                   <GraduationCap className="h-4 w-4" />
//                 </Button>
//               </Link>
//             </div>
//           </SignedIn>

//           {/* Auth Buttons */}
//           <SignedOut>
//             <SignInButton>
//               <Button variant="outline">Sign In</Button>
//             </SignInButton>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: "w-10 h-10",
//                   userButtonPopoverCard: "shadow-xl",
//                   userPreviewMainIdentifier: "font-semibold",
//                 },
//               }}
//               afterSignOutUrl="/"
//             />
//           </SignedIn>
//         </div>
//       </nav>
//     </header>
//   );
// }



// "use client";
// import React from "react";
// import { Button } from "./ui/button";
// import {
//   PenBox,
//   LayoutDashboard,
//   GraduationCap,
//   Home,
//   Info,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import Image from "next/image";

// export default function Header() {
//   const router = useRouter();

//   const handleProtectedRoute = (path) => {
//     router.push(path);
//   };

//   return (
//     <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
//       <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/">
//           <Image
//             src="/logo.png"
//             alt="Sensai Logo"
//             width={200}
//             height={60}
//             className="h-12 py-1 w-auto object-contain"
//           />
//         </Link>

//         {/* Buttons visible to everyone */}
//         <div className="flex items-center space-x-2 md:space-x-4">
//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <Home className="h-4 w-4" />
//             Home
//           </Button>

//           <Button
//             variant="outline"
//             onClick={() => handleProtectedRoute("/about")}
//             className="hidden md:inline-flex items-center gap-2"
//           >
//             <Info className="h-4 w-4" />
//             About
//           </Button>

//           {/* Signed-in only buttons */}
//           <SignedIn>
//             <Link href="/dashboard">
//               <Button
//                 variant="outline"
//                 className="hidden md:inline-flex items-center gap-2"
//               >
//                 <LayoutDashboard className="h-4 w-4" />
//                 Industry Insights
//               </Button>
//               <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
//                 <LayoutDashboard className="h-4 w-4" />
//               </Button>
//             </Link>

//             <Link href="/ai-cover-letter">
//               <Button variant="outline" className="flex items-center gap-2">
//                 <PenBox className="h-4 w-4" />
//                 Cover Letter
//               </Button>
//             </Link>

//             <Link href="/interview">
//               <Button variant="outline" className="flex items-center gap-2">
//                 <GraduationCap className="h-4 w-4" />
//                 Interview Prep
//               </Button>
//             </Link>

//             {/* Mobile compact icons */}
//             <div className="md:hidden flex space-x-1">
//               <Link href="/ai-cover-letter">
//                 <Button variant="ghost" className="w-10 h-10 p-0">
//                   <PenBox className="h-4 w-4" />
//                 </Button>
//               </Link>
//               <Link href="/interview">
//                 <Button variant="ghost" className="w-10 h-10 p-0">
//                   <GraduationCap className="h-4 w-4" />
//                 </Button>
//               </Link>
//             </div>
//           </SignedIn>

//           {/* Auth Buttons */}
//           <SignedOut>
//             <SignInButton>
//               <Button variant="outline">Sign In</Button>
//             </SignInButton>
//           </SignedOut>

//           <SignedIn>
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: "w-10 h-10",
//                   userButtonPopoverCard: "shadow-xl",
//                   userPreviewMainIdentifier: "font-semibold",
//                 },
//               }}
//               afterSignOutUrl="/"
//             />
//           </SignedIn>
//         </div>
//       </nav>
//     </header>
//   );
// }
