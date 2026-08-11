import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  destination: z.string().optional(),
  travellers: z.coerce.number().min(1, "At least 1 traveller required").max(50),
  travelDate: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["general", "package", "visa", "flight", "train", "hotel"]).default("general"),
  packageId: z.string().optional(),
});

export const searchEnquirySchema = z.object({
  destination: z.string().min(2, "Please enter a destination"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  travellers: z.coerce.number().min(1).max(50),
  budget: z.string().optional(),
  tripType: z.enum(["relaxation", "adventure", "sightseeing", "mixed"]).default("mixed"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const visaEnquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  countryOfResidence: z.string().min(1, "Country of residence required"),
  nationality: z.string().min(1, "Nationality required"),
  destinationCountry: z.string().min(1, "Destination country required"),
  visaType: z.string().min(1, "Visa type required"),
  message: z.string().optional(),
});

export const flightBookingSchema = z.object({
  tripType: z.enum(["round-trip", "one-way", "multi-city"]),
  from: z.string().min(2, "Departure city required"),
  to: z.string().min(2, "Destination required"),
  departDate: z.string().min(1, "Departure date required"),
  returnDate: z.string().optional(),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().min(0),
  infants: z.coerce.number().min(0),
  class: z.enum(["economy", "premium-economy", "business"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

export const trainBookingSchema = z.object({
  from: z.string().min(2, "Departure station required"),
  to: z.string().min(2, "Destination station required"),
  travelDate: z.string().min(1, "Travel date required"),
  class: z.enum(["sleeper", "ac-3", "ac-2", "ac-1", "executive"]),
  passengers: z.coerce.number().min(1).max(6),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

export const hotelBookingSchema = z.object({
  city: z.string().min(2, "City required"),
  checkIn: z.string().min(1, "Check-in date required"),
  checkOut: z.string().min(1, "Check-out date required"),
  rooms: z.coerce.number().min(1).max(10),
  adults: z.coerce.number().min(1),
  children: z.coerce.number().min(0),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SearchEnquiryFormData = z.infer<typeof searchEnquirySchema>;
