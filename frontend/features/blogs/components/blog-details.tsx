"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageLoader } from "@/components/shared/loader";
import { ErrorState } from "@/components/shared/error-state";
import { blogsApi } from "@/lib/api";
import { formatDate } from "@/lib/utils/helpers";

interface BlogDetailsProps {
  slug: string;
}

export function BlogDetails({ slug }: BlogDetailsProps) {
  const { data: blog, isLoading, error, refetch } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => blogsApi.getBySlug(slug),
  });

  if (isLoading) return <PageLoader />;
  if (error || !blog) return <ErrorState title="Blog not found" onRetry={() => refetch()} />;

  return (
    <article className="section-padding">
      <div className="mx-auto max-w-4xl container-padding">
        <Breadcrumbs items={[{ label: "Blogs", href: "/blogs" }, { label: blog.title }]} />

        <header className="mt-6 space-y-4">
          <Badge variant="secondary">{blog.category}</Badge>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="inline-flex items-center gap-1"><UserRound className="size-3.5" /> {blog.author}</span>
            <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> {formatDate(blog.publishedAt)}</span>
            <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" /> {blog.readTime} min read</span>
          </div>
        </header>

        <div className="relative mt-6 aspect-16/8 overflow-hidden rounded-xl">
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" sizes="100vw" priority />
        </div>

        <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
          {blog.content.split("\n").map((line, index) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("## ")) {
              return <h2 key={index}>{trimmed.replace("## ", "")}</h2>;
            }

            if (trimmed.startsWith("- ")) {
              return <li key={index}>{trimmed.replace("- ", "")}</li>;
            }

            return <p key={index}>{trimmed}</p>;
          })}
        </div>

        <footer className="mt-8 flex flex-wrap items-center gap-2">
          {blog.tags.map((tag) => (
            <Badge key={tag} variant="outline">#{tag}</Badge>
          ))}
        </footer>

        <div className="mt-10">
          <Link href="/blogs" className="text-sm font-medium text-primary hover:underline">
            Back to all blogs
          </Link>
        </div>
      </div>
    </article>
  );
}
