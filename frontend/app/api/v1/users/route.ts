import { ADMIN_USER } from "@/lib/auth/jwt";
import { successResponse } from "@/lib/api/server-utils";

export async function GET() {
  return successResponse([ADMIN_USER]);
}
