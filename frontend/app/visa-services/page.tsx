import type { Metadata } from "next";
import { VisaServicesPage } from "@/features/booking/components/visa-services-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Visa Services",
  description: "Apply for tourist, business, student, and work visas with expert document support.",
  path: "/visa-services",
});

export default function VisaServicesRoute() {
  return <VisaServicesPage />;
}
