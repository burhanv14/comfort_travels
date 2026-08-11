import { apiClient } from "./client";
import type {
  ApiResponse,
  AuthResponse,
  Blog,
  ContactSubmission,
  DashboardStats,
  Destination,
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
      .get<ApiResponse<PaginatedResponse<Package>>>("/packages", { params: { featured: true, limit: 6 } })
      .then((r) => r.data.data.data),

  create: (data: Partial<Package>) =>
    apiClient.post<ApiResponse<Package>>("/packages", data).then((r) => r.data.data),

  update: (slug: string, data: Partial<Package>) =>
    apiClient.put<ApiResponse<Package>>(`/packages/${slug}`, data).then((r) => r.data.data),

  delete: (slug: string) =>
    apiClient.delete<ApiResponse<null>>(`/packages/${slug}`).then((r) => r.data),
};

export const destinationsApi = {
  getAll: (params?: { popular?: boolean; page?: number; limit?: number }) =>
    apiClient.get<ApiResponse<PaginatedResponse<Destination>>>("/destinations", { params }).then((r) => r.data.data),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Destination>>(`/destinations/${slug}`).then((r) => r.data.data),

  create: (data: Partial<Destination>) =>
    apiClient.post<ApiResponse<Destination>>("/destinations", data).then((r) => r.data.data),

  update: (slug: string, data: Partial<Destination>) =>
    apiClient.put<ApiResponse<Destination>>(`/destinations/${slug}`, data).then((r) => r.data.data),

  delete: (slug: string) =>
    apiClient.delete<ApiResponse<null>>(`/destinations/${slug}`).then((r) => r.data),
};

export const testimonialsApi = {
  getAll: (params?: { featured?: boolean }) =>
    apiClient.get<ApiResponse<Testimonial[]>>("/testimonials", { params }).then((r) => r.data.data),

  create: (data: Partial<Testimonial>) =>
    apiClient.post<ApiResponse<Testimonial>>("/testimonials", data).then((r) => r.data.data),

  update: (id: string, data: Partial<Testimonial>) =>
    apiClient.put<ApiResponse<Testimonial>>(`/testimonials/${id}`, data).then((r) => r.data.data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/testimonials/${id}`).then((r) => r.data),
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
  submit: (data: Omit<Enquiry, "id" | "status" | "createdAt">) =>
    apiClient.post<ApiResponse<Enquiry>>("/enquiry", data).then((r) => r.data),

  getAll: () =>
    apiClient.get<ApiResponse<Enquiry[]>>("/enquiry").then((r) => r.data.data),

  updateStatus: (id: string, status: Enquiry["status"]) =>
    apiClient.patch<ApiResponse<Enquiry>>(`/enquiry/${id}`, { status }).then((r) => r.data.data),
};

export const contactApi = {
  submit: (data: Omit<ContactSubmission, "id" | "createdAt">) =>
    apiClient.post<ApiResponse<ContactSubmission>>("/contact", data).then((r) => r.data),
};

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<ApiResponse<AuthResponse>>("/auth/login", { email, password }).then((r) => r.data.data),

  me: () =>
    apiClient.get<ApiResponse<User>>("/auth/me").then((r) => r.data.data),
};

export const dashboardApi = {
  getStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>("/dashboard/stats").then((r) => r.data.data),
};

export const usersApi = {
  getAll: () =>
    apiClient.get<ApiResponse<User[]>>("/users").then((r) => r.data.data),
};
