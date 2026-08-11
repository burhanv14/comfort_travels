import { NextRequest } from "next/server";
import { testimonials as mockTestimonials } from "@/data/mock/testimonials";
import { successResponse } from "@/lib/api/server-utils";

const testimonials = [...mockTestimonials];

export async function GET(request: NextRequest) {
  const featured = request.nextUrl.searchParams.get("featured") === "true";
  const result = featured ? testimonials.filter((t) => t.featured) : testimonials;
  return successResponse(result);
}

export async function POST(request: NextRequest) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const body = await request.json();
  const newItem = { ...body, id: `test-${Date.now()}`, createdAt: new Date().toISOString() };
  testimonials.push(newItem);
  return successResponse(newItem, 201);
}
