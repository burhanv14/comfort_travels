"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Building2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeader } from "@/components/shared/section-header";
import { hotelBookingSchema } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { z } from "zod";

type HotelFormData = z.output<typeof hotelBookingSchema>;
type HotelFormInput = z.input<typeof hotelBookingSchema>;

export function HotelsPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<HotelFormInput, unknown, HotelFormData>({
    resolver: zodResolver(hotelBookingSchema),
    defaultValues: {
      city: "",
      checkIn: "",
      checkOut: "",
      rooms: 1,
      passengers: [{ name: "", email: "", phone: "", age: 18, sex: "M" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "passengers" });
  const passengerCount = fields.length;

  const onSubmit = async (data: HotelFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: data.passengers[0]?.name || "",
        email: data.passengers[0]?.email || "",
        phone: data.passengers[0]?.phone || "",
        type: "hotel",
        city: data.city,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        rooms: data.rooms,
        passengers: data.passengers,
        travellers: data.passengers.length,
      });
      toast.success("Hotel enquiry submitted successfully! We will contact you soon.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl container-padding">
        <Breadcrumbs items={[{ label: "Hotels" }]} />
        <SectionHeader title="Hotel Reservations" description="Handpicked stays from boutique gems to luxury resorts." align="left" className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Basic details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label>City *</Label>
                  <Input placeholder="Where are you staying?" {...register("city")} />
                  {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Check-in *</Label>
                  <Input type="date" {...register("checkIn")} />
                </div>
                <div className="space-y-2">
                  <Label>Check-out *</Label>
                  <Input type="date" {...register("checkOut")} />
                </div>
                <div className="space-y-2">
                  <Label>Rooms</Label>
                  <Input type="number" min={1} max={10} {...register("rooms")} />
                </div>
              </div>

              <hr />

              {/* Passengers / Guests */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Guest Details</h3>
                  {passengerCount < 10 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", email: "", phone: "", age: 18, sex: "M" })} className="gap-1">
                      <Plus className="size-4" /> Add Guest
                    </Button>
                  )}
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-lg space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Guest {index + 1}</span>
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
                        <select {...register(`passengers.${index}.sex`)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:ring-2 focus:ring-ring/30">
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                          <option value="O">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <><Building2 className="size-4" /> Enquire Now</>}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">Best price guarantee · Free cancellation · 24/7 support</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
