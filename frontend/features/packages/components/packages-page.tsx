"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { PackageCard } from "@/features/packages/components/package-card";
import { GridSkeleton } from "@/components/shared/skeletons";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { packagesApi } from "@/lib/api";
import { PACKAGE_CATEGORIES } from "@/lib/constants";
import { useDebounce } from "@/hooks/use-debounce";
import type { PackageCategory } from "@/types";

export function PackagesPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PackageCategory | "all">(
    (searchParams.get("category") as PackageCategory) ?? "all"
  );
  const [sort, setSort] = useState<string>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["packages", debouncedSearch, category, sort, page],
    queryFn: () =>
      packagesApi.getAll({
        search: debouncedSearch || undefined,
        category: category !== "all" ? category : undefined,
        sort: sort as "price-asc" | "price-desc" | "rating" | "popular",
        page,
      }),
  });

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <Breadcrumbs items={[{ label: "Packages" }]} />
        <SectionHeader
          title="Tour Packages"
          description="Browse our curated collection of holiday packages for every type of traveller."
          align="left"
          className="mb-8"
        />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9"
              aria-label="Search packages"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={category} onValueChange={(v) => { setCategory(v as PackageCategory | "all"); setPage(1); }}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {PACKAGE_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => { setSort((v as string) ?? "popular"); setPage(1); }}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Sort" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex rounded-md border">
              <Button variant={view === "grid" ? "default" : "ghost"} size="icon-sm" onClick={() => setView("grid")} aria-label="Grid view">
                <LayoutGrid className="size-4" />
              </Button>
              <Button variant={view === "list" ? "default" : "ghost"} size="icon-sm" onClick={() => setView("list")} aria-label="List view">
                <List className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {category !== "all" && (
          <Badge variant="secondary" className="mb-4 capitalize">
            {category} packages
          </Badge>
        )}

        {isLoading && <GridSkeleton />}
        {error && <ErrorState onRetry={() => refetch()} />}
        {data && data.data.length === 0 && (
          <EmptyState title="No packages found" actionLabel="View all packages" actionHref="/packages" />
        )}
        {data && data.data.length > 0 && (
          <>
            <div className={view === "grid" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
              {data.data.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} variant={view} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <PaginationControls currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
