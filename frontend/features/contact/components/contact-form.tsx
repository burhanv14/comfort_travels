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
import { contactSchema, type ContactFormData } from "@/lib/validations/schemas";
import { contactApi } from "@/lib/api";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      await contactApi.submit(data);
      setSuccess(true);
      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <CheckCircle2 className="size-12 text-primary" />
        <h3 className="mt-4 text-lg font-semibold">Message Sent!</h3>
        <p className="mt-2 text-sm text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
        <Button variant="outline" className="mt-4" onClick={() => setSuccess(false)}>Send Another Message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name *</Label>
          <Input id="contact-name" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email *</Label>
          <Input id="contact-email" type="email" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone">Phone</Label>
        <Input id="contact-phone" type="tel" {...register("phone")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject *</Label>
        <Input id="contact-subject" {...register("subject")} aria-invalid={!!errors.subject} />
        {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message *</Label>
        <Textarea id="contact-message" rows={5} {...register("message")} aria-invalid={!!errors.message} />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Sending...</> : "Send Message"}
      </Button>
    </form>
  );
}
