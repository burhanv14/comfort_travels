import type { Package, PackageFilters, PaginatedResponse } from "@/types";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export function paginate<T>(items: T[], page = 1, limit = ITEMS_PER_PAGE): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  return {
    data: items.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages,
  };
}

export function filterPackages(packages: Package[], filters: PackageFilters): Package[] {
  let result = [...packages];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.destination) {
    result = result.filter((p) => p.destinationId === filters.destination || p.destination.toLowerCase() === filters.destination?.toLowerCase());
  }

  if (filters.minPrice) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (filters.sort === "rating") result.sort((a, b) => b.rating - a.rating);
  else if (filters.sort === "popular") result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

  return result;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatPrice(price: number, currency = "INR"): string {
  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}
