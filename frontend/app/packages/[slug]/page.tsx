import type { Metadata } from "next";
import { PackageDetails } from "@/features/packages/components/package-details";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Package Details",
  description: "View itinerary, inclusions, pricing, FAQs, and related tours for this travel package.",
});

export default async function PackageDetailsRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PackageDetails slug={slug} />;
}
