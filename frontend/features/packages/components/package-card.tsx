"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Package } from "@/types";
import { formatPrice } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
  className?: string;
  variant?: "grid" | "list";
}

export function PackageCard({ pkg, className, variant = "grid" }: PackageCardProps) {
  if (variant === "list") {
    return (
      <Link href={`/packages/${pkg.slug}`} className={cn("group block", className)}>
        <Card className="card-hover overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="relative aspect-[16/10] w-full sm:aspect-auto sm:w-72 shrink-0">
              <Image src={pkg.coverImage} alt={pkg.title} fill className="object-cover" sizes="288px" />
            </div>
            <CardContent className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">{pkg.category}</Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="size-3.5 fill-accent text-accent" />
                    {pkg.rating} ({pkg.reviewCount})
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition-colors">{pkg.title}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {pkg.destination}
                  <span className="mx-1">·</span>
                  <Clock className="size-3.5" /> {pkg.duration}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{pkg.shortDescription}</p>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  {pkg.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{formatPrice(pkg.originalPrice)}</span>
                  )}
                  <p className="text-xl font-bold text-primary">{formatPrice(pkg.price)}</p>
                  <span className="text-xs text-muted-foreground">per person</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/packages/${pkg.slug}`} className={cn("group block", className)}>
      <Card className="card-hover overflow-hidden border-0 shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={pkg.coverImage}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {pkg.originalPrice && (
            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
              Save {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="capitalize text-xs">{pkg.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-accent text-accent" />
              {pkg.rating}
            </span>
          </div>
          <h3 className="mt-2 font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {pkg.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" /> {pkg.destination} · {pkg.duration}
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              {pkg.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{formatPrice(pkg.originalPrice)}</span>
              )}
              <p className="text-lg font-bold text-primary">{formatPrice(pkg.price)}</p>
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
