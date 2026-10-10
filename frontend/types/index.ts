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
  | "budget";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  destination: string;
  destinationId: string;
  category: PackageCategory;
  duration: string;
  nights: number;
  days: number;
  images: string[];
  coverImage: string;
  featured: boolean;
  popular: boolean;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  faqs: FAQ[];
  highlights: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  shortDescription: string;
  coverImage: string;
  images: string[];
  packageCount: number;
  popular: boolean;
  region: "domestic" | "international";
  bestTime: string;
  highlights: string[];
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
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  packageId?: string;
  travellers: number;
  travelDate?: string;
  budget?: string;
  message: string;
  type: "general" | "package" | "visa" | "flight" | "train" | "hotel";
  status: "pending" | "contacted" | "converted" | "closed";
  createdAt: string;
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
  totalDestinations: number;
  totalEnquiries: number;
  pendingEnquiries: number;
  totalBlogs: number;
  totalTestimonials: number;
}

export interface PackageFilters {
  search?: string;
  category?: PackageCategory;
  destination?: string;
  page?: number;
  limit?: number;
  sort?: "popular";
}

export interface SearchEnquiryForm {
  destination: string;
  startDate: string;
  endDate: string;
  travellers: number;
  budget: string;
  tripType: "relaxation" | "adventure" | "sightseeing" | "mixed";
}
