"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeader } from "@/components/shared/section-header";
import { flightBookingSchema } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { z } from "zod";

type FlightFormData = z.output<typeof flightBookingSchema>;
type FlightFormInput = z.input<typeof flightBookingSchema>;

export function FlightBookingPage() {
  const [loading, setLoading] = useState(false);
  const [tripType, setTripType] = useState<"round-trip" | "one-way" | "multi-city">("round-trip");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FlightFormInput, unknown, FlightFormData>({
    resolver: zodResolver(flightBookingSchema),
    defaultValues: { adults: 1, children: 0, infants: 0, class: "economy", tripType: "round-trip" },
  });

  const onSubmit = async (data: FlightFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: "flight",
        travellers: data.adults + data.children + data.infants,
        message: `Flight: ${data.from} to ${data.to}, ${tripType}, ${data.class}, Depart: ${data.departDate}${data.returnDate ? `, Return: ${data.returnDate}` : ""}`,
      });
      toast.success("Flight enquiry submitted!");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl container-padding">
        <Breadcrumbs items={[{ label: "Flight Booking" }]} />
        <SectionHeader title="Book Your Flights" description="Fast, simple, and reliable flight bookings with best fares." align="left" className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <Tabs value={tripType} onValueChange={(v) => { setTripType(v as typeof tripType); setValue("tripType", v as FlightFormData["tripType"]); }}>
              <TabsList className="mb-6">
                <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                <TabsTrigger value="one-way">One Way</TabsTrigger>
                <TabsTrigger value="multi-city">Multi-City</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>From *</Label>
                  <Input placeholder="Departure city" {...register("from")} />
                  {errors.from && <p className="text-xs text-destructive">{errors.from.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>To *</Label>
                  <Input placeholder="Destination" {...register("to")} />
                  {errors.to && <p className="text-xs text-destructive">{errors.to.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Departure Date *</Label>
                  <Input type="date" {...register("departDate")} />
                </div>
                {tripType === "round-trip" && (
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <Input type="date" {...register("returnDate")} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Adults</Label>
                  <Input type="number" min={1} {...register("adults")} />
                </div>
                <div className="space-y-2">
                  <Label>Children (2-12)</Label>
                  <Input type="number" min={0} {...register("children")} />
                </div>
                <div className="space-y-2">
                  <Label>Class</Label>
                  <Select defaultValue="economy" onValueChange={(v) => setValue("class", v as FlightFormData["class"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium-economy">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <hr />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input {...register("name")} />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" {...register("email")} />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input type="tel" {...register("phone")} />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <><Plane className="size-4" /> Enquire Now</>}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">Instant full refunds · 24/7 support</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
