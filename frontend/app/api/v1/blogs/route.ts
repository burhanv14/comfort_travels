import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api/server-utils";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? ITEMS_PER_PAGE);
  const featured = searchParams.get("featured") === "true";

  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);

    let allBlogs: unknown[] = await res.json();

    // Backend Blog has no publishedAt - use createdAt; adapt for frontend Blog type
    allBlogs = allBlogs.map((b: unknown) => {
      const blog = b as Record<string, unknown>;
      return {
        ...blog,
        // map createdAt -> publishedAt for frontend compatibility
        publishedAt: blog.createdAt ?? blog.updatedAt ?? new Date().toISOString(),
        // ensure id is string
        id: String(blog.id),
        // ensure tags is always an array
        tags: Array.isArray(blog.tags) ? blog.tags : [],
      };
    });

    if (featured) {
      allBlogs = allBlogs.filter((b: unknown) => (b as { featured?: boolean }).featured === true);
    }

    // Paginate
    const total = allBlogs.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const data = allBlogs.slice(start, start + limit);

    return successResponse({ data, total, page, limit, totalPages });
  } catch (err) {
    console.error("[blogs GET]", err);
    return errorResponse("Failed to fetch blogs", 502);
  }
}

export async function POST(request: NextRequest) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const body = await request.json();

  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      return errorResponse(`Backend error: ${text}`, res.status);
    }
    const created = await res.json();
    // Add publishedAt alias
    const mapped = {
      ...created,
      id: String(created.id),
      publishedAt: created.createdAt ?? new Date().toISOString(),
      tags: Array.isArray(created.tags) ? created.tags : [],
    };
    return successResponse(mapped, 201);
  } catch (err) {
    console.error("[blogs POST]", err);
    return errorResponse("Failed to create blog", 502);
  }
}
