import { NextRequest } from "next/server";
import { blogs as mockBlogs } from "@/data/mock/blogs";
import { paginate } from "@/lib/utils/helpers";
import { successResponse } from "@/lib/api/server-utils";
import { ITEMS_PER_PAGE } from "@/lib/constants";

const blogs = [...mockBlogs];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? ITEMS_PER_PAGE);
  const featured = searchParams.get("featured") === "true";

  const result = featured ? blogs.filter((b) => b.featured) : blogs;
  return successResponse(paginate(result, page, limit));
}

export async function POST(request: NextRequest) {
  const { requireAuth } = await import("@/lib/api/server-utils");
  const { error, user } = await requireAuth(request);
  if (error || !user) return error!;

  const body = await request.json();
  const newBlog = { ...body, id: `blog-${Date.now()}`, publishedAt: new Date().toISOString() };
  blogs.push(newBlog);
  return successResponse(newBlog, 201);
}
