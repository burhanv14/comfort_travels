import { SignJWT, jwtVerify } from "jose";
import type { User } from "@/types";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "comfort-travels-dev-secret-key"
);

const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export async function signToken(user: User): Promise<string> {
  return new SignJWT({ sub: user.id, email: user.email, role: user.role, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRES_IN)
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      id: payload.sub as string,
      email: payload.email as string,
      role: payload.role as User["role"],
      name: payload.name as string,
      createdAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export const ADMIN_USER: User = {
  id: "admin-1",
  name: "Admin",
  email: process.env.ADMIN_EMAIL ?? "admin@comforttravels.com",
  role: "admin",
  createdAt: "2024-01-01T00:00:00Z",
};
