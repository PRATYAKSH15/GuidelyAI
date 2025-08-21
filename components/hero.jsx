"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Aurora Gradient Effect */}
      <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <motion.div
        className="container mx-auto px-6 md:px-16 lg:px-24 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title"
          variants={itemVariants}
        >
          Transform Your Career with
          <br />
          Your Personal AI Guide
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-[600px] text-muted-foreground md:text-xl"
          variants={itemVariants}
        >
          Advance your career with personalized guidance, interview prep, and
          AI-powered tools for job success.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex justify-center gap-4"
          variants={itemVariants}
        >
          <Link href="/dashboard" passHref>
            <Button size="lg" className="px-8 text-base">
              Get Started
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 text-base">
            Explore More Below
          </Button>
        </motion.div>

        {/* Image + About Section */}
        <motion.div
          className="relative mt-16 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {/* Left Side - Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="shadow-2xl rounded-xl border-2 border-purple-200/20 max-w-[600px] flex-shrink-0"
          >
            <Image
              src="/banner.jpeg"
              width={600}
              height={400}
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500"
              priority
            />
          </motion.div>

          {/* Right Side - About Content */}
          <div className="max-w-xl text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Guidely AI?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Guidely AI is your personal career assistant, designed to help you
              crack interviews, upgrade your skills, and land your dream job.
              With AI-powered recommendations, personalized learning paths, and
              real-time performance tracking, we guide you at every step of your
              journey.
            </p>
            <ul className="mt-5 space-y-2 text-gray-700">
              <li>🚀 AI-powered interview preparation</li>
              <li>📈 Personalized career growth plans</li>
              <li>🎯 Real-time progress tracking</li>
            </ul>
            <Link href="/about" passHref>
              <Button size="lg" className="mt-6 px-8 text-base">
                Learn More
              </Button>
            </Link>
          </div>
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
