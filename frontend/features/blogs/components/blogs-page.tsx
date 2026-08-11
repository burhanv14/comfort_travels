"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PaginationControls } from "@/components/shared/pagination-controls";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { GridSkeleton } from "@/components/shared/skeletons";
import { SectionHeader } from "@/components/shared/section-header";
import { blogsApi } from "@/lib/api";
import { formatDate } from "@/lib/utils/helpers";
import { useDebounce } from "@/hooks/use-debounce";

export function BlogsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["blogs", page],
    queryFn: () => blogsApi.getAll({ page, limit: 9 }),
  });

  const filtered = data?.data.filter((blog) => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      blog.title.toLowerCase().includes(q) ||
      blog.excerpt.toLowerCase().includes(q) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <Breadcrumbs items={[{ label: "Blogs" }]} />
        <SectionHeader
          align="left"
          title="Travel Stories & Guides"
          description="Expert tips, destination guides, and inspiration for your next journey."
          className="mb-8"
        />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Search blog posts..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="max-w-md"
          />
          <Button asChild variant="outline">
            <Link href="/contact">Need travel help?</Link>
          </Button>
        </div>

        {isLoading && <GridSkeleton count={6} />}
        {error && <ErrorState onRetry={() => refetch()} />}
        {filtered && filtered.length === 0 && (
          <EmptyState title="No blog posts found" description="Try another keyword or browse all posts." />
        )}

        {filtered && filtered.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((blog) => (
                <Card key={blog.id} className="card-hover py-0">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                  </div>
                  <CardContent className="space-y-3 p-5">
                    <Badge variant="secondary">{blog.category}</Badge>
                    <h2 className="line-clamp-2 text-base font-semibold">
                      <Link href={`/blogs/${blog.slug}`} className="hover:text-primary">
                        {blog.title}
                      </Link>
                    </h2>
                    <p className="line-clamp-3 text-muted-foreground">{blog.excerpt}</p>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="size-3.5" />
                        {formatDate(blog.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="size-3.5" />
                        {blog.readTime} min read
                      </span>
                    </div>
                  </CardContent>
                </Card>
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
