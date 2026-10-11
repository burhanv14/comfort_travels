import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeader } from "@/components/shared/section-header";
import { ContactForm } from "@/features/contact/components/contact-form";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Speak with travel experts for packages, bookings, and personalized itinerary planning.",
  path: "/contact",
});

export default function ContactRoute() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <SectionHeader
          align="left"
          title="Let Us Plan Your Next Journey"
          description="Tell us what you need and our travel experts will get back within 24 hours."
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-xl">What happens next?</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="inline-flex items-center gap-2">Your enquiry will be sent & reviewed by our team. We will get back to you within 24 hours. In case of any delay or last moment emergencies, we will contact you as soon as possible or inform you about the same via email or phone.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
