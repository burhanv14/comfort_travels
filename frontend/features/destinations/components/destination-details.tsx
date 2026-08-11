"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Calendar, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PackageCard } from "@/features/packages/components/package-card";
import { PageLoader } from "@/components/shared/loader";
import { ErrorState } from "@/components/shared/error-state";
import { destinationsApi, packagesApi } from "@/lib/api";

interface DestinationDetailsProps {
  slug: string;
}

export function DestinationDetails({ slug }: DestinationDetailsProps) {
  const { data: dest, isLoading, error, refetch } = useQuery({
    queryKey: ["destination", slug],
    queryFn: () => destinationsApi.getBySlug(slug),
  });

  const { data: packages } = useQuery({
    queryKey: ["packages", "destination", dest?.id],
    queryFn: () => packagesApi.getAll({ destination: dest!.id }),
    enabled: !!dest,
  });

  if (isLoading) return <PageLoader />;
  if (error || !dest) return <ErrorState title="Destination not found" onRetry={() => refetch()} />;

  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px]">
        <Image src={dest.coverImage} alt={dest.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="mx-auto max-w-7xl container-padding">
            <Badge className="mb-3 bg-white/20 text-white backdrop-blur-sm capitalize">{dest.region}</Badge>
            <h1 className="text-4xl font-bold">{dest.name}</h1>
            <p className="mt-2 flex items-center gap-2 text-white/80">
              <MapPin className="size-4" /> {dest.country}
            </p>
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="mx-auto max-w-7xl container-padding">
          <Breadcrumbs items={[
            { label: "Destinations", href: "/destinations" },
            { label: dest.name },
          ]} />

          <div className="mt-8 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">{dest.description}</p>
              <div>
                <h2 className="text-xl font-semibold mb-4">Highlights</h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {dest.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-primary shrink-0" />{h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-xl border p-6 space-y-4 h-fit">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="size-4 text-primary" />
                <span>Best time: <strong>{dest.bestTime}</strong></span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Available packages: </span>
                <strong>{dest.packageCount}</strong>
              </div>
            </div>
          </div>

          {packages && packages.data.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Packages in {dest.name}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.data.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
