import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

type Params = { params: Promise<{ slug: string }> };

function mapPackage(p: Record<string, unknown>): Record<string, unknown> {
  return {
    ...p,
    id: String(p.id),
    category: typeof p.category === "string" ? p.category.toLowerCase() : p.category,
    images: Array.isArray(p.images) ? p.images : [],
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    inclusions: Array.isArray(p.inclusions) ? p.inclusions : [],
    exclusions: Array.isArray(p.exclusions) ? p.exclusions : [],
    itinerary: Array.isArray(p.itinerary) ? p.itinerary : [],
    faqs: Array.isArray(p.faqs) ? p.faqs : [],
  };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/packages/${slug}`, { cache: "no-store" });
    if (res.status === 404) return errorResponse("Package not found", 404);
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    const pkg = await res.json();
    return successResponse(mapPackage(pkg));
  } catch (err) {
    console.error("[package slug GET]", err);
    return errorResponse("Failed to fetch package", 502);
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const body = await request.json();

  const backendBody = {
    ...body,
    category: typeof body.category === "string" ? body.category.toUpperCase() : body.category,
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/packages/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendBody),
    });
    if (res.status === 404) return errorResponse("Package not found", 404);
    if (!res.ok) {
      const text = await res.text();
      return errorResponse(`Backend error: ${text}`, res.status);
    }
    const updated = await res.json();
    return successResponse(mapPackage(updated));
  } catch (err) {
    console.error("[package slug PUT]", err);
    return errorResponse("Failed to update package", 502);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/packages/${slug}`, {
      method: "DELETE",
    });
    if (res.status === 404) return errorResponse("Package not found", 404);
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    return successResponse(null);
  } catch (err) {
    console.error("[package slug DELETE]", err);
    return errorResponse("Failed to delete package", 502);
  }
}
