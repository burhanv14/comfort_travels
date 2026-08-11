"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { blogsApi } from "@/lib/api";
import { AdminCrudTable } from "@/features/admin/components/admin-crud-table";

export default function AdminBlogsRoute() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "blogs"],
    queryFn: () => blogsApi.getAll({ page: 1, limit: 100 }),
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => blogsApi.delete(slug),
    onSuccess: async () => {
      toast.success("Blog deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
    },
    onError: () => toast.error("Failed to delete blog"),
  });

  return (
    <AdminCrudTable
      title="Blogs"
      rows={data?.data ?? []}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "author", label: "Author" },
        { key: "featured", label: "Featured" },
      ]}
      emptyLabel="No blogs available"
      onDelete={(row) => deleteMutation.mutate(row.slug)}
    />
  );
}
