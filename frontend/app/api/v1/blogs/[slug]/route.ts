import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

type Params = { params: Promise<{ slug: string }> };

function mapBlog(blog: Record<string, unknown>) {
  return {
    ...blog,
    id: String(blog.id),
    publishedAt: blog.createdAt ?? blog.updatedAt ?? new Date().toISOString(),
    tags: Array.isArray(blog.tags) ? blog.tags : [],
  };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs/${slug}`, { cache: "no-store" });
    if (res.status === 404) return errorResponse("Blog not found", 404);
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    const blog = await res.json();
    return successResponse(mapBlog(blog));
  } catch (err) {
    console.error("[blog slug GET]", err);
    return errorResponse("Failed to fetch blog", 502);
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const body = await request.json();

  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 404) return errorResponse("Blog not found", 404);
    if (!res.ok) {
      const text = await res.text();
      return errorResponse(`Backend error: ${text}`, res.status);
    }
    const updated = await res.json();
    return successResponse(mapBlog(updated));
  } catch (err) {
    console.error("[blog slug PUT]", err);
    return errorResponse("Failed to update blog", 502);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;

  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs/${slug}`, {
      method: "DELETE",
    });
    if (res.status === 404) return errorResponse("Blog not found", 404);
    if (!res.ok) throw new Error(`Backend error: ${res.status}`);
    return successResponse(null);
  } catch (err) {
    console.error("[blog slug DELETE]", err);
    return errorResponse("Failed to delete blog", 502);
  }
}
