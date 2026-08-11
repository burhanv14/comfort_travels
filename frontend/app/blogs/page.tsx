import type { Metadata } from "next";
import { BlogsPage } from "@/features/blogs/components/blogs-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Blogs",
  description: "Travel guides, destination stories, and practical planning tips from travel experts.",
  path: "/blogs",
});

export default function BlogsRoute() {
  return <BlogsPage />;
}
