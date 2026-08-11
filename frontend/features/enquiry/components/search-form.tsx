"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Search, Calendar, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { searchEnquirySchema, type SearchEnquiryFormData } from "@/lib/validations/schemas";
import { enquiryApi } from "@/lib/api";
import { Loader2 } from "lucide-react";
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
    <div className="w-full max-w-4xl rounded-2xl bg-card p-6 shadow-2xl backdrop-blur-sm md:p-8">
      <Tabs defaultValue="packages">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="inspire">Inspire Me</TabsTrigger>
          <TabsTrigger value="custom">Custom Trip</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TabsContent value="packages" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="destination" placeholder="Where to?" className="pl-9" {...register("destination")} />
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
              <div className="space-y-2">
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
                  <Input id="budget" placeholder="e.g. 50000" className="pl-9" {...register("budget")} />
                </div>
              </div>
            </div>
            <Input placeholder="Preferred destination (optional)" {...register("destination")} />
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tell us about your dream trip and we&apos;ll craft a personalised itinerary just for you.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Destination" {...register("destination")} />
              <Input type="number" placeholder="Number of travellers" {...register("travellers")} />
              <Input type="date" {...register("startDate")} />
              <Input type="date" {...register("endDate")} />
            </div>
          </TabsContent>

          <Button type="submit" className="mt-6 w-full sm:w-auto" size="lg" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 size-4 animate-spin" /> Submitting...</> : "Enquire Now"}
          </Button>
        </form>
      </Tabs>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Best price guarantee · Free cancellation · 24/7 support
      </p>
    </div>
  );
}
