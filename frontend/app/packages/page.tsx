import type { Metadata } from "next";
import { Suspense } from "react";
import { PackagesPage } from "@/features/packages/components/packages-page";
import { createMetadata } from "@/lib/seo";
import { GridSkeleton } from "@/components/shared/skeletons";

export const metadata: Metadata = createMetadata({
  title: "Packages",
  description: "Browse premium domestic and international travel packages with smart filters and instant enquiry options.",
  path: "/packages",
});

export default function PackagesRoute() {
  return (
    <Suspense fallback={<GridSkeleton count={6} />}>
      <PackagesPage />
    </Suspense>
  );
}
