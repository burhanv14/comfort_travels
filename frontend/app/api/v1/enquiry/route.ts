import { NextRequest } from "next/server";
import { enquiries as mockEnquiries } from "@/data/mock/enquiries";
import { successResponse } from "@/lib/api/server-utils";
import type { Enquiry } from "@/types";

const enquiries = [...mockEnquiries];

export async function GET(request: NextRequest) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  return successResponse(enquiries);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newEnquiry: Enquiry = {
    ...body,
    id: `enq-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  enquiries.push(newEnquiry);
  return successResponse(newEnquiry, 201);
}
