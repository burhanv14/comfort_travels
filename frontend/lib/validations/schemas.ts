import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  travellers: z.coerce.number().min(1, "At least 1 traveller required").max(50),
  travelDate: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["general", "package", "visa", "flight", "train", "hotel"]).default("general"),
  packageId: z.string().optional(),
  packageName: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
  tripType: z.enum(["round-trip", "one-way"]),
  from: z.string().min(2, "Departure city required"),
  to: z.string().min(2, "Destination required"),
  departDate: z.string().min(1, "Departure date required"),
  returnDate: z.string().optional(),
  class: z.enum(["economy", "premium-economy", "business"]),
  freeCancellation: z.boolean().optional(),
  passengers: z.array(z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone required"),
    age: z.coerce.number().min(1).max(120),
    sex: z.enum(["M","F","O"]),
  })).min(1).max(6),
});

export const trainBookingSchema = z.object({
  from: z.string().min(2, "Departure station required"),
  to: z.string().min(2, "Destination station required"),
  travelDate: z.string().min(1, "Travel date required"),
  class: z.enum([
    "1A", "2A", "3A", "3E", "EC", "CC", "EA", "FC", "SL", "2S", "GS"
  ]),
  quota: z.enum([
    "GN","TQ","PT","LD","LB","DV","FT","PQ","RL","RS","DF","DP","RSQ","EQ","PH","HOR"
  ]),
  preferredTrain: z.string().optional(),
  passengers: z.array(z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone required"),
    age: z.coerce.number().min(1).max(120),
    sex: z.enum(["M","F","O"]),
    berthPreference: z.string().optional(),
  })).min(1).max(6),
});

export const hotelBookingSchema = z.object({
  city: z.string().min(2, "City required"),
  checkIn: z.string().min(1, "Check-in date required"),
  checkOut: z.string().min(1, "Check-out date required"),
  rooms: z.coerce.number().min(1).max(10),
  passengers: z.array(z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone required"),
    age: z.coerce.number().min(1).max(120),
    sex: z.enum(["M","F","O"]),
  })).min(1).max(10),
});

export const busBookingSchema = z.object({
  from: z.string().min(2, "Departure city required"),
  to: z.string().min(2, "Destination city required"),
  travelDate: z.string().min(1, "Travel date required"),
  busType: z.enum([
    "AC_SEATER", "AC_SLEEPER", "NON_AC_SEATER", "NON_AC_SLEEPER", "VOLVO", "MERCEDES", "SCANIA", "ORDINARY"
  ]),
  preferredBus: z.string().optional(),
  passengers: z.array(z.object({
    name: z.string().min(2, "Name required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone required"),
    age: z.coerce.number().min(1).max(120),
    sex: z.enum(["M","F","O"]),
    berthPreference: z.string().optional(),
  })).min(1).max(6),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type BusBookingFormData = z.infer<typeof busBookingSchema>;
