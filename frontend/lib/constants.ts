import type { PackageCategory } from "@/types";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Comfort Travels";
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/+$/, "");
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1").replace(/\/+$/, "");

export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL ??
  "admin52@comforttravels.com";

export const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD ??
  "y$%KSXYc9.z]@Ir";

export const ADMIN_NAME = "Admin User";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Trains", href: "/train-booking" },
  { label: "Flights", href: "/flight-booking" },
  { label: "Buses", href: "/bus-booking" },
  { label: "Visa", href: "/visa-services" },
  { label: "Hotels", href: "/hotels" },
  { label: "Blogs", href: "/blogs" },
] as const;

export const PACKAGE_CATEGORIES: { value: PackageCategory; label: string }[] = [
  { value: "adventure", label: "Adventure" },
  { value: "family", label: "Family" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "pilgrimage", label: "Pilgrimage" },
  { value: "luxury", label: "Luxury" },
  { value: "budget", label: "Budget" },
  { value: "wildlife", label: "Wildlife" },
  { value: "beach", label: "Beach" },
  { value: "hill_station", label: "Hill Station" },
  { value: "cultural", label: "Cultural" },
];

export const SERVICES = [
  {
    title: "Holiday Packages",
    description: "Tailored getaways crafted for every mood - relax, explore, and enjoy.",
    icon: "Palmtree",
    href: "/packages",
  },
  {
    title: "Flight Booking",
    description: "Best fares across domestic and international routes with instant confirmation & free cancellation options.",
    icon: "Plane",
    href: "/flight-booking",
  },
  {
    title: "Train Booking",
    description: "Seamless rail reservations with flexible schedules and class options including TATKAL booking.",
    icon: "Train",
    href: "/train-booking",
  },
  {
    title: "Bus Booking",
    description: "Comfortable bus travel with AC/Non-AC, Sleeper/Seater options across major routes.",
    icon: "Bus",
    href: "/bus-booking",
  },
  {
    title: "Hotel Reservations",
    description: "Handpicked stays from boutique gems to luxury resorts worldwide.",
    icon: "Building2",
    href: "/hotels",
  },
  {
    title: "Visa Services",
    description: "Expert visa processing with high approval rates and end-to-end support.",
    icon: "FileCheck",
    href: "/visa-services",
  },
  {
    title: "Pilgrim Tours",
    description: "Spiritual journeys planned with care, comfort, and devotion.",
    icon: "Landmark",
    href: "/packages?category=pilgrimage",
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Expert Planning",
    description: "Thoughtfully crafted itineraries by experienced travel professionals.",
    icon: "Map",
  },
  {
    title: "24/7 Support",
    description: "Always available to assist you - anytime, anywhere on your journey.",
    icon: "Headphones",
  },
  {
    title: "Personalised Service",
    description: "Tailored experiences designed around your preferences and budget.",
    icon: "Heart",
  },
  {
    title: "Best Value",
    description: "Competitive pricing without compromising on quality or experience.",
    icon: "BadgePercent",
  },
  {
    title: "Human Connection",
    description: "Real people who care - no bots, just genuine travel expertise.",
    icon: "Users",
  },
  {
    title: "Trusted Partner",
    description: "Thousands of happy travellers and a 99% satisfaction rate.",
    icon: "ShieldCheck",
  },
] as const;

export const STATS = [
  { value: "15K+", label: "Happy Travellers" },
  { value: "500+", label: "Tour Packages" },
  { value: "99%", label: "Satisfaction Rate" },
] as const;

export const VISA_TYPES = [
  "Tourist",
  "Business",
  "Work",
  "Student",
  "Transit",
  "Other",
] as const;

export const ITEMS_PER_PAGE = 9;
