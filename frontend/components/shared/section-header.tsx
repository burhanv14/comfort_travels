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
    <div className={cn("mb-14", align === "center" && "text-center", className)}>
      {label && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-muted-foreground md:text-lg",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent",
          align === "center" && "mx-auto"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
