"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, FileCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeader } from "@/components/shared/section-header";
import { visaEnquirySchema } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { VISA_TYPES } from "@/lib/constants";
import { z } from "zod";

type VisaFormData = z.infer<typeof visaEnquirySchema>;

const COUNTRIES = ["India", "United States", "United Kingdom", "UAE", "Singapore", "Thailand", "Australia", "Canada"];

export function VisaServicesPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<VisaFormData>({
    resolver: zodResolver(visaEnquirySchema),
  });

  const onSubmit = async (data: VisaFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        ...data,
        type: "visa",
        travellers: 1,
        message: data.message ?? `Visa enquiry for ${data.destinationCountry} - ${data.visaType}`,
      });
      toast.success("Visa enquiry submitted! We'll contact you within 24 hours.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <Breadcrumbs items={[{ label: "Visa Services" }]} />
        <SectionHeader
          title="Visa Services"
          description="Smooth visa processing with 99.3% approval rate and end-to-end support."
          align="left"
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input {...register("name")} />
                    {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" {...register("email")} />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input type="tel" {...register("phone")} />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label>Country of Residence *</Label>
                    <Select onValueChange={(v) => setValue("countryOfResidence", v as string)}>
                      <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nationality *</Label>
                    <Select onValueChange={(v) => setValue("nationality", v as string)}>
                      <SelectTrigger><SelectValue placeholder="Select nationality" /></SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Destination Country *</Label>
                    <Select onValueChange={(v) => setValue("destinationCountry", v as string)}>
                      <SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label>Visa Type *</Label>
                    <Select onValueChange={(v) => setValue("visaType", v as string)}>
                      <SelectTrigger><SelectValue placeholder="Select visa type" /></SelectTrigger>
                      <SelectContent>
                        {VISA_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Additional Details</Label>
                  <Textarea rows={3} {...register("message")} />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Submitting...</> : "Submit Visa Enquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <FileCheck className="size-10 text-primary" />
                <div>
                  <p className="font-semibold">99.3% Approval Rate</p>
                  <p className="text-sm text-muted-foreground">Expert document preparation</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <Shield className="size-10 text-primary" />
                <div>
                  <p className="font-semibold">Secure Processing</p>
                  <p className="text-sm text-muted-foreground">Your data is safe with us</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
