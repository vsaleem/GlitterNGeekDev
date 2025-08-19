"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import Image from "next/image";

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 flex flex-col items-center justify-center p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <div className="flex justify-center mb-4">
          <Image src="/DogLogo.png" alt="Dog Logo" width={150} height={150} priority />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-purple-900 mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-pink-500" />
          GlitterNGeek
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          A cozy space where tech, coding, and AI meet soft life vibes. Learn,
          code, and grow with me ✨
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 flex gap-4"
      >
        <a
          href="https://www.youtube.com/channel/UCm3QJEpnGDirp-9bPkr02Vw"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-2xl shadow-lg"
          >
            Subscribe on YouTube
          </Button>
        </a>
        {/* <Button
          size="lg"
          variant="outline"
          className="rounded-2xl border-pink-400 text-pink-600 hover:bg-pink-100"
        >
          Explore Tutorials
        </Button> */}
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">
              Tech Tutorials
            </h3>
            <p className="text-gray-600">
              Beginner-friendly coding and AI guides that make learning fun and
              approachable.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">
              Soft Life Energy
            </h3>
            <p className="text-gray-600">
              Gentle, aesthetic vibes to balance the challenges of coding with
              calm learning.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">
              Community
            </h3>
            <p className="text-gray-600">
              Learn in public, grow together, and connect with fellow Geeks on
              the journey.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Digital Products Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 max-w-3xl text-center"
      >
        <h2 className="text-3xl font-bold text-purple-900 mb-4">
          Coming Soon: Digital Products
        </h2>
        <p className="text-gray-700 mb-6">
          Stay tuned for beginner-friendly guides, Notion templates, and
          resources designed to make your coding journey soft and fun.
        </p>
        <Button
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl shadow-md"
        >
          Notify Me
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-gray-600 text-sm text-center">
        © {new Date().getFullYear()} GlitterNGeek, LLC · All Rights
        Reserved
      </footer>
    </div>
  );
}
