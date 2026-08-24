"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Search, Calendar, Users, Wallet, Loader2, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { searchEnquirySchema, type SearchEnquiryFormData } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { z } from "zod";

type SearchEnquiryFormInput = z.input<typeof searchEnquirySchema>;

export function SearchForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SearchEnquiryFormInput, unknown, SearchEnquiryFormData>({
    resolver: zodResolver(searchEnquirySchema),
    defaultValues: { travellers: 2, tripType: "mixed" },
  });

  const onSubmit = async (data: SearchEnquiryFormData) => {
    setLoading(true);
    try {
      await enquiryApi.submit({
        name: "Website Enquiry",
        email: "enquiry@comforttravels.com",
        phone: "0000000000",
        destination: data.destination,
        travellers: data.travellers,
        travelDate: data.startDate,
        budget: data.budget,
        message: `Trip type: ${data.tripType}. Dates: ${data.startDate} to ${data.endDate}. Travellers: ${data.travellers}`,
        type: "general",
      });
      toast.success("Enquiry submitted! Our team will contact you shortly.");
      reset();
    } catch {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-white/20 bg-card/95 shadow-2xl backdrop-blur-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Plane className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Plan Your Trip</CardTitle>
            <CardDescription>Get a personalised quote in minutes</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="packages">
          <TabsList className="mb-6 grid h-auto w-full grid-cols-3 rounded-xl bg-muted p-1">
            <TabsTrigger value="packages" className="rounded-lg py-2 text-xs sm:text-sm">
              Packages
            </TabsTrigger>
            <TabsTrigger value="inspire" className="rounded-lg py-2 text-xs sm:text-sm">
              Inspire Me
            </TabsTrigger>
            <TabsTrigger value="custom" className="rounded-lg py-2 text-xs sm:text-sm">
              Custom Trip
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TabsContent value="packages" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="destination" placeholder="Where would you like to go?" className="pl-9" {...register("destination")} />
                  </div>
                  {errors.destination && <p className="text-xs text-destructive">{errors.destination.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="startDate" type="date" className="pl-9" {...register("startDate")} />
                  </div>
                  {errors.startDate && <p className="text-xs text-destructive">{errors.startDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="endDate" type="date" className="pl-9" {...register("endDate")} />
                  </div>
                  {errors.endDate && <p className="text-xs text-destructive">{errors.endDate.message}</p>}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="travellers">Travellers</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="travellers" type="number" min={1} max={50} className="pl-9" {...register("travellers")} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inspire" className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Trip Type</Label>
                  <Select defaultValue="mixed" onValueChange={(v) => setValue("tripType", v as SearchEnquiryFormData["tripType"])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relaxation">Relaxation</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="sightseeing">Sightseeing</SelectItem>
                      <SelectItem value="mixed">A bit of everything</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (INR)</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="budget" placeholder="e.g. 50,000" className="pl-9" {...register("budget")} />
                  </div>
                </div>
              </div>
              <Input placeholder="Preferred destination (optional)" {...register("destination")} />
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <p className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
                Tell us about your dream trip and we&apos;ll craft a personalised itinerary just for you.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Destination" {...register("destination")} />
                <Input type="number" placeholder="Number of travellers" {...register("travellers")} />
                <Input type="date" {...register("startDate")} />
                <Input type="date" {...register("endDate")} />
              </div>
            </TabsContent>

            <Separator className="my-6" />

            <Button type="submit" className="w-full gap-2 rounded-xl" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Search className="size-4" />
                  Enquire Now
                </>
              )}
            </Button>
          </form>
        </Tabs>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Best price guarantee · Free cancellation · 24/7 support
        </p>
      </CardContent>
    </Card>
  );
}
