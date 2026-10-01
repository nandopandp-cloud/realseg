"use client";

import { useRef } from "react";
import type { Metric } from "@/data/metrics";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const fmt = (n: number, pad = 0) => Math.round(n).toLocaleString("pt-BR").padStart(pad, "0");

export function MetricCard({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const Icon = metric.icon;
  const final = metric.static ?? fmt(metric.value ?? 0, metric.pad);

  useGSAP(
    () => {
      if (metric.static || metric.value == null) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const obj = { v: 0 };
        if (num.current) num.current.textContent = fmt(0, metric.pad);
        gsap.to(obj, {
          v: metric.value,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          onUpdate: () => {
            if (num.current) num.current.textContent = fmt(obj.v, metric.pad);
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-reveal className="group flex items-center gap-4 px-2 py-6 md:px-6">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 text-accent transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-[0_0_24px_-6px_rgb(0_230_209/0.8)]">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <div>
        <p className="text-3xl font-extrabold tracking-tight text-fg tabular-nums md:text-4xl">
          {metric.prefix}
          <span ref={num}>{final}</span>
          {metric.suffix}
        </p>
        <p className="mt-1 text-[13px] text-muted">{metric.label}</p>
      </div>
    </div>
  );
}
