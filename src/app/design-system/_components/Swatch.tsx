"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Amostra de cor com cópia do valor e do token. */
export function Swatch({
  name,
  token,
  value,
  use,
  size = "lg",
  accentName,
}: {
  name: string;
  token: string;
  value: string;
  use?: string;
  size?: "lg" | "sm";
  accentName?: boolean;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(v);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* noop */
    }
  };
  return (
    <div className="group">
      <button
        type="button"
        onClick={() => copy(value)}
        aria-label={`Copiar ${value}`}
        className={cn(
          "rs-focus relative w-full overflow-hidden rounded-rs-md border border-line transition-transform duration-(--rs-duration-normal) ease-rs-standard hover:-translate-y-0.5",
          size === "lg" ? "h-28" : "h-16",
        )}
        style={{ background: value }}
      >
        <span className="absolute bottom-2 right-2 grid size-7 place-items-center rounded-rs-xs bg-canvas/70 text-fg opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          {copied === value ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
        </span>
      </button>
      <p className={cn("type-label-lg mt-3 uppercase tracking-wide", accentName ? "text-cyan" : "text-fg")}>{name}</p>
      <button
        type="button"
        onClick={() => copy(`var(--rs-${token})`)}
        className="rs-focus mt-1 block rounded-rs-xs text-left font-data text-[11px] text-cyan hover:underline"
      >
        {copied === `var(--rs-${token})` ? "copiado ✓" : `--rs-${token}`}
      </button>
      <p className="mt-0.5 font-data text-[11px] text-muted">{value}</p>
      {use && <p className="type-body-sm mt-2 text-muted">{use}</p>}
    </div>
  );
}
