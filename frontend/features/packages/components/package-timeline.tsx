import { Check } from "lucide-react";
import type { ItineraryDay } from "@/types";

interface PackageTimelineProps {
  itinerary: ItineraryDay[];
}

export function PackageTimeline({ itinerary }: PackageTimelineProps) {
  return (
    <div className="relative space-y-0">
      {itinerary.map((day, index) => (
        <div key={day.day} className="relative flex gap-6 pb-8 last:pb-0">
          {index < itinerary.length - 1 && (
            <div className="absolute left-[15px] top-8 h-full w-0.5 bg-border" aria-hidden="true" />
          )}
          <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {day.day}
          </div>
          <div className="flex-1 pb-2">
            <h4 className="font-semibold">{day.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{day.description}</p>
            <ul className="mt-3 space-y-1.5">
              {day.activities.map((activity) => (
                <li key={activity} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
