export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type PackageCategory =
  | "adventure"
  | "family"
  | "honeymoon"
  | "pilgrimage"
  | "luxury"
  | "budget"
  | "wildlife"
  | "beach"
  | "hill_station"
  | "cultural";

export type PackageDifficulty = "easy" | "moderate" | "challenging" | "extreme";

export type PackagePhysicalRating = "low" | "moderate" | "high" | "very_high";

export interface ItineraryDay {
  id?: string;
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals?: string;
  transport?: string;
}

export interface PackageFAQ {
  id?: string;
  question: string;
  answer: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: PackageCategory;
  duration: string;
  nights: number;
  days: number;

  // Price fields
  basePrice?: number;
  discountPrice?: number;
  currency: string;

  // Images
  images: string[];
  coverImage: string;

  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;

  // Status & visibility
  featured: boolean;
  popular: boolean;
  active: boolean;
  showOnHomepage: boolean;

  // Location details
  destination?: string;
  startLocation?: string;
  endLocation?: string;

  // Difficulty & physical rating
  difficulty: PackageDifficulty;
  physicalRating: PackagePhysicalRating;

  // Group size
  minGroupSize: number;
  maxGroupSize: number;

  // Age restrictions
  minAge?: number;
  maxAge?: number;

  // Accommodation & meals
  accommodation?: string;
  meals?: string;
  transport?: string;

  // Cancellation & booking policies
  cancellationPolicy?: string;
  bookingPolicy?: string;
  freeCancellation?: boolean;
  cancellationDaysBefore?: number;

  // Itinerary
  itinerary: ItineraryDay[];

  // Inclusions & Exclusions
  inclusions: string[];
  exclusions: string[];

  // FAQs
  faqs: PackageFAQ[];

  // Highlights
  highlights: string[];

  // Reviews & ratings (summary)
  averageRating?: number;
  reviewCount?: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  content: string;
  tripType: string;
  featured: boolean;
  createdAt: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

export interface Passenger {
  name: string;
  email: string;
  phone: string;
  age: number;
  sex: "M" | "F" | "O";
  berthPreference?: string;
}

export interface Enquiry {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  packageId?: string;
  packageName?: string;
  travellers?: number;
  travelDate?: string;
  budget?: string;
  message?: string;
  subject?: string;
  type: "general" | "contact" | "package" | "visa" | "flight" | "train" | "hotel";
  status: "pending" | "contacted" | "converted" | "closed";
  createdAt: string;

  // Flight & Train common
  from?: string;
  to?: string;

  // Flight
  tripType?: "round-trip" | "one-way";
  departDate?: string;
  returnDate?: string;
  class?: string;
  freeCancellation?: boolean;

  // Train
  trainClass?: string;
  quota?: string;
  preferredTrain?: string;

  // Hotel
  city?: string;
  checkIn?: string;
  checkOut?: string;
  rooms?: number;

  // Visa
  countryOfResidence?: string;
  nationality?: string;
  destinationCountry?: string;
  visaType?: string;

  // Passengers
  passengers?: Passenger[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DashboardStats {
  totalPackages: number;
  totalEnquiries: number;
  pendingEnquiries: number;
  totalBlogs: number;
  totalTestimonials: number;
}

export interface PackageFilters {
  search?: string;
  category?: PackageCategory;
  page?: number;
  limit?: number;
  sort?: "popular" | "price-asc" | "price-desc";
  minPrice?: number;
  maxPrice?: number;
}

export interface SearchEnquiryForm {
  startDate: string;
  endDate: string;
  travellers: number;
  budget: string;
  tripType: "relaxation" | "adventure" | "sightseeing" | "mixed";
}