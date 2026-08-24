import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-brand-600 to-brand-800 py-20 text-primary-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 50%, white 0%, transparent 40%), radial-gradient(circle at 90% 50%, white 0%, transparent 35%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl container-padding">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl font-bold tracking-tight md:text-5xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
