"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Newspaper, Star } from "lucide-react";
import { blogsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Blog } from "@/types";
import { slugify } from "@/lib/utils/helpers";

const emptyBlog: Partial<Blog> = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  author: "Comfort Travels Team",
  category: "",
  tags: [],
  readTime: 5,
  featured: false,
};

function BlogFormModal({
  open,
  onClose,
  initialData,
  onSave,
  isSaving,
}: {
  open: boolean;
  onClose: () => void;
  initialData: Partial<Blog>;
  onSave: (data: Partial<Blog>) => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<Partial<Blog>>(initialData);

  const set = (key: keyof Blog, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isEdit = !!(initialData as Blog).id;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="blog-title">Title *</Label>
              <Input
                id="blog-title"
                value={form.title ?? ""}
                onChange={(e) => {
                  set("title", e.target.value);
                  if (!isEdit) set("slug", slugify(e.target.value));
                }}
                placeholder="Blog post title"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="blog-slug">Slug *</Label>
              <Input
                id="blog-slug"
                value={form.slug ?? ""}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="blog-author">Author</Label>
              <Input
                id="blog-author"
                value={form.author ?? ""}
                onChange={(e) => set("author", e.target.value)}
                placeholder="Author name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="blog-category">Category</Label>
              <Input
                id="blog-category"
                value={form.category ?? ""}
                onChange={(e) => set("category", e.target.value)}
                placeholder="e.g. Destinations"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="blog-readtime">Read Time (mins)</Label>
              <Input
                id="blog-readtime"
                type="number"
                min={1}
                value={form.readTime ?? 5}
                onChange={(e) => set("readTime", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-cover">Cover Image URL</Label>
            <Input
              id="blog-cover"
              value={form.coverImage ?? ""}
              onChange={(e) => set("coverImage", e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-tags">Tags (comma-separated)</Label>
            <Input
              id="blog-tags"
              value={(form.tags ?? []).join(", ")}
              onChange={(e) =>
                set(
                  "tags",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
              placeholder="Bali, Indonesia, Travel Guide"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-excerpt">Excerpt</Label>
            <Textarea
              id="blog-excerpt"
              rows={2}
              value={form.excerpt ?? ""}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="A brief description shown in listing..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blog-content">Content</Label>
            <Textarea
              id="blog-content"
              rows={12}
              value={form.content ?? ""}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Full blog content. Use ## for headings, - for bullet points..."
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              id="blog-featured"
              checked={!!form.featured}
              onCheckedChange={(v) => set("featured", !!v)}
            />
            <span className="text-sm">Featured post</span>
          </label>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={() => onSave(form)}
            disabled={isSaving || !form.title || !form.slug}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : isEdit ? (
              "Update Post"
            ) : (
              "Create Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Blog | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "blogs"],
    queryFn: () => blogsApi.getAll({ page: 1, limit: 100 }),
  });

  const createMutation = useMutation({
    mutationFn: (d: Partial<Blog>) => blogsApi.create(d),
    onSuccess: async () => {
      toast.success("Blog post created successfully");
      await queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      setFormOpen(false);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to create blog post"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<Blog> }) =>
      blogsApi.update(slug, data),
    onSuccess: async () => {
      toast.success("Blog post updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      setEditTarget(null);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to update blog post"),
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => blogsApi.delete(slug),
    onSuccess: async () => {
      toast.success("Blog post deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to delete blog post"),
  });

  const blogs = data?.data ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Newspaper className="size-5 text-primary" />
            Blog Posts
          </h1>
          <p className="text-sm text-muted-foreground">{blogs.length} total posts</p>
        </div>
        <Button
          id="create-blog-btn"
          onClick={() => setFormOpen(true)}
          className="gap-2"
        >
          <Plus className="size-4" />
          New Post
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Read Time</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  <Loader2 className="size-5 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && blogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No blog posts yet. Click "New Post" to create one.
                </TableCell>
              </TableRow>
            )}
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium max-w-[220px] truncate">{blog.title}</TableCell>
                <TableCell>
                  {blog.category ? (
                    <Badge variant="secondary">{blog.category}</Badge>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{blog.author || "—"}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{blog.readTime} min</TableCell>
                <TableCell>
                  {blog.featured ? (
                    <Badge className="gap-1 text-xs">
                      <Star className="size-2.5" />
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">No</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setEditTarget(blog)}
                    >
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setDeleteTarget(blog)}
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create modal */}
      <BlogFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={emptyBlog}
        onSave={(d) => createMutation.mutate(d)}
        isSaving={createMutation.isPending}
      />

      {/* Edit modal */}
      {editTarget && (
        <BlogFormModal
          open
          onClose={() => setEditTarget(null)}
          initialData={editTarget}
          onSave={(d) => updateMutation.mutate({ slug: editTarget.slug, data: d })}
          isSaving={updateMutation.isPending}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.slug)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}