import {
  Map, Headphones, Heart, BadgePercent, Users, ShieldCheck,
  Palmtree, Plane, Train, Building2, FileCheck, Landmark,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { WHY_CHOOSE_US, SERVICES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Map, Headphones, Heart, BadgePercent, Users, ShieldCheck,
  Palmtree, Plane, Train, Building2, FileCheck, Landmark,
};

export function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <SectionHeader
          label="Why Us"
          title="Why Choose Comfort Travels?"
          description="We go beyond booking — we craft experiences that stay with you forever."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Card key={item.title} className="border-0 shadow-md card-hover">
                <CardContent className="p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl container-padding">
        <SectionHeader
          label="Our Services"
          title="Everything You Need to Travel"
          description="Your journey, our commitment — expertly planned, seamlessly delivered."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Link key={service.href} href={service.href}>
                <Card className="h-full border-0 shadow-md card-hover">
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/20">
                      <Icon className="size-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold">{service.title}</h3>
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
