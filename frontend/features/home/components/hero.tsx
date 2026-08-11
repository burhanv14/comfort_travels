"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/features/enquiry/components/search-form";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
        alt="Travel destination"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 mx-auto w-full max-w-7xl container-padding py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Premium Travel Experiences
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Your Journey Begins with{" "}
              <span className="text-accent">Comfort</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-white/80">
              Discover curated holiday packages, seamless bookings, and personalised travel planning — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2"><Shield className="size-4 text-accent" /> Best Price Guarantee</span>
              <span className="flex items-center gap-2"><Clock className="size-4 text-accent" /> Free Cancellation</span>
              <span className="flex items-center gap-2"><Headphones className="size-4 text-accent" /> 24/7 Support</span>
            </div>
            <Button asChild size="lg" className="mt-8 gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/packages">
                Explore Packages <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SearchForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
