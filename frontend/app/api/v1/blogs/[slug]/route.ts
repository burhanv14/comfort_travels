import { NextRequest } from "next/server";
import { blogs as mockBlogs } from "@/data/mock/blogs";
import { successResponse, errorResponse } from "@/lib/api/server-utils";

const blogs = [...mockBlogs];

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return errorResponse("Blog not found", 404);
  return successResponse(blog);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const index = blogs.findIndex((b) => b.slug === slug);
  if (index === -1) return errorResponse("Blog not found", 404);

  const body = await request.json();
  blogs[index] = { ...blogs[index], ...body };
  return successResponse(blogs[index]);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const { slug } = await params;
  const index = blogs.findIndex((b) => b.slug === slug);
  if (index === -1) return errorResponse("Blog not found", 404);

  blogs.splice(index, 1);
  return successResponse(null);
}
