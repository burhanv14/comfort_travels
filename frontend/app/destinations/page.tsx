import type { Metadata } from "next";
import { DestinationsPage } from "@/features/destinations/components/destinations-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Destinations",
  description: "Explore curated destinations across India and the world with handcrafted travel experiences.",
  path: "/destinations",
});

export default function DestinationsRoute() {
  return <DestinationsPage />;
}
