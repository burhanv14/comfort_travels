import type { Metadata } from "next";
import { PackagesPage } from "@/features/packages/components/packages-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Packages",
  description: "Browse premium domestic and international travel packages with smart filters and instant enquiry options.",
  path: "/packages",
});

export default function PackagesRoute() {
  return <PackagesPage />;
}
