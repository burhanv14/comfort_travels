"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Headphones, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchForm } from "@/features/enquiry/components/search-form";

const trustBadges = [
  { icon: Shield, label: "Best Price Guarantee" },
  { icon: Clock, label: "Free Cancellation" },
  { icon: Headphones, label: "24/7 Support" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
        alt="Travel destination"
        fill
        className="object-cover scale-105"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 hero-gradient" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgb(13 148 136 / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgb(249 115 22 / 0.2) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl container-padding py-24 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="gap-1.5 border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/15"
            >
              <Sparkles className="size-3.5 text-accent" />
              Premium Travel Experiences
            </Badge>

            <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
              Your Journey Begins with{" "}
              <span className="bg-gradient-to-r from-accent-300 to-accent bg-clip-text text-transparent">
                Comfort
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
              Discover curated holiday packages, seamless bookings, and personalised travel planning — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 backdrop-blur-sm"
                >
                  <Icon className="size-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" variant="premium" className="gap-2 rounded-xl shadow-glow-accent">
                <Link href="/packages">
                  Explore Packages <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
              >
                <Link href="/destinations">Browse Destinations</Link>
              </Button>
            </div>
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
