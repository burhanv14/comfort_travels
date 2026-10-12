"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plane, Plus, Minus } from "lucide-react";
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
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("round-trip");
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<FlightFormInput, unknown, FlightFormData>({
    resolver: zodResolver(flightBookingSchema),
    defaultValues: {
      tripType: "round-trip",
      class: "economy",
      freeCancellation: false,
      passengers: [{ name: "", email: "", phone: "", age: 18, sex: "M" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "passengers" });
  const passengerCount = fields.length;

  const onSubmit = async (data: FlightFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: data.passengers[0]?.name || "",
        email: data.passengers[0]?.email || "",
        phone: data.passengers[0]?.phone || "",
        type: "flight",
        from: data.from,
        to: data.to,
        tripType: data.tripType,
        departDate: data.departDate,
        returnDate: data.returnDate,
        class: data.class,
        freeCancellation: data.freeCancellation,
        passengers: data.passengers,
        travellers: data.passengers.length,
        travelDate: data.departDate,
      });
      toast.success("Flight enquiry submitted successfully! We will contact you soon.");
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-4xl container-padding">
        <Breadcrumbs items={[{ label: "Flight Booking" }]} />
        <SectionHeader title="Book Your Flights" description="Fast, simple, and reliable flight bookings with best fares." align="left" className="mb-8" />

        <Card>
          <CardContent className="p-6">
            <Tabs value={tripType} onValueChange={(v) => { setTripType(v as typeof tripType); setValue("tripType", v as FlightFormData["tripType"]); }}>
              <TabsList className="mb-6">
                <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                <TabsTrigger value="one-way">One Way</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Route & Dates */}
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
                    <Label>Return Date *</Label>
                    <Input type="date" {...register("returnDate")} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Class *</Label>
                  <Select value={watch("class") || "economy"} onValueChange={(v) => setValue("class", (v ?? "economy") as FlightFormData["class"])}>
                    <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="premium-economy">Premium Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <input type="checkbox" {...register("freeCancellation")} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    Free cancellation (optional)
                  </Label>
                </div>
              </div>

              <hr />

              {/* Passengers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Passenger Details</h3>
                  {passengerCount < 6 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", email: "", phone: "", age: 18, sex: "M" })} className="gap-1">
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
                        <Select value={watch(`passengers.${index}.sex`) || "M"} onValueChange={(v) => setValue(`passengers.${index}.sex`, (v ?? "M") as "M" | "F" | "O")}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                            <SelectItem value="O">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                {loading ? <Loader2 className="size-4 animate-spin" /> : <><Plane className="size-4" /> Enquire Now</>}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">24/7 support</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
