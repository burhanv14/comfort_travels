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
    <Card className="h-full border border-border/60 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Quote className="size-5 text-primary" aria-hidden="true" />
        </div>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.content}&rdquo;
        </p>
        <div className="mt-5 flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-3.5 ${i < testimonial.rating ? "fill-accent text-accent" : "text-muted"}`}
            />
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-5">
          <Avatar className="size-10 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
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
