import type { Metadata } from "next";
import { Handshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeader } from "@/components/shared/section-header";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "Learn about Comfort Travels, our mission, and why thousands trust us for memorable journeys.",
  path: "/about",
});

const values = [
  {
    title: "Human-first service",
    description: "Dedicated experts guide you at every step, from planning to return.",
    icon: Users,
  },
  {
    title: "Transparent pricing",
    description: "Clear package details and no hidden surprises.",
    icon: ShieldCheck,
  },
  {
    title: "Premium experiences",
    description: "Curated stays, trusted partners, and thoughtful itineraries.",
    icon: Sparkles,
  },
  {
    title: "Long-term trust",
    description: "We build relationships, not just bookings.",
    icon: Handshake,
  },
] as const;

export default function AboutRoute() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <Breadcrumbs items={[{ label: "About" }]} />
        <SectionHeader
          align="left"
          title="A Travel Partner You Can Trust"
          description="Comfort Travels was built to make premium travel simple, personal, and memorable."
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <CardContent className="space-y-4 p-6 text-muted-foreground">
              <p>
                We are a full-service travel agency focused on curated holiday packages, destination planning,
                visa support, flights, trains, and hotels. Our team combines practical travel knowledge with
                concierge-level service to deliver stress-free experiences.
              </p>
              <p>
                From family vacations and honeymoons to adventure trips and spiritual journeys, every itinerary
                is designed around your goals, timeline, and budget.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title}>
                  <CardContent className="p-5">
                    <div className="mb-2 inline-flex rounded-md bg-primary/10 p-2">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <h2 className="font-semibold">{value.title}</h2>
                    <p className="mt-1 text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
