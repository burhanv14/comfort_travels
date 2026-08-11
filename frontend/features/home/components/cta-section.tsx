import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 px-8 py-16 text-center text-primary-foreground md:px-16">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/5" aria-hidden="true" />
          <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-white/5" aria-hidden="true" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold md:text-4xl">Let&apos;s Start Your Journey!</h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80">
              The most affordable prices, the best experiences. Your dream vacation is just one click away.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                <Link href="/packages">View Packages <ArrowRight className="size-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
