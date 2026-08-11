import type { Metadata } from "next";
import { TrainBookingPage } from "@/features/booking/components/train-booking-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Train Booking",
  description: "Reserve train tickets with class selection, flexible travel options, and expert support.",
  path: "/train-booking",
});

export default function TrainBookingRoute() {
  return <TrainBookingPage />;
}
