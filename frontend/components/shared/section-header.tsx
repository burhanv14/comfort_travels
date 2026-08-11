import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ label, title, description, className, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {label && (
        <span className="mb-3 inline-block text-sm font-medium uppercase tracking-wider text-primary">
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && (
        <p className={cn("mt-4 text-muted-foreground", align === "center" && "mx-auto max-w-2xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
