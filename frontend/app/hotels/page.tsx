import type { Metadata } from "next";
import { HotelsPage } from "@/features/booking/components/hotels-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Hotels",
  description: "Discover premium and budget hotel reservations with great rates and reliable support.",
  path: "/hotels",
});

export default function HotelsRoute() {
  return <HotelsPage />;
}
