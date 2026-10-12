import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api/server-utils";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

/** Normalize backend package DTO to frontend Package type */
function mapPackage(p: Record<string, unknown>): Record<string, unknown> {
  return {
    ...p,
    // Backend returns id as Long, convert to string
    id: String(p.id),
    // Backend category enum is UPPERCASE, frontend expects lowercase
    category: typeof p.category === "string" ? p.category.toLowerCase() : p.category,
    // Ensure arrays are never null
    images: Array.isArray(p.images) ? p.images : [],
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    inclusions: Array.isArray(p.inclusions) ? p.inclusions : [],
    exclusions: Array.isArray(p.exclusions) ? p.exclusions : [],
    itinerary: Array.isArray(p.itinerary) ? p.itinerary : [],
    faqs: Array.isArray(p.faqs) ? p.faqs : [],
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? ITEMS_PER_PAGE);

  try {
    const res = await fetch(`${BACKEND_URL}/api/packages`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);

    let allPackages: Record<string, unknown>[] = (await res.json()).map(mapPackage);

    // Apply category filter
    const category = searchParams.get("category");
    if (category) {
      allPackages = allPackages.filter(
        (p) => (p.category as string)?.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply showOnHomepage filter
    if (searchParams.get("showOnHomepage") === "true" || searchParams.get("featured") === "true") {
      allPackages = allPackages.filter((p) => p.showOnHomepage === true && p.active !== false);
    }

    // Apply active filter
    if (searchParams.get("active") === "true") {
      allPackages = allPackages.filter((p) => p.active !== false);
    }

    // Apply search filter
    const search = searchParams.get("search");
    if (search) {
      const q = search.toLowerCase();
      allPackages = allPackages.filter(
        (p) =>
          (p.title as string)?.toLowerCase().includes(q) ||
          (p.description as string)?.toLowerCase().includes(q)
      );
    }

    // Paginate
    const total = allPackages.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const data = allPackages.slice(start, start + limit);

    return successResponse({ data, total, page, limit, totalPages });
  } catch (err) {
    console.error("[packages GET]", err);
    return errorResponse("Failed to fetch packages", 502);
  }
}

export async function POST(request: NextRequest) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const body = await request.json();

  // Convert category to uppercase for the backend enum
  const backendBody = {
    ...body,
    category: typeof body.category === "string" ? body.category.toUpperCase() : body.category,
  };

  try {
    const res = await fetch(`${BACKEND_URL}/api/packages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendBody),
    });
    if (!res.ok) {
      const text = await res.text();
      return errorResponse(`Backend error: ${text}`, res.status);
    }
    const created = await res.json();
    return successResponse(mapPackage(created), 201);
  } catch (err) {
    console.error("[packages POST]", err);
    return errorResponse("Failed to create package", 502);
  }
}
