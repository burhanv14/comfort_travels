"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { enquirySchema, type EnquiryFormData } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { z } from "zod";

type EnquiryFormInput = z.input<typeof enquirySchema>;

interface EnquiryFormProps {
  packageId?: string;
  destination?: string;
  type?: EnquiryFormData["type"];
}

export function EnquiryForm({ packageId, destination, type = "general" }: EnquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormInput, unknown, EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { type, packageId, destination, travellers: 2 },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit(data);
      setSuccess(true);
      toast.success("Enquiry submitted successfully!");
      reset();
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="mt-4 text-lg font-semibold">Thank you!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your enquiry. Our travel expert will contact you within 24 hours.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => setSuccess(false)}>
          Submit Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="travellers">Travellers</Label>
          <Input id="travellers" type="number" min={1} {...register("travellers")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="travelDate">Travel Date</Label>
          <Input id="travelDate" type="date" {...register("travelDate")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget</Label>
          <Input id="budget" placeholder="e.g. 50000" {...register("budget")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" rows={4} {...register("message")} aria-invalid={!!errors.message} />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Submitting...</> : "Submit Enquiry"}
      </Button>
    </form>
  );
}
