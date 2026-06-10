"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const pills = [
  "Interview Prep",
  "Resume Builder",
  "Career Roadmap",
  "Industry Insights",
  "AI Cover Letters",
];

export default function HeroSection() {
  return (
    <section className="relative w-full pt-36 pb-24 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 -z-10 bg-white [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]" />
      {/* Radial fade */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(142,45,226,0.12),transparent)]" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 mb-8"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Career Platform
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl gradient-title max-w-4xl"
        >
          Transform Your Career with Your Personal AI Guide
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Personalized interview prep, smart resume scoring, industry insights,
          and career roadmaps — everything you need to land your next role.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="px-8 gap-2 text-base">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="px-8 text-base">
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm text-muted-foreground"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
