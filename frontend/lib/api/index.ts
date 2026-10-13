import { apiClient } from "./client";
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } from "@/lib/constants";
import { ADMIN_USER, signToken } from "@/lib/auth/jwt";
import type {
  ApiResponse,
  AuthResponse,
  Blog,
  ContactSubmission,
  DashboardStats,
  Enquiry,
  Package,
  PackageFilters,
  PaginatedResponse,
  Testimonial,
  User,
} from "@/types";

export const packagesApi = {
  getAll: (filters?: PackageFilters) =>
    apiClient.get<ApiResponse<PaginatedResponse<Package>>>("/packages", { params: filters }).then((r) => r.data.data),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Package>>(`/packages/${slug}`).then((r) => r.data.data),

  getFeatured: () =>
    apiClient
      .get<ApiResponse<PaginatedResponse<Package>>>("/packages", { params: { showOnHomepage: true, limit: 6 } })
      .then((r) => r.data.data.data),

  create: (data: Partial<Package>) =>
    apiClient.post<ApiResponse<Package>>("/packages", data).then((r) => r.data.data),

  update: (slug: string, data: Partial<Package>) =>
    apiClient.put<ApiResponse<Package>>(`/packages/${slug}`, data).then((r) => r.data.data),

  delete: (slug: string) =>
    apiClient.delete<ApiResponse<null>>(`/packages/${slug}`).then((r) => r.data),
};

export const blogsApi = {
  getAll: (params?: { featured?: boolean; page?: number; limit?: number }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Blog>>>("/blogs", { params }).then((r) => r.data.data),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Blog>>(`/blogs/${slug}`).then((r) => r.data.data),

  create: (data: Partial<Blog>) =>
    apiClient.post<ApiResponse<Blog>>("/blogs", data).then((r) => r.data.data),

  update: (slug: string, data: Partial<Blog>) =>
    apiClient.put<ApiResponse<Blog>>(`/blogs/${slug}`, data).then((r) => r.data.data),

  delete: (slug: string) =>
    apiClient.delete<ApiResponse<null>>(`/blogs/${slug}`).then((r) => r.data),
};

export const enquiryApi = {
  // POST /api/v1/enquiries -> proxied to backend /api/enquiries
  submit: (data: Partial<Enquiry>) =>
    apiClient.post<ApiResponse<null>>("/enquiries", data).then((r) => r.data),
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
  getStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>("/dashboard/stats").then((r) => r.data.data),
};

export const usersApi = {
  getAll: () =>
    apiClient.get<ApiResponse<User[]>>("/users").then((r) => r.data.data),
};