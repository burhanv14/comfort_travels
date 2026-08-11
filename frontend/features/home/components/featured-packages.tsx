"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { PackageCard } from "@/features/packages/components/package-card";
import { GridSkeleton } from "@/components/shared/skeletons";
import { ErrorState } from "@/components/shared/error-state";
import { packagesApi } from "@/lib/api";

export function FeaturedPackages() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["packages", "featured"],
    queryFn: () => packagesApi.getFeatured(),
  });

  return (
    <section className="section-padding bg-muted/30">
      <div className="mx-auto max-w-7xl container-padding">
        <SectionHeader
          label="Curated For You"
          title="Featured Packages"
          description="Our most popular tour packages, crafted for unforgettable experiences."
        />
        {isLoading && <GridSkeleton count={6} />}
        {error && <ErrorState onRetry={() => refetch()} />}
        {data && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Button asChild className="gap-2">
            <Link href="/packages">View All Packages <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
