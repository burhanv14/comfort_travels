"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Bus, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeader } from "@/components/shared/section-header";
import { busBookingSchema } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { z } from "zod";

type BusFormData = z.output<typeof busBookingSchema>;
type BusFormInput = z.input<typeof busBookingSchema>;

const BUS_TYPE_OPTIONS = [
  { value: "AC_SEATER", label: "AC Seater" },
  { value: "AC_SLEEPER", label: "AC Sleeper" },
  { value: "NON_AC_SEATER", label: "Non-AC Seater" },
  { value: "NON_AC_SLEEPER", label: "Non-AC Sleeper" },
  { value: "VOLVO", label: "Volvo (Multi-axle)" },
  { value: "MERCEDES", label: "Mercedes Benz" },
  { value: "SCANIA", label: "Scania" },
  { value: "ORDINARY", label: "Ordinary / Express" },
];

export function BusBookingPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<BusFormInput, unknown, BusFormData>({
    resolver: zodResolver(busBookingSchema),
    defaultValues: {
      busType: "AC_SLEEPER",
      preferredBus: "",
      passengers: [{ name: "", email: "", phone: "", age: 18, sex: "M", berthPreference: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "passengers" });
  const passengerCount = fields.length;

  const onSubmit = async (data: BusFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: data.passengers[0]?.name || "",
        email: data.passengers[0]?.email || "",
        phone: data.passengers[0]?.phone || "",
        type: "bus",
        from: data.from,
        to: data.to,
        travelDate: data.travelDate,
        class: data.busType,
        travelClass: data.busType,
        busType: data.busType,
        preferredBus: data.preferredBus,
        passengers: data.passengers,
        travellers: data.passengers.length,
      });
      toast.success("Bus enquiry submitted successfully! We will contact you soon.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl container-padding">
        <Breadcrumbs items={[{ label: "Bus Booking" }]} />
        <SectionHeader title="Book Bus Tickets" description="Comfortable bus travel across India with multiple operator options." align="left" className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Route & Date */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>From City *</Label>
                  <Input placeholder="e.g. Mumbai" {...register("from")} />
                  {errors.from && <p className="text-xs text-destructive">{errors.from.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>To City *</Label>
                  <Input placeholder="e.g. Goa" {...register("to")} />
                  {errors.to && <p className="text-xs text-destructive">{errors.to.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Travel Date *</Label>
                  <Input type="date" {...register("travelDate")} />
                </div>
                <div className="space-y-2">
                  <Label>Bus Type *</Label>
                  <Select value={watch("busType") || "AC_SLEEPER"} onValueChange={(v) => setValue("busType", (v ?? "AC_SLEEPER") as BusFormData["busType"])}>
                    <SelectTrigger><SelectValue placeholder="Select bus type" /></SelectTrigger>
                    <SelectContent>
                      {BUS_TYPE_OPTIONS.map((b) => (
                        <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Bus (optional)</Label>
                  <Input placeholder="e.g. VRL Travels, KSRTC" {...register("preferredBus")} />
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
                        <Label>Seat/Berth Preference (optional)</Label>
                        <Input placeholder="e.g. Window, Lower, Upper" {...register(`passengers.${index}.berthPreference`)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <><Bus className="size-4" /> Enquire Now</>}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">Multiple operators · Live tracking · 24/7 support</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}