import type { Metadata } from "next";
import { BusBookingPage } from "@/features/booking/components/bus-booking-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Bus Booking",
  description: "Book bus tickets online with multiple bus types, operators, and comfortable travel options across India.",
  path: "/bus-booking",
});

export default function BusBookingRoute() {
  return <BusBookingPage />;
}