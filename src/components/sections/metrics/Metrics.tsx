import { metrics } from "@/data/metrics";
import { MetricCard } from "@/components/sections/metrics/MetricCard";

export function Metrics() {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-linear-to-b from-ink-900/80 to-ink-950">
      <h3 className="sr-only">RealSeg em números</h3>
      <div className="grid grid-cols-1 divide-y divide-white/[0.06] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {metrics.map((m) => (
          <MetricCard key={m.id} metric={m} />
        ))}
      </div>
    </div>
  );
}
