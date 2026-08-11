import type { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";
import { packages } from "@/data/mock/packages";
import { destinations } from "@/data/mock/destinations";
import { blogs } from "@/data/mock/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/packages",
    "/destinations",
    "/visa-services",
    "/flight-booking",
    "/train-booking",
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

  const destinationEntries = destinations.map((item) => ({
    url: `${APP_URL}/destinations/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries = blogs.map((item) => ({
    url: `${APP_URL}/blogs/${item.slug}`,
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...packageEntries, ...destinationEntries, ...blogEntries];
}
