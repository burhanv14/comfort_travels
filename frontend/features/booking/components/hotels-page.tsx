"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Building2 } from "lucide-react";
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
  const { register, handleSubmit, formState: { errors } } = useForm<HotelFormInput, unknown, HotelFormData>({
    resolver: zodResolver(hotelBookingSchema),
    defaultValues: { rooms: 1, adults: 2, children: 0 },
  });

  const onSubmit = async (data: HotelFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: "hotel",
        travellers: data.adults + data.children,
        message: `Hotel in ${data.city}, Check-in: ${data.checkIn}, Check-out: ${data.checkOut}, Rooms: ${data.rooms}`,
      });
      toast.success("Hotel enquiry submitted!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl container-padding">
        <Breadcrumbs items={[{ label: "Hotels" }]} />
        <SectionHeader title="Hotel Reservations" description="Handpicked stays from boutique gems to luxury resorts." align="left" className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                <div className="space-y-2">
                  <Label>Adults</Label>
                  <Input type="number" min={1} {...register("adults")} />
                </div>
                <div className="space-y-2">
                  <Label>Children</Label>
                  <Input type="number" min={0} {...register("children")} />
                </div>
              </div>
              <hr />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2"><Label>Name *</Label><Input {...register("name")} /></div>
                <div className="space-y-2"><Label>Email *</Label><Input type="email" {...register("email")} /></div>
                <div className="space-y-2"><Label>Phone *</Label><Input type="tel" {...register("phone")} /></div>
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
