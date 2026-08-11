import { NextRequest } from "next/server";
import { destinations as mockDestinations } from "@/data/mock/destinations";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const destinations = [...mockDestinations];

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return errorResponse("Destination not found", 404);
  return successResponse(dest);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const index = destinations.findIndex((d) => d.slug === slug);
  if (index === -1) return errorResponse("Destination not found", 404);

  const body = await request.json();
  destinations[index] = { ...destinations[index], ...body, updatedAt: new Date().toISOString() };
  return successResponse(destinations[index]);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const index = destinations.findIndex((d) => d.slug === slug);
  if (index === -1) return errorResponse("Destination not found", 404);

  destinations.splice(index, 1);
  return successResponse(null);
}
