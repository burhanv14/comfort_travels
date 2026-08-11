import type { Metadata } from "next";
import { DestinationDetails } from "@/features/destinations/components/destination-details";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Destination Details",
  description: "Read destination highlights, best time to visit, and related travel packages.",
});

export default async function DestinationDetailsRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DestinationDetails slug={slug} />;
}
