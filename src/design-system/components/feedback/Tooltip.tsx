"use client";

import { cloneElement, isValidElement, useId, useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Tooltip leve: fundo escuro, texto claro, acento cyan.
 * Abre no hover e no foco; fecha com Esc. Conteúdo curto — nunca informação essencial.
 */
export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: {
  content: ReactNode;
  children: ReactElement<Record<string, unknown>>;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);

  const pos = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
  }[side];

  const trigger = isValidElement(children)
    ? cloneElement(children, { "aria-describedby": open ? id : undefined })
    : children;

  return (
    <span
      className="relative inline-flex"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      {trigger}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-(--rs-z-tooltip) w-max max-w-64 rounded-rs-sm border border-line bg-panel px-3 py-2 type-body-sm text-[13px] leading-snug text-fg shadow-rs-md",
          "transition-[opacity,transform] duration-(--rs-duration-normal) ease-rs-standard",
          open ? "opacity-100" : "opacity-0",
          pos,
          className,
        )}
      >
        <span aria-hidden className="absolute left-0 top-0 h-px w-6 bg-cyan" />
        {content}
      </span>
    </span>
  );
}
