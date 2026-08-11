"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { testimonialsApi } from "@/lib/api";
import { AdminCrudTable } from "@/features/admin/components/admin-crud-table";

export default function AdminTestimonialsRoute() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: () => testimonialsApi.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => testimonialsApi.delete(id),
    onSuccess: async () => {
      toast.success("Testimonial deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "testimonials"] });
    },
    onError: () => toast.error("Failed to delete testimonial"),
  });

  return (
    <AdminCrudTable
      title="Testimonials"
      rows={data ?? []}
      columns={[
        { key: "name", label: "Name" },
        { key: "location", label: "Location" },
        { key: "tripType", label: "Trip Type" },
        { key: "featured", label: "Featured" },
      ]}
      emptyLabel="No testimonials available"
      onDelete={(row) => deleteMutation.mutate(row.id)}
    />
  );
}
