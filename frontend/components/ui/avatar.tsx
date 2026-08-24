"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl"
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

const sizeClasses = {
  sm: "size-8",
  default: "size-10",
  lg: "size-12",
  xl: "size-16",
}

function Avatar({ className, size = "default", src, alt, fallback, ...props }: AvatarProps) {
  return (
    <div
      data-slot="avatar"
      data-size={size}
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)]",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || "Avatar"}
          fill
          className="object-cover"
          sizes={sizeClasses[size].replace("size-", "") + "px"}
        />
      ) : (
        <div
          data-slot="avatar-fallback"
          className={cn(
            "flex size-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-glow)] text-white font-semibold",
            size === "sm" && "text-xs",
            size === "default" && "text-sm",
            size === "lg" && "text-base",
            size === "xl" && "text-lg"
          )}
        >
          {fallback}
        </div>
      )}
    </div>
  )
}
Avatar.displayName = "Avatar"

function AvatarImage({ className, src, alt, width, height, ...props }: Omit<React.ComponentProps<"img">, "src" | "width" | "height"> & { src: string; width?: number; height?: number }) {
  return (
    <Image
      src={src}
      alt={alt || "Avatar"}
      width={width}
      height={height}
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}
AvatarImage.displayName = "AvatarImage"

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-glow)] text-white font-semibold",
        className
      )}
      {...props}
    />
  )
}
AvatarFallback.displayName = "AvatarFallback"

function AvatarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-group"
      className={cn("group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[var(--color-bg)]", className)}
      {...props}
    />
  )
}
AvatarGroup.displayName = "AvatarGroup"

function AvatarGroupCount({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)] ring-2 ring-[var(--color-bg)]",
        className
      )}
      {...props}
    />
  )
}
AvatarGroupCount.displayName = "AvatarGroupCount"

function AvatarBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white ring-2 ring-[var(--color-bg)]",
        className
      )}
      {...props}
    />
  )
}
AvatarBadge.displayName = "AvatarBadge"

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}