"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
import { AdminCrudTable } from "@/features/admin/components/admin-crud-table";

export default function AdminUsersRoute() {
  const { data } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => usersApi.getAll(),
  });

  return (
    <AdminCrudTable
      title="Users"
      rows={data ?? []}
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        { key: "createdAt", label: "Created" },
      ]}
      emptyLabel="No users found"
    />
  );
}
