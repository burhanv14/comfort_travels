import { NextRequest } from "next/server";
import { packages as mockPackages } from "@/data/mock/packages";
import { filterPackages, paginate } from "@/lib/utils/helpers";
import { successResponse } from "@/lib/api/server-utils";
import type { PackageFilters } from "@/types";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const packages = [...mockPackages];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filters: PackageFilters = {
    search: searchParams.get("search") ?? undefined,
    category: (searchParams.get("category") as PackageFilters["category"]) ?? undefined,
    destination: searchParams.get("destination") ?? undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : ITEMS_PER_PAGE,
    sort: (searchParams.get("sort") as PackageFilters["sort"]) ?? undefined,
  };

  if (searchParams.get("featured") === "true") {
    const featured = packages.filter((p) => p.featured);
    return successResponse(paginate(featured, filters.page, filters.limit));
  }

  const filtered = filterPackages(packages, filters);
  return successResponse(paginate(filtered, filters.page, filters.limit));
}

export async function POST(request: NextRequest) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const body = await request.json();
  const newPackage = {
    ...body,
    id: `pkg-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  packages.push(newPackage);
  return successResponse(newPackage, 201);
}
