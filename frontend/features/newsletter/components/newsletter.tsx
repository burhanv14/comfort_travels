"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema } from "@/lib/validations/schemas";

export function Newsletter() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Subscribed successfully!");
    reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <div className="flex-1">
        <Input placeholder="Your email" type="email" {...register("email")} aria-label="Email for newsletter" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message as string}</p>}
      </div>
      <Button type="submit" size="sm" disabled={loading}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : "Subscribe"}
      </Button>
    </form>
  );
}
