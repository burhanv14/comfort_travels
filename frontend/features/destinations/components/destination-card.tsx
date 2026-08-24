"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@/types";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

export function DestinationCard({ destination, className }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`} className={cn("group block", className)}>
      <Card className="card-hover overflow-hidden border border-border/60 shadow-md">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={destination.coverImage}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 transition-opacity duration-300 group-hover:from-black/90" />
          <div className="absolute right-4 top-4 flex size-9 translate-x-2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <Badge
              variant="secondary"
              className="mb-3 border-0 bg-white/15 text-white backdrop-blur-sm"
            >
              {destination.packageCount} Packages
            </Badge>
            <h3 className="font-heading text-xl font-bold transition-transform duration-300 group-hover:translate-x-1">
              {destination.name}
            </h3>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/75">
              <MapPin className="size-3.5" />
              {destination.country}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
