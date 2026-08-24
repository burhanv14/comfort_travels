import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-brand-600 to-brand-800 px-8 py-16 text-center text-primary-foreground shadow-2xl md:px-16 md:py-20">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-white/5" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-white/5" aria-hidden="true" />
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />

          <div className="relative z-10">
            <Badge className="mb-6 gap-1.5 border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15">
              <Sparkles className="size-3.5" />
              Start Planning Today
            </Badge>
            <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">
              Let&apos;s Start Your Journey!
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-primary-foreground/80 md:text-lg">
              The most affordable prices, the best experiences. Your dream vacation is just one click away.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="premium"
                className="gap-2 rounded-xl shadow-glow-accent"
              >
                <Link href="/packages">
                  View Packages <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
