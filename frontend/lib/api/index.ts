import { apiClient } from "./client";
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ITEMS_PER_PAGE } from "@/lib/constants";
import { ADMIN_USER, signToken } from "@/lib/auth/jwt";
import type {
  ApiResponse,
  AuthResponse,
  Blog,
  ContactSubmission,
  DashboardStats,
  Enquiry,
  Package,
  PackageCategory,
  PackageDifficulty,
  PackageFilters,
  PackagePhysicalRating,
  PaginatedResponse,
  User,
} from "@/types";

const DEFAULT_PACKAGE_IMAGE =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
const DEFAULT_BLOG_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

function normalizePackage(raw: unknown): Package {
  if (!raw || typeof raw !== "object") return raw as Package;
  const p = raw as Record<string, unknown>;

  const categoryStr =
    typeof p.category === "string"
      ? p.category.toLowerCase().replace("-", "_").trim()
      : "adventure";

  const diffStr =
    typeof p.difficulty === "string"
      ? p.difficulty.toLowerCase().trim()
      : (p.difficulty ?? "easy");

  const physStr =
    typeof p.physicalRating === "string"
      ? p.physicalRating.toLowerCase().replace("-", "_").trim()
      : (p.physicalRating ?? "low");

  const images = Array.isArray(p.images)
    ? p.images.filter((img): img is string => typeof img === "string" && img.length > 0)
    : [];

  const rawCover = typeof p.coverImage === "string" ? p.coverImage.trim() : "";
  const coverImage = rawCover || (images.length > 0 ? images[0] : DEFAULT_PACKAGE_IMAGE);

  return {
    ...(p as unknown as Package),
    id: String(p.id ?? ""),
    title: typeof p.title === "string" ? p.title : "",
    slug: typeof p.slug === "string" ? p.slug : "",
    description: typeof p.description === "string" ? p.description : "",
    shortDescription:
      typeof p.shortDescription === "string" && p.shortDescription.length > 0
        ? p.shortDescription
        : typeof p.description === "string"
        ? p.description.slice(0, 160)
        : "",
    category: categoryStr as PackageCategory,
    duration: typeof p.duration === "string" ? p.duration : "",
    images,
    coverImage,
    metaTitle: typeof p.metaTitle === "string" ? p.metaTitle : undefined,
    metaDescription: typeof p.metaDescription === "string" ? p.metaDescription : undefined,
    metaKeywords: typeof p.metaKeywords === "string" ? p.metaKeywords : undefined,
    active: p.active !== false,
    showOnHomepage: Boolean(p.showOnHomepage),
    destination: typeof p.destination === "string" ? p.destination : undefined,
    startLocation: typeof p.startLocation === "string" ? p.startLocation : undefined,
    endLocation: typeof p.endLocation === "string" ? p.endLocation : undefined,
    difficulty: diffStr as PackageDifficulty,
    physicalRating: physStr as PackagePhysicalRating,
    minGroupSize: typeof p.minGroupSize === "number" ? p.minGroupSize : 1,
    maxGroupSize: typeof p.maxGroupSize === "number" ? p.maxGroupSize : 20,
    minAge: typeof p.minAge === "number" ? p.minAge : undefined,
    maxAge: typeof p.maxAge === "number" ? p.maxAge : undefined,
    accommodation: typeof p.accommodation === "string" ? p.accommodation : undefined,
    meals: typeof p.meals === "string" ? p.meals : undefined,
    transport: typeof p.transport === "string" ? p.transport : undefined,
    cancellationPolicy: typeof p.cancellationPolicy === "string" ? p.cancellationPolicy : undefined,
    bookingPolicy: typeof p.bookingPolicy === "string" ? p.bookingPolicy : undefined,
    freeCancellation: Boolean(p.freeCancellation),
    cancellationDaysBefore:
      typeof p.cancellationDaysBefore === "number" ? p.cancellationDaysBefore : undefined,
    itinerary: Array.isArray(p.itinerary)
      ? p.itinerary.map((item: unknown, idx: number) => {
          const it = (item ?? {}) as Record<string, unknown>;
          return {
            id: it.id ? String(it.id) : undefined,
            day: typeof it.day === "number" ? it.day : idx + 1,
            title: typeof it.title === "string" ? it.title : `Day ${idx + 1}`,
            description: typeof it.description === "string" ? it.description : "",
            activities: Array.isArray(it.activities)
              ? it.activities.filter((a): a is string => typeof a === "string")
              : [],
            accommodation: typeof it.accommodation === "string" ? it.accommodation : undefined,
            meals: typeof it.meals === "string" ? it.meals : undefined,
            transport: typeof it.transport === "string" ? it.transport : undefined,
          };
        })
      : [],
    inclusions: Array.isArray(p.inclusions)
      ? p.inclusions.filter((i): i is string => typeof i === "string")
      : [],
    exclusions: Array.isArray(p.exclusions)
      ? p.exclusions.filter((e): e is string => typeof e === "string")
      : [],
    faqs: Array.isArray(p.faqs)
      ? p.faqs.map((item: unknown) => {
          const f = (item ?? {}) as Record<string, unknown>;
          return {
            id: f.id ? String(f.id) : undefined,
            question: typeof f.question === "string" ? f.question : "",
            answer: typeof f.answer === "string" ? f.answer : "",
          };
        })
      : [],
    highlights: Array.isArray(p.highlights)
      ? p.highlights.filter((h): h is string => typeof h === "string")
      : [],
    averageRating: typeof p.averageRating === "number" ? p.averageRating : undefined,
    reviewCount: typeof p.reviewCount === "number" ? p.reviewCount : undefined,
    createdAt: typeof p.createdAt === "string" ? p.createdAt : new Date().toISOString(),
    updatedAt: typeof p.updatedAt === "string" ? p.updatedAt : new Date().toISOString(),
  };
}

function normalizeBlog(raw: unknown): Blog {
  if (!raw || typeof raw !== "object") return raw as Blog;
  const b = raw as Record<string, unknown>;

  const rawCover = typeof b.coverImage === "string" ? b.coverImage.trim() : "";
  const coverImage = rawCover || DEFAULT_BLOG_IMAGE;

  return {
    ...(b as unknown as Blog),
    id: String(b.id ?? ""),
    title: typeof b.title === "string" ? b.title : "",
    slug: typeof b.slug === "string" ? b.slug : "",
    excerpt: typeof b.excerpt === "string" ? b.excerpt : "",
    content: typeof b.content === "string" ? b.content : "",
    coverImage,
    author: typeof b.author === "string" && b.author.length > 0 ? b.author : "Comfort Travels Team",
    category: typeof b.category === "string" ? b.category : "Travel",
    tags: Array.isArray(b.tags)
      ? b.tags.filter((t): t is string => typeof t === "string")
      : [],
    readTime: typeof b.readTime === "number" ? b.readTime : 5,
    featured: Boolean(b.featured),
    createdAt:
      typeof b.createdAt === "string"
        ? b.createdAt
        : typeof b.publishedAt === "string"
        ? b.publishedAt
        : new Date().toISOString(),
    updatedAt:
      typeof b.updatedAt === "string"
        ? b.updatedAt
        : typeof b.createdAt === "string"
        ? b.createdAt
        : new Date().toISOString(),
  };
}

function extractItemsAndPagination<T>(
  raw: unknown,
  normalizer: (item: unknown) => T,
  defaultLimit = ITEMS_PER_PAGE
): { items: T[]; isAlreadyPaginated: boolean; total: number; page: number; limit: number; totalPages: number } {
  let rawList: unknown[] = [];
  let isAlreadyPaginated = false;
  let total = 0;
  let page = 1;
  let limit = defaultLimit;
  let totalPages = 1;

  if (Array.isArray(raw)) {
    // Spring Boot directly returns List<T>
    rawList = raw;
  } else if (raw && typeof raw === "object") {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.data)) {
      rawList = obj.data;
      if (typeof obj.total === "number") {
        isAlreadyPaginated = true;
        total = obj.total;
        page = typeof obj.page === "number" ? obj.page : 1;
        limit = typeof obj.limit === "number" ? obj.limit : defaultLimit;
        totalPages =
          typeof obj.totalPages === "number"
            ? obj.totalPages
            : Math.max(1, Math.ceil(total / (limit || 1)));
      }
    } else if (obj.data && typeof obj.data === "object") {
      const nested = obj.data as Record<string, unknown>;
      if (Array.isArray(nested.data)) {
        // ApiResponse<PaginatedResponse<T>>: { success: true, data: { data: [...], total, page, ... } }
        rawList = nested.data;
        isAlreadyPaginated = true;
        total = typeof nested.total === "number" ? nested.total : rawList.length;
        page = typeof nested.page === "number" ? nested.page : 1;
        limit = typeof nested.limit === "number" ? nested.limit : defaultLimit;
        totalPages =
          typeof nested.totalPages === "number"
            ? nested.totalPages
            : Math.max(1, Math.ceil(total / (limit || 1)));
      } else if (Array.isArray(nested)) {
        rawList = nested;
      }
    }
  }

  const items = rawList.map(normalizer);

  return {
    items,
    isAlreadyPaginated,
    total: isAlreadyPaginated ? total : items.length,
    page,
    limit,
    totalPages: isAlreadyPaginated ? totalPages : Math.max(1, Math.ceil(items.length / (limit || 1))),
  };
}

export const packagesApi = {
  getAll: async (filters?: PackageFilters): Promise<PaginatedResponse<Package>> => {
    const res = await apiClient.get<unknown>("/packages", { params: filters });
    const { items, isAlreadyPaginated, total, page, limit, totalPages } =
      extractItemsAndPagination(res.data, normalizePackage, filters?.limit ?? ITEMS_PER_PAGE);

    if (isAlreadyPaginated) {
      return { data: items, total, page, limit, totalPages };
    }

    // Apply client-side filtering and pagination when backend returns unpaginated List<PackageDto>
    let filtered = items;

    if (filters?.active !== undefined) {
      filtered = filtered.filter((p) => p.active === filters.active);
    }

    if (filters?.category) {
      const targetCat = filters.category.toLowerCase().replace("-", "_");
      filtered = filtered.filter((p) => p.category.toLowerCase().replace("-", "_") === targetCat);
    }

    if (filters?.showOnHomepage !== undefined) {
      filtered = filtered.filter((p) => p.showOnHomepage === filters.showOnHomepage);
    }

    if (filters?.search) {
      const q = filters.search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.destination?.toLowerCase().includes(q)
      );
    }

    const targetPage = filters?.page ?? 1;
    const targetLimit = filters?.limit ?? ITEMS_PER_PAGE;
    const newTotal = filtered.length;
    const newTotalPages = targetLimit > 0 ? Math.max(1, Math.ceil(newTotal / targetLimit)) : 1;
    const startIndex = (targetPage - 1) * targetLimit;
    const paginatedData =
      targetLimit > 0 ? filtered.slice(startIndex, startIndex + targetLimit) : filtered;

    return {
      data: paginatedData,
      total: newTotal,
      page: targetPage,
      limit: targetLimit,
      totalPages: newTotalPages,
    };
  },

  getBySlug: async (slug: string): Promise<Package> => {
    const res = await apiClient.get<unknown>(`/packages/${slug}`);
    const raw = res.data as Record<string, unknown> | null;
    const pkg =
      (raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)
        ? (raw.data as Record<string, unknown>).data ?? raw.data
        : raw) ?? raw;
    return normalizePackage(pkg);
  },

  getFeatured: async (): Promise<Package[]> => {
    try {
      const res = await apiClient.get<unknown>("/packages/homepage");
      const { items } = extractItemsAndPagination(res.data, normalizePackage, 6);
      if (items.length > 0) {
        return items.slice(0, 6);
      }
    } catch {
      // Fallback below if /packages/homepage is unavailable
    }

    try {
      const { data } = await packagesApi.getAll({ showOnHomepage: true, active: true, limit: 6 });
      if (data.length > 0) {
        return data;
      }
    } catch {
      // Fallback below
    }

    const fallback = await packagesApi.getAll({ active: true, limit: 6 });
    return fallback.data;
  },

  create: async (data: Partial<Package>): Promise<Package> => {
    const payload = {
      ...data,
      category:
        typeof data.category === "string"
          ? data.category.toUpperCase().replace("-", "_")
          : data.category,
    };
    const res = await apiClient.post<unknown>("/packages", payload);
    const raw = res.data as Record<string, unknown> | null;
    const created =
      (raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)
        ? (raw.data as Record<string, unknown>).data ?? raw.data
        : raw) ?? raw;
    return normalizePackage(created);
  },

  update: async (slug: string, data: Partial<Package>): Promise<Package> => {
    const payload = {
      ...data,
      category:
        typeof data.category === "string"
          ? data.category.toUpperCase().replace("-", "_")
          : data.category,
    };
    const res = await apiClient.put<unknown>(`/packages/${slug}`, payload);
    const raw = res.data as Record<string, unknown> | null;
    const updated =
      (raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)
        ? (raw.data as Record<string, unknown>).data ?? raw.data
        : raw) ?? raw;
    return normalizePackage(updated);
  },

  delete: async (slug: string): Promise<void> => {
    await apiClient.delete(`/packages/${slug}`);
  },
};

export const blogsApi = {
  getAll: async (params?: {
    featured?: boolean;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Blog>> => {
    const res = await apiClient.get<unknown>("/blogs", { params });
    const { items, isAlreadyPaginated, total, page, limit, totalPages } =
      extractItemsAndPagination(res.data, normalizeBlog, params?.limit ?? 9);

    if (isAlreadyPaginated) {
      return { data: items, total, page, limit, totalPages };
    }

    let filtered = items;
    if (params?.featured !== undefined) {
      filtered = filtered.filter((b) => b.featured === params.featured);
    }

    const targetPage = params?.page ?? 1;
    const targetLimit = params?.limit ?? 9;
    const newTotal = filtered.length;
    const newTotalPages = targetLimit > 0 ? Math.max(1, Math.ceil(newTotal / targetLimit)) : 1;
    const startIndex = (targetPage - 1) * targetLimit;
    const paginatedData =
      targetLimit > 0 ? filtered.slice(startIndex, startIndex + targetLimit) : filtered;

    return {
      data: paginatedData,
      total: newTotal,
      page: targetPage,
      limit: targetLimit,
      totalPages: newTotalPages,
    };
  },

  getBySlug: async (slug: string): Promise<Blog> => {
    const res = await apiClient.get<unknown>(`/blogs/${slug}`);
    const raw = res.data as Record<string, unknown> | null;
    const blog =
      (raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)
        ? (raw.data as Record<string, unknown>).data ?? raw.data
        : raw) ?? raw;
    return normalizeBlog(blog);
  },

  create: async (data: Partial<Blog>): Promise<Blog> => {
    const res = await apiClient.post<unknown>("/blogs", data);
    const raw = res.data as Record<string, unknown> | null;
    const created =
      (raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)
        ? (raw.data as Record<string, unknown>).data ?? raw.data
        : raw) ?? raw;
    return normalizeBlog(created);
  },

  update: async (slug: string, data: Partial<Blog>): Promise<Blog> => {
    const res = await apiClient.put<unknown>(`/blogs/${slug}`, data);
    const raw = res.data as Record<string, unknown> | null;
    const updated =
      (raw?.data && typeof raw.data === "object" && !Array.isArray(raw.data)
        ? (raw.data as Record<string, unknown>).data ?? raw.data
        : raw) ?? raw;
    return normalizeBlog(updated);
  },

  delete: async (slug: string): Promise<void> => {
    await apiClient.delete(`/blogs/${slug}`);
  },
};

export const enquiryApi = {
  submit: async (data: Partial<Enquiry>) => {
    const res = await apiClient.post<unknown>("/enquiries", data);
    return res.data;
  },
};

export const contactApi = {
  submit: (data: Omit<ContactSubmission, "id" | "createdAt">) =>
    enquiryApi.submit({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      type: "contact",
    }),
};

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const expectedEmail = ADMIN_EMAIL.trim().toLowerCase();
    const expectedPassword = ADMIN_PASSWORD;

    if (email.trim().toLowerCase() !== expectedEmail || password !== expectedPassword) {
      throw new Error("Invalid email or password");
    }

    const user: User = {
      ...ADMIN_USER,
      name: ADMIN_NAME,
      email: expectedEmail,
      createdAt: new Date().toISOString(),
    };

    let token = "";
    try {
      token = await signToken(user);
    } catch {
      token = `admin-token-${Date.now()}`;
    }

    return { token, user };
  },

  me: async (): Promise<User> => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // ignore
        }
      }
    }
    return {
      ...ADMIN_USER,
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
    };
  },
};

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      const res = await apiClient.get<unknown>("/dashboard/stats");
      const raw = res.data as Record<string, unknown> | null;
      const stats = (raw?.data ?? raw) as DashboardStats | undefined;
      if (stats && typeof stats.totalPackages === "number") {
        return stats;
      }
    } catch {
      // Fallback if backend does not implement /dashboard/stats
    }

    try {
      const [pkgs, blgs] = await Promise.all([
        packagesApi.getAll({ limit: 1000 }),
        blogsApi.getAll({ limit: 1000 }),
      ]);
      return {
        totalPackages: pkgs.total,
        totalEnquiries: 0,
        pendingEnquiries: 0,
        totalBlogs: blgs.total,
        totalTestimonials: 0,
      };
    } catch {
      return {
        totalPackages: 0,
        totalEnquiries: 0,
        pendingEnquiries: 0,
        totalBlogs: 0,
        totalTestimonials: 0,
      };
    }
  },
};

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    try {
      const res = await apiClient.get<unknown>("/users");
      const raw = res.data as Record<string, unknown> | unknown[];
      const items = Array.isArray(raw)
        ? raw
        : Array.isArray((raw as Record<string, unknown>)?.data)
        ? ((raw as Record<string, unknown>).data as unknown[])
        : [];
      return items as User[];
    } catch {
      return [
        {
          ...ADMIN_USER,
          name: ADMIN_NAME,
          email: ADMIN_EMAIL,
          createdAt: new Date().toISOString(),
        },
      ];
    }
  },
};