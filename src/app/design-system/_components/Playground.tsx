"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

/** Layout padrão de playground: preview à esquerda, controles à direita, código abaixo. */
export function PlaygroundFrame({
  title = "Playground",
  preview,
  controls,
  code,
  previewClassName,
}: {
  title?: string;
  preview: ReactNode;
  controls: ReactNode;
  code: string;
  previewClassName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-rs-lg border border-cyan/25 bg-section shadow-[0_30px_80px_-50px_rgb(0_230_209/0.5)]">
      <div className="flex items-center justify-between border-b border-line-subtle px-4 py-2.5">
        <span className="type-micro flex items-center gap-2 text-[9px] text-cyan">
          <span className="size-1.5 animate-rs-pulse rounded-full bg-cyan" /> {title}
        </span>
        <span className="font-data text-[10px] text-subtle">live</span>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className={cn("relative grid min-h-64 place-items-center overflow-hidden p-8", previewClassName)}>
          <div aria-hidden className="rs-grid rs-mask-radial pointer-events-none absolute inset-0" />
          <div className="relative">{preview}</div>
        </div>
        <div className="space-y-5 border-t border-line-subtle bg-canvas/40 p-5 lg:border-l lg:border-t-0">
          {controls}
        </div>
      </div>
      <CodeBlock code={code} flush />
    </div>
  );
}

/** Controle segmentado acessível (radiogroup). */
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[] | Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
}) {
  const opts = (options as Array<T | { value: T; label: string }>).map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="type-micro mb-2 text-[9px] text-subtle">{label}</p>
      <div className="flex flex-wrap gap-1 rounded-rs-sm border border-line bg-canvas/60 p-1">
        {opts.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              "rs-focus h-8 flex-1 rounded-rs-xs px-2.5 text-[12px] font-semibold capitalize transition-colors duration-(--rs-duration-fast)",
              value === o.value
                ? "bg-panel text-cyan shadow-[inset_0_0_0_1px_var(--rs-border-strong)]"
                : "text-muted hover:text-fg",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
