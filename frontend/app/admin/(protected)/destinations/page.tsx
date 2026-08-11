"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { destinationsApi } from "@/lib/api";
import { AdminCrudTable } from "@/features/admin/components/admin-crud-table";

export default function AdminDestinationsRoute() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "destinations"],
    queryFn: () => destinationsApi.getAll({ page: 1, limit: 100 }),
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => destinationsApi.delete(slug),
    onSuccess: async () => {
      toast.success("Destination deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "destinations"] });
    },
    onError: () => toast.error("Failed to delete destination"),
  });

  return (
    <AdminCrudTable
      title="Destinations"
      rows={data?.data ?? []}
      columns={[
        { key: "name", label: "Name" },
        { key: "country", label: "Country" },
        { key: "region", label: "Region" },
        { key: "packageCount", label: "Packages" },
      ]}
      emptyLabel="No destinations available"
      onDelete={(row) => deleteMutation.mutate(row.slug)}
    />
  );
}
