import { ADMIN_USER, signToken } from "@/lib/auth/jwt";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@comforttravels.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  if (email !== adminEmail || password !== adminPassword) {
    return errorResponse("Invalid credentials", 401);
  }

  const token = await signToken(ADMIN_USER);
  return successResponse({ token, user: ADMIN_USER });
}
