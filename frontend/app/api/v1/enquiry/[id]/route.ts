import { NextRequest } from "next/server";
import { enquiries as mockEnquiries } from "@/data/mock/enquiries";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const enquiries = [...mockEnquiries];

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { id } = await params;
  const index = enquiries.findIndex((e) => e.id === id);
  if (index === -1) return errorResponse("Enquiry not found", 404);

  const body = await request.json();
  enquiries[index] = { ...enquiries[index], ...body };
  return successResponse(enquiries[index]);
}
