"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeader } from "@/components/shared/section-header";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import { testimonials } from "@/data/mock/testimonials";

export function TestimonialsSection() {
  const featured = testimonials.filter((t) => t.featured);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl container-padding">
        <SectionHeader
          label="Testimonials"
          title="What People Say"
          description="Real stories from travellers who trusted us with their dream vacations."
        />
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {featured.map((t) => (
              <CarouselItem key={t.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <TestimonialCard testimonial={t} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
