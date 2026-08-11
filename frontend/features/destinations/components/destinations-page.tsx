"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/section-header";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import { GridSkeleton } from "@/components/shared/skeletons";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { destinationsApi } from "@/lib/api";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DestinationsPage() {
  const [region, setRegion] = useState<"all" | "domestic" | "international">("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["destinations", region, page],
    queryFn: () => destinationsApi.getAll({ page, limit: 9 }),
  });

  const filtered = data?.data.filter(
    (d) => region === "all" || d.region === region
  );

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <Breadcrumbs items={[{ label: "Destinations" }]} />
        <SectionHeader
          title="Explore Destinations"
          description="From tropical beaches to snow-capped mountains — find your next adventure."
          align="left"
          className="mb-8"
        />

        <Tabs value={region} onValueChange={(v) => { setRegion(v as typeof region); setPage(1); }} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="domestic">Domestic</TabsTrigger>
            <TabsTrigger value="international">International</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading && <GridSkeleton type="destination" />}
        {error && <ErrorState onRetry={() => refetch()} />}
        {filtered && filtered.length === 0 && <EmptyState />}
        {filtered && filtered.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
            {data && (
              <div className="mt-10 flex justify-center">
                <PaginationControls currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
