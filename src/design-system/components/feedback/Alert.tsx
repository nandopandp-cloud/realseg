"use client";

import { useState, type ReactNode } from "react";
import { CircleCheck, Info, OctagonAlert, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertTone = "info" | "success" | "warning" | "critical";

const styles: Record<AlertTone, { box: string; icon: typeof Info; iconCls: string }> = {
  info: { box: "border-info/35 bg-info/[0.07]", icon: Info, iconCls: "text-info" },
  success: { box: "border-success/35 bg-success/[0.07]", icon: CircleCheck, iconCls: "text-success" },
  warning: { box: "border-warning/35 bg-warning/[0.07]", icon: TriangleAlert, iconCls: "text-warning" },
  critical: { box: "border-critical/45 bg-critical/[0.08]", icon: OctagonAlert, iconCls: "text-critical" },
};

/**
 * Alert: mensagem de sistema com ícone, título, mensagem e ação.
 * `critical` usa role="alert" (anunciado imediatamente). Use com parcimônia.
 */
export function Alert({
  tone = "info",
  title,
  children,
  action,
  dismissible,
  onDismiss,
  className,
}: {
  tone?: AlertTone;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const s = styles[tone];
  const Icon = s.icon;
  return (
    <div
      role={tone === "critical" ? "alert" : "status"}
      className={cn("relative flex gap-3 overflow-hidden rounded-rs-md border p-4 pr-12", s.box, className)}
    >
      {tone === "critical" && <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-critical" />}
      <Icon aria-hidden className={cn("mt-0.5 size-[18px] shrink-0", s.iconCls)} strokeWidth={1.75} />
      <div className="min-w-0 flex-1">
        <p className="type-label-lg text-fg">{title}</p>
        {children && <div className="type-body-sm mt-1 text-fg-secondary">{children}</div>}
        {action && <div className="mt-3 flex flex-wrap gap-2">{action}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Fechar alerta"
          onClick={() => {
            setOpen(false);
            onDismiss?.();
          }}
          className="rs-focus rs-hit absolute right-3 top-3 grid size-7 place-items-center rounded-rs-sm text-muted transition-colors hover:bg-white/5 hover:text-fg"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
