import { NextRequest } from "next/server";
import { testimonials as mockTestimonials } from "@/data/mock/testimonials";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const testimonials = [...mockTestimonials];

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { id } = await params;
  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) return errorResponse("Testimonial not found", 404);

  const body = await request.json();
  testimonials[index] = { ...testimonials[index], ...body };
  return successResponse(testimonials[index]);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { id } = await params;
  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) return errorResponse("Testimonial not found", 404);

  testimonials.splice(index, 1);
  return successResponse(null);
}
