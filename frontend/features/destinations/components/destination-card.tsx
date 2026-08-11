"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="card-hover overflow-hidden border-0 shadow-md">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={destination.coverImage}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <Badge variant="secondary" className="mb-2 bg-white/20 text-white backdrop-blur-sm">
              {destination.packageCount} Packages
            </Badge>
            <h3 className="text-xl font-bold">{destination.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/80">
              <MapPin className="size-3.5" />
              {destination.country}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
