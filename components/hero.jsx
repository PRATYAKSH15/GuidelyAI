"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animate children one by one
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative w-full pt-36 md:pt-48 pb-20 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      {/* Aurora Effect */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <motion.div
        className="container mx-auto px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title"
          variants={itemVariants}
        >
          Your AI Career Coach for
          <br />
          Professional Success
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-[600px] text-muted-foreground md:text-xl"
          variants={itemVariants}
        >
          Advance your career with personalized guidance, interview prep, and
          AI-powered tools for job success.
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-4"
          variants={itemVariants}
        >
          <Link href="/dashboard" passHref>
            <Button size="lg" className="px-8 text-base">
              Get Started
            </Button>
          </Link>
          <Link href="https://www.youtube.com/roadsidecoder" passHref>
            <Button size="lg" variant="outline" className="px-8 text-base">
              Watch Demo
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="relative mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {/* Add a subtle parallax effect if you like, by wrapping with another motion.div and using useScroll */}
          <Image
            src="/banner.jpeg"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="mx-auto rounded-xl border shadow-2xl shadow-purple-500/10"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

// "use client";

// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const HeroSection = () => {
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const imageElement = imageRef.current;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100;

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled");
//       } else {
//         imageElement.classList.remove("scrolled");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="w-full pt-36 md:pt-48 pb-10">
//       <div className="space-y-6 text-center">
//         <div className="space-y-6 mx-auto">
//           <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
//             Your AI Career Coach for
//             <br />
//             Professional Success
//           </h1>
//           <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
//             Advance your career with personalized guidance, interview prep, and
//             AI-powered tools for job success.
//           </p>
//         </div>
//         <div className="flex justify-center space-x-4">
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8">
//               Get Started
//             </Button>
//           </Link>
//           <Link href="https://www.youtube.com/roadsidecoder">
//             <Button size="lg" variant="outline" className="px-8">
//               Watch Demo
//             </Button>
//           </Link>
//         </div>
//         <div className="hero-image-wrapper mt-5 md:mt-0">
//           <div ref={imageRef} className="hero-image">
//             <Image
//               src="/banner.jpeg"
//               width={1280}
//               height={720}
//               alt="Dashboard Preview"
//               className="rounded-lg shadow-2xl border mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

// "use client";

// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const HeroSection = () => {
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const imageElement = imageRef.current;

//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const scrollThreshold = 100;

//       if (scrollPosition > scrollThreshold) {
//         imageElement.classList.add("scrolled");
//       } else {
//         imageElement.classList.remove("scrolled");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="relative w-full pt-36 md:pt-48 pb-10 overflow-hidden">
//       {/* Animated Gradient Background */}
//       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 animate-gradientMove"></div>

//       {/* Optional Bokeh Effect */}
//       <div className="absolute inset-0 -z-10 pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-20 h-20 bg-white/5 rounded-full blur-3xl animate-float"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${4 + Math.random() * 6}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="space-y-6 text-center">
//         <div className="space-y-6 mx-auto">
//           <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
//             Your AI Career Coach for
//             <br />
//             Professional Success
//           </h1>
//           <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
//             Advance your career with personalized guidance, interview prep, and
//             AI-powered tools for job success.
//           </p>
//         </div>
//         <div className="flex justify-center space-x-4">
//           <Link href="/dashboard">
//             <Button size="lg" className="px-8">
//               Get Started
//             </Button>
//           </Link>
//           <Link href="https://www.youtube.com/roadsidecoder">
//             <Button size="lg" variant="outline" className="px-8">
//               Watch Demo
//             </Button>
//           </Link>
//         </div>
//         <div className="hero-image-wrapper mt-5 md:mt-0">
//           <div ref={imageRef} className="hero-image">
//             <Image
//               src="/banner.jpeg"
//               width={1280}
//               height={720}
//               alt="Dashboard Preview"
//               className="rounded-lg shadow-2xl border mx-auto"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
