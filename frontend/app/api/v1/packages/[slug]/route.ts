import { NextRequest } from "next/server";
import { packages as mockPackages } from "@/data/mock/packages";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const packages = [...mockPackages];

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) return errorResponse("Package not found", 404);
  return successResponse(pkg);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const index = packages.findIndex((p) => p.slug === slug);
  if (index === -1) return errorResponse("Package not found", 404);

  const body = await request.json();
  packages[index] = { ...packages[index], ...body, updatedAt: new Date().toISOString() };
  return successResponse(packages[index]);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const index = packages.findIndex((p) => p.slug === slug);
  if (index === -1) return errorResponse("Package not found", 404);

  packages.splice(index, 1);
  return successResponse(null);
}
