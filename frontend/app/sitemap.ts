import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { packages } from "@/data/mock/packages";
import { blogs } from "@/data/mock/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/packages",
    "/visa-services",
    "/flight-booking",
    "/train-booking",
    "/bus-booking",
    "/hotels",
    "/about",
    "/contact",
    "/blogs",
  ];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${APP_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const packageEntries = packages.map((item) => ({
    url: `${APP_URL}/packages/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries = blogs.map((item) => ({
    url: `${APP_URL}/blogs/${item.slug}`,
    lastModified: new Date(item.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...packageEntries, ...blogEntries];
}
