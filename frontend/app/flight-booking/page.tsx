import type { Metadata } from "next";
import { FlightBookingPage } from "@/features/booking/components/flight-booking-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Flight Booking",
  description: "Book domestic and international flights with smart fare support and personalized assistance.",
  path: "/flight-booking",
});

export default function FlightBookingRoute() {
  return <FlightBookingPage />;
}
