"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { enquiryApi } from "@/lib/api";
import type { Enquiry } from "@/types";

const nextStatus: Record<Enquiry["status"], Enquiry["status"]> = {
  pending: "contacted",
  contacted: "converted",
  converted: "closed",
  closed: "closed",
};

export default function AdminEnquiriesRoute() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "enquiries"],
    queryFn: () => enquiryApi.getAll(),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Enquiry["status"] }) =>
      enquiryApi.updateStatus(id, status),
    onSuccess: async () => {
      toast.success("Enquiry updated");
      await queryClient.invalidateQueries({ queryKey: ["admin", "enquiries"] });
    },
    onError: () => toast.error("Failed to update enquiry"),
  });

  return (
    <div className="space-y-3">
      <h1 className="text-base font-semibold">Enquiries</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(data ?? []).map((enquiry) => (
              <TableRow key={enquiry.id}>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>{enquiry.destination ?? "-"}</TableCell>
                <TableCell className="capitalize">{enquiry.type}</TableCell>
                <TableCell>
                  <Badge variant={enquiry.status === "pending" ? "destructive" : "outline"} className="capitalize">
                    {enquiry.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={enquiry.status === "closed"}
                    onClick={() => statusMutation.mutate({ id: enquiry.id, status: nextStatus[enquiry.status] })}
                  >
                    Mark {nextStatus[enquiry.status]}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
