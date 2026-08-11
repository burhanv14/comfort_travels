"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <Card className="h-full border-0 shadow-md">
      <CardContent className="flex h-full flex-col p-6">
        <Quote className="size-8 text-primary/30" aria-hidden="true" />
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.content}&rdquo;
        </p>
        <div className="mt-6 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-3.5 ${i < testimonial.rating ? "fill-accent text-accent" : "text-muted"}`}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 border-t pt-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.tripType} · {testimonial.location}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
