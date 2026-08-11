"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Package2, MapPinned, MessageSquareQuote, Newspaper, Mail, Users, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/shared/loader";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Packages", icon: Package2 },
  { href: "/admin/destinations", label: "Destinations", icon: MapPinned },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper },
  { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading || !isAuthenticated) return <PageLoader />;

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[230px_1fr]">
        <aside className="rounded-xl border bg-card p-4">
          <p className="text-sm font-semibold">Admin Panel</p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
          <nav className="mt-4 space-y-1">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Button
            variant="outline"
            className="mt-5 w-full gap-2"
            onClick={() => {
              logout();
              router.replace("/admin/login");
            }}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </aside>

        <section className="rounded-xl border bg-card p-4 md:p-6">{children}</section>
      </div>
    </div>
  );
}
