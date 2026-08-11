import { packages } from "@/data/mock/packages";
import { destinations } from "@/data/mock/destinations";
import { testimonials } from "@/data/mock/testimonials";
import { blogs } from "@/data/mock/blogs";
import { enquiries } from "@/data/mock/enquiries";
import { successResponse } from "@/lib/api/server-utils";

export async function GET() {
  return successResponse({
    totalPackages: packages.length,
    totalDestinations: destinations.length,
    totalEnquiries: enquiries.length,
    pendingEnquiries: enquiries.filter((e) => e.status === "pending").length,
    totalBlogs: blogs.length,
    totalTestimonials: testimonials.length,
  });
}
