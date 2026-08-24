import {
  Map, Headphones, Heart, BadgePercent, Users, ShieldCheck,
  Palmtree, Plane, Train, Building2, FileCheck, Landmark,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { WHY_CHOOSE_US, SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Headphones, Heart, BadgePercent, Users, ShieldCheck,
  Palmtree, Plane, Train, Building2, FileCheck, Landmark,
};

export function WhyChooseUs() {
  return (
    <section className="section-padding mesh-bg">
      <div className="mx-auto max-w-7xl container-padding">
        <SectionHeader
          label="Why Us"
          title="Why Choose Comfort Travels?"
          description="We go beyond booking — we craft experiences that stay with you forever."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Card
                key={item.title}
                className={cn(
                  "group border border-border/60 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
                  i === 0 && "sm:col-span-2 lg:col-span-1"
                )}
              >
                <CardContent className="p-6">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="section-padding bg-muted/40">
      <div className="mx-auto max-w-7xl container-padding">
        <SectionHeader
          label="Our Services"
          title="Everything You Need to Travel"
          description="Your journey, our commitment — expertly planned, seamlessly delivered."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link key={service.href} href={service.href} className="group block">
                <Card className="h-full border border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6 text-accent" />
                    </div>
                    <h3 className="font-semibold transition-colors group-hover:text-accent">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
