import type { Metadata } from "next";
import { AdminLoginForm } from "@/features/admin/components/admin-login-form";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Admin Login",
  noIndex: true,
  path: "/admin/login",
});

export default function AdminLoginRoute() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <AdminLoginForm />
    </div>
  );
}
