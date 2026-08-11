import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap = { sm: "size-4", md: "size-8", lg: "size-12" };

export function Loader({ className, size = "md", label = "Loading..." }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)} role="status" aria-label={label}>
      <Loader2 className={cn("animate-spin text-primary", sizeMap[size])} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader size="lg" />
    </div>
  );
}
