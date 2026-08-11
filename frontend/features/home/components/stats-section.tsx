import { STATS } from "@/lib/constants";

export function StatsSection() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto max-w-7xl container-padding">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
