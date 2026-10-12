import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const res = await fetch(`${BACKEND_URL}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[enquiries POST] backend error:", text);
      return errorResponse("Failed to submit enquiry", res.status);
    }

    return successResponse(null, 201);
  } catch (err) {
    console.error("[enquiries POST]", err);
    return errorResponse("Failed to submit enquiry", 502);
  }
}
