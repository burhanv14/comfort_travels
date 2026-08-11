"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Check, X, Star, Clock, MapPin, MessageCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Gallery } from "@/components/shared/gallery";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { PackageTimeline } from "@/features/packages/components/package-timeline";
import { PackageCard } from "@/features/packages/components/package-card";
import { EnquiryForm } from "@/features/enquiry/components/enquiry-form";
import { PageLoader } from "@/components/shared/loader";
import { ErrorState } from "@/components/shared/error-state";
import { packagesApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils/helpers";
import type { Package } from "@/types";

interface PackageDetailsProps {
  slug: string;
}

export function PackageDetails({ slug }: PackageDetailsProps) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const { data: pkg, isLoading, error, refetch } = useQuery({
    queryKey: ["package", slug],
    queryFn: () => packagesApi.getBySlug(slug),
  });

  const { data: related } = useQuery({
    queryKey: ["packages", "related", pkg?.destinationId],
    queryFn: () => packagesApi.getAll({ destination: pkg!.destinationId, limit: 4 }),
    enabled: !!pkg,
  });

  if (isLoading) return <PageLoader />;
  if (error || !pkg) return <ErrorState title="Package not found" onRetry={() => refetch()} />;

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <Breadcrumbs items={[
          { label: "Packages", href: "/packages" },
          { label: pkg.title },
        ]} />

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Gallery images={pkg.images} alt={pkg.title} />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="capitalize">{pkg.category}</Badge>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="size-4 fill-accent text-accent" />
                  {pkg.rating} ({pkg.reviewCount} reviews)
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-bold">{pkg.title}</h1>
              <p className="mt-2 flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="size-4" /> {pkg.destination}</span>
                <span className="flex items-center gap-1"><Clock className="size-4" /> {pkg.duration}</span>
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">{pkg.description}</p>
            </div>

            <Tabs defaultValue="itinerary">
              <TabsList>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent value="itinerary" className="mt-6">
                <PackageTimeline itinerary={pkg.itinerary} />
              </TabsContent>
              <TabsContent value="inclusions" className="mt-6">
                <ul className="space-y-2">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 text-primary shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="exclusions" className="mt-6">
                <ul className="space-y-2">
                  {pkg.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <X className="mt-0.5 size-4 text-destructive shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="faq" className="mt-6">
                <FAQAccordion faqs={pkg.faqs} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  {pkg.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">{formatPrice(pkg.originalPrice)}</p>
                  )}
                  <p className="text-3xl font-bold text-primary">{formatPrice(pkg.price)}</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>
                <Separator className="my-6" />
                <ul className="space-y-2 text-sm">
                  {pkg.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <Check className="size-3.5 text-primary" />{h}
                    </li>
                  ))}
                </ul>
                <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-6 w-full gap-2" size="lg">
                      <MessageCircle className="size-4" /> Enquire Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Enquire about {pkg.title}</DialogTitle>
                    </DialogHeader>
                    <EnquiryForm packageId={pkg.id} destination={pkg.destination} type="package" />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {related && related.data.length > 1 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Packages</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.data.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
