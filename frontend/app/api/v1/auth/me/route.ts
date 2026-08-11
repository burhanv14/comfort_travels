import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) return errorResponse("Unauthorized", 401);

  const user = await verifyToken(token);
  if (!user) return errorResponse("Invalid token", 401);

  return successResponse(user);
}
