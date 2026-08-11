"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardApi } from "@/lib/api";

const statCards = [
  { key: "totalPackages", label: "Packages" },
  { key: "totalDestinations", label: "Destinations" },
  { key: "totalEnquiries", label: "Enquiries" },
  { key: "pendingEnquiries", label: "Pending Enquiries" },
  { key: "totalBlogs", label: "Blogs" },
  { key: "totalTestimonials", label: "Testimonials" },
] as const;

export default function AdminDashboardRoute() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "dashboard", "stats"],
    queryFn: () => dashboardApi.getStats(),
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((item) => (
          <Card key={item.key}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{isLoading ? "..." : data?.[item.key] ?? 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
