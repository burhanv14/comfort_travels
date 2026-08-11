"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import { GridSkeleton } from "@/components/shared/skeletons";
import { ErrorState } from "@/components/shared/error-state";
import { destinationsApi } from "@/lib/api";

export function PopularDestinations() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["destinations", "popular"],
    queryFn: () => destinationsApi.getAll({ popular: true, limit: 6 }),
  });

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <SectionHeader
          label="Explore"
          title="Popular Destinations"
          description="Handpicked destinations loved by thousands of travellers worldwide."
        />
        {isLoading && <GridSkeleton count={6} type="destination" />}
        {error && <ErrorState onRetry={() => refetch()} />}
        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.data.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </motion.div>
        )}
        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/destinations">View All Destinations <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
