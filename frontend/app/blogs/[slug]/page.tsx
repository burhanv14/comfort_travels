import type { Metadata } from "next";
import { BlogDetails } from "@/features/blogs/components/blog-details";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description: "Read travel insights, guides, and tips from the Comfort Travels editorial team.",
});

export default async function BlogDetailsRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetails slug={slug} />;
}
