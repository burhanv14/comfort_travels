"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { packagesApi } from "@/lib/api";
import { AdminCrudTable } from "@/features/admin/components/admin-crud-table";

export default function AdminPackagesRoute() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "packages"],
    queryFn: () => packagesApi.getAll({ page: 1, limit: 100 }),
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => packagesApi.delete(slug),
    onSuccess: async () => {
      toast.success("Package deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
    },
    onError: () => toast.error("Failed to delete package"),
  });

  return (
    <AdminCrudTable
      title="Packages"
      rows={data?.data ?? []}
      columns={[
        { key: "title", label: "Title" },
        { key: "destination", label: "Destination" },
        { key: "duration", label: "Duration" },
        { key: "price", label: "Price" },
      ]}
      emptyLabel="No packages available"
      onDelete={(row) => deleteMutation.mutate(row.slug)}
    />
  );
}
