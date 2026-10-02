import type { ReactNode } from "react";
import { Radar } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Empty state alinhado à identidade: grid sutil, ícone em lente, micro animação.
 * Título em micro uppercase (linguagem de sistema) + frase humana e direta.
 */
export function EmptyState({
  title = "Nenhum evento detectado",
  message = "Nenhum evento foi identificado neste período.",
  icon,
  action,
  className,
}: {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center overflow-hidden rounded-rs-lg border border-dashed border-line px-6 py-14 text-center",
        className,
      )}
    >
      <div aria-hidden className="rs-grid rs-mask-radial absolute inset-0 opacity-70" />
      <div className="relative grid size-20 place-items-center">
        <span aria-hidden className="absolute inset-0 rounded-full border border-line" />
        <span aria-hidden className="absolute inset-3 rounded-full border border-cyan/20" />
        <span
          aria-hidden
          className="absolute inset-0 animate-rs-pulse rounded-full border border-cyan/30 [animation-duration:3.2s]"
        />
        <span className="relative text-cyan">{icon ?? <Radar className="size-7" strokeWidth={1.5} />}</span>
      </div>
      <p className="type-micro relative mt-6 text-fg">{title}</p>
      <p className="type-body-sm relative mt-2 max-w-sm text-muted">{message}</p>
      {action && <div className="relative mt-6">{action}</div>}
    </div>
  );
}
