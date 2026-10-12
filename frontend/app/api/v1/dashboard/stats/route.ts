import { successResponse } from "@/lib/api/server-utils";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export async function GET() {
  try {
    const [packagesRes, blogsRes] = await Promise.allSettled([
      fetch(`${BACKEND_URL}/api/packages`, { cache: "no-store" }),
      fetch(`${BACKEND_URL}/api/blogs`, { cache: "no-store" }),
    ]);

    let totalPackages = 0;
    let totalBlogs = 0;

    if (packagesRes.status === "fulfilled" && packagesRes.value.ok) {
      const packages = await packagesRes.value.json();
      totalPackages = Array.isArray(packages) ? packages.length : 0;
    }

    if (blogsRes.status === "fulfilled" && blogsRes.value.ok) {
      const blogs = await blogsRes.value.json();
      totalBlogs = Array.isArray(blogs) ? blogs.length : 0;
    }

    return successResponse({
      totalPackages,
      totalEnquiries: 0,
      pendingEnquiries: 0,
      totalBlogs,
      totalTestimonials: 0,
    });
  } catch {
    return successResponse({
      totalPackages: 0,
      totalEnquiries: 0,
      pendingEnquiries: 0,
      totalBlogs: 0,
      totalTestimonials: 0,
    });
  }
}
