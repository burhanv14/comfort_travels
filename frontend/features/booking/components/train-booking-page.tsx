"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Train, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeader } from "@/components/shared/section-header";
import { trainBookingSchema } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { z } from "zod";

type TrainFormData = z.output<typeof trainBookingSchema>;
type TrainFormInput = z.input<typeof trainBookingSchema>;

const CLASS_OPTIONS = [
  { value: "1A", label: "1A — First AC" },
  { value: "2A", label: "2A — AC 2 Tier" },
  { value: "3A", label: "3A — AC 3 Tier" },
  { value: "3E", label: "3E — AC 3 Tier Economy" },
  { value: "EC", label: "EC — Executive Chair Car" },
  { value: "CC", label: "CC — AC Chair Car" },
  { value: "EA", label: "EA — Anubhuti Class" },
  { value: "FC", label: "FC — First Class (Non‑AC)" },
  { value: "SL", label: "SL — Sleeper Class" },
  { value: "2S", label: "2S — Second Sitting" },
  { value: "GS", label: "GS/UR — General Unreserved" },
];

const QUOTA_OPTIONS = [
  { value: "GN", label: "General Quota (GN)" },
  { value: "TQ", label: "Tatkal Quota (TQ)" },
  { value: "PT", label: "Premium Tatkal (PT)" },
  { value: "LD", label: "Ladies Quota (LD)" },
  { value: "LB", label: "Lower Berth / Senior Citizen Quota" },
  { value: "DV", label: "Divyaang Quota" },
  { value: "FT", label: "Foreign Tourist Quota (FT)" },
  { value: "PQ", label: "Pooled Quota (PQ)" },
  { value: "RL", label: "Remote Location Quota (RL)" },
  { value: "RS", label: "Roadside Quota (RS)" },
  { value: "DF", label: "Defence Quota (DF)" },
  { value: "DP", label: "Duty Pass Quota" },
  { value: "RSQ", label: "Railway Staff Quota" },
  { value: "EQ", label: "Emergency Quota (EQ)" },
  { value: "PH", label: "Parliament House Quota" },
  { value: "HOR", label: "High Official Requisition (HOR)" },
];

export function TrainBookingPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<TrainFormInput, unknown, TrainFormData>({
    resolver: zodResolver(trainBookingSchema),
    defaultValues: {
      class: "SL",
      quota: "GN",
      preferredTrain: "",
      passengers: [{ name: "", email: "", phone: "", age: 18, sex: "M", berthPreference: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "passengers" });
  const passengerCount = fields.length;

  const onSubmit = async (data: TrainFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: data.passengers[0]?.name || "",
        email: data.passengers[0]?.email || "",
        phone: data.passengers[0]?.phone || "",
        type: "train",
        from: data.from,
        to: data.to,
        travelDate: data.travelDate,
        class: data.class,
        trainClass: data.class,
        quota: data.quota,
        preferredTrain: data.preferredTrain,
        passengers: data.passengers,
        travellers: data.passengers.length,
      });
      toast.success("Train enquiry submitted successfully! We will contact you soon.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl container-padding">
        <Breadcrumbs items={[{ label: "Train Booking" }]} />
        <SectionHeader title="Book Train Tickets" description="Seamless rail reservations across India." align="left" className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Route & Date */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>From Station *</Label>
                  <Input placeholder="e.g. Mumbai CST" {...register("from")} />
                  {errors.from && <p className="text-xs text-destructive">{errors.from.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>To Station *</Label>
                  <Input placeholder="e.g. Delhi NDLS" {...register("to")} />
                  {errors.to && <p className="text-xs text-destructive">{errors.to.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Travel Date *</Label>
                  <Input type="date" {...register("travelDate")} />
                </div>
                <div className="space-y-2">
                  <Label>Class *</Label>
                  <Select value={watch("class") || "SL"} onValueChange={(v) => setValue("class", (v ?? "SL") as TrainFormData["class"])}>
                    <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      {CLASS_OPTIONS.map((c) => (
                        <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quota *</Label>
                  <Select value={watch("quota") || "GN"} onValueChange={(v) => setValue("quota", (v ?? "GN") as TrainFormData["quota"])}>
                    <SelectTrigger><SelectValue placeholder="Select quota" /></SelectTrigger>
                    <SelectContent>
                      {QUOTA_OPTIONS.map((q) => (
                        <SelectItem key={q.value} value={q.value}>{q.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Train (optional)</Label>
                  <Input placeholder="e.g. 12951 Rajdhani Express" {...register("preferredTrain")} />
                </div>
              </div>

              <hr />

              {/* Passengers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Passenger Details</h3>
                  {passengerCount < 6 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", email: "", phone: "", age: 18, sex: "M", berthPreference: "" })} className="gap-1">
                      <Plus className="size-4" /> Add Passenger
                    </Button>
                  )}
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-lg space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Passenger {index + 1}</span>
                      {passengerCount > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive">
                          <Minus className="size-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label>Name *</Label>
                        <Input {...register(`passengers.${index}.name`)} />
                        {errors.passengers?.[index]?.name && <p className="text-xs text-destructive">{errors.passengers[index].name.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label>Email *</Label>
                        <Input type="email" {...register(`passengers.${index}.email`)} />
                        {errors.passengers?.[index]?.email && <p className="text-xs text-destructive">{errors.passengers[index].email.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label>Phone *</Label>
                        <Input type="tel" {...register(`passengers.${index}.phone`)} />
                        {errors.passengers?.[index]?.phone && <p className="text-xs text-destructive">{errors.passengers[index].phone.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label>Age *</Label>
                        <Input type="number" min={1} max={120} {...register(`passengers.${index}.age`, { valueAsNumber: true })} />
                        {errors.passengers?.[index]?.age && <p className="text-xs text-destructive">{errors.passengers[index].age.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label>Sex *</Label>
                        <Select value={watch(`passengers.${index}.sex`) || "M"} onValueChange={(v) => setValue(`passengers.${index}.sex`, (v ?? "M") as "M"|"F"|"O")}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                            <SelectItem value="O">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Berth Preference (optional)</Label>
                        <Input placeholder="e.g. Lower, Window" {...register(`passengers.${index}.berthPreference`)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <><Train className="size-4" /> Enquire Now</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
