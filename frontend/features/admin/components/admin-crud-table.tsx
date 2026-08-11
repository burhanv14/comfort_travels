"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminCrudTableProps<T extends { id: string }> {
  title: string;
  rows: T[];
  columns: Array<{ key: keyof T; label: string }>;
  emptyLabel: string;
  onDelete?: (row: T) => void;
}

export function AdminCrudTable<T extends { id: string }>({
  title,
  rows,
  columns,
  emptyLabel,
  onDelete,
}: AdminCrudTableProps<T>) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>{column.label}</TableHead>
              ))}
              {onDelete && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + (onDelete ? 1 : 0)} className="text-center text-muted-foreground">
                  {emptyLabel}
                </TableCell>
              </TableRow>
            )}
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => {
                  const value = row[column.key];
                  return (
                    <TableCell key={`${row.id}-${String(column.key)}`}>
                      {typeof value === "boolean" ? (
                        <Badge variant={value ? "default" : "outline"}>{value ? "Yes" : "No"}</Badge>
                      ) : (
                        String(value ?? "-")
                      )}
                    </TableCell>
                  );
                })}
                {onDelete && (
                  <TableCell className="text-right">
                    <Button variant="destructive" size="sm" onClick={() => onDelete(row)}>
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
