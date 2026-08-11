"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Train } from "lucide-react";
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

export function TrainBookingPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TrainFormInput, unknown, TrainFormData>({
    resolver: zodResolver(trainBookingSchema),
    defaultValues: { passengers: 1, class: "sleeper" },
  });

  const onSubmit = async (data: TrainFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: "train",
        travellers: data.passengers,
        travelDate: data.travelDate,
        message: `Train: ${data.from} to ${data.to}, Class: ${data.class}, Date: ${data.travelDate}`,
      });
      toast.success("Train enquiry submitted!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl container-padding">
        <Breadcrumbs items={[{ label: "Train Booking" }]} />
        <SectionHeader title="Book Train Tickets" description="Seamless rail reservations across India." align="left" className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                  <Label>Class</Label>
                  <Select defaultValue="sleeper" onValueChange={(v) => setValue("class", v as TrainFormData["class"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sleeper">Sleeper</SelectItem>
                      <SelectItem value="ac-3">AC 3 Tier</SelectItem>
                      <SelectItem value="ac-2">AC 2 Tier</SelectItem>
                      <SelectItem value="ac-1">AC 1 Tier</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Passengers</Label>
                  <Input type="number" min={1} max={6} {...register("passengers")} />
                </div>
              </div>
              <hr />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2"><Label>Name *</Label><Input {...register("name")} /></div>
                <div className="space-y-2"><Label>Email *</Label><Input type="email" {...register("email")} /></div>
                <div className="space-y-2"><Label>Phone *</Label><Input type="tel" {...register("phone")} /></div>
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
