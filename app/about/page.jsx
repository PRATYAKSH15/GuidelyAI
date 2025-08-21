"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center"
        >
          <Image
            src="/about.png"
            alt="GuidelyAI"
            width={500}
            height={500}
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Right Side - About Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-snug">
            Transform Your Career <br />
            with <span className="text-blue-600">GuidelyAI</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-5">
            At <span className="font-semibold text-blue-700">GuidelyAI</span>, we
            are redefining how professionals prepare for their careers. From
            personalized interview prep to AI-powered career guidance, our
            mission is to help you unlock your full potential and land your
            dream job.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Whether you're a fresher, a working professional, or someone looking
            to switch careers, GuidelyAI equips you with the tools, insights,
            and confidence you need to succeed.
          </p>

          <div className="flex space-x-4">
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-xl transition-all duration-300 shadow-sm"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
