import { NextRequest } from "next/server";
import { destinations as mockDestinations } from "@/data/mock/destinations";
import { paginate } from "@/lib/utils/helpers";
import { successResponse } from "@/lib/api/server-utils";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const destinations = [...mockDestinations];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? ITEMS_PER_PAGE);
  const popular = searchParams.get("popular") === "true";

  const result = popular ? destinations.filter((d) => d.popular) : destinations;
  return successResponse(paginate(result, page, limit));
}

export async function POST(request: NextRequest) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const body = await request.json();
  const newDest = {
    ...body,
    id: `dest-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  destinations.push(newDest);
  return successResponse(newDest, 201);
}
