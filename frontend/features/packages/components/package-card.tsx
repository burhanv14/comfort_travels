"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
        <Card className="card-hover overflow-hidden border border-border/60">
          <div className="flex flex-col sm:flex-row">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-72">
              <Image
                src={pkg.coverImage}
                alt={pkg.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="288px"
              />
            </div>
            <CardContent className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {pkg.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="size-3.5 fill-accent text-accent" />
                    {pkg.rating} ({pkg.reviewCount})
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold transition-colors group-hover:text-primary">
                  {pkg.title}
                </h3>
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
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(pkg.originalPrice)}
                    </span>
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

  const discount =
    pkg.originalPrice && pkg.originalPrice > pkg.price
      ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
      : null;

  return (
    <Link href={`/packages/${pkg.slug}`} className={cn("group block", className)}>
      <Card className="card-hover overflow-hidden border border-border/60 shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={pkg.coverImage}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {discount && (
            <Badge className="absolute left-3 top-3 border-0 bg-accent text-accent-foreground shadow-md">
              {discount}% OFF
            </Badge>
          )}
          <div className="absolute bottom-3 right-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button size="icon-sm" variant="secondary" className="size-8 rounded-full shadow-lg" tabIndex={-1}>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="capitalize text-xs">
              {pkg.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Star className="size-3 fill-accent text-accent" />
              {pkg.rating}
            </span>
          </div>
          <h3 className="mt-2.5 line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-primary">
            {pkg.title}
          </h3>
          <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" /> {pkg.destination} · {pkg.duration}
          </p>
          <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-4">
            <div>
              {pkg.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(pkg.originalPrice)}
                </span>
              )}
              <p className="text-xl font-bold text-primary">{formatPrice(pkg.price)}</p>
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
