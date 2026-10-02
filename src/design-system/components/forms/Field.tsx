"use client";

import { useId, type ReactNode } from "react";
import { CircleCheck, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type FieldState = { id: string; describedBy?: string; invalid: boolean; valid: boolean; disabled?: boolean };

/**
 * Field: rótulo, dica, erro e sucesso conectados ao controle por ARIA.
 * Todo controle de formulário do sistema usa este wrapper.
 */
export function Field({
  label,
  hint,
  error,
  success,
  required,
  disabled,
  className,
  hideLabel,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  success?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  hideLabel?: boolean;
  children: (f: FieldState) => ReactNode;
}) {
  const id = useId();
  const msgId = `${id}-msg`;
  const message = error || (typeof success === "string" ? success : undefined) || hint;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn("type-label-md text-fg-secondary", hideLabel && "sr-only", disabled && "text-disabled")}
      >
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-cyan">
            *
          </span>
        )}
      </label>
      {children({
        id,
        describedBy: message ? msgId : undefined,
        invalid: !!error,
        valid: !!success && !error,
        disabled,
      })}
      {message && (
        <p
          id={msgId}
          className={cn(
            "type-label-sm flex items-center gap-1.5 font-medium",
            error ? "text-critical" : success ? "text-success" : "text-muted",
          )}
        >
          {error && <CircleAlert aria-hidden className="size-3.5" />}
          {!error && success && <CircleCheck aria-hidden className="size-3.5" />}
          {message}
        </p>
      )}
    </div>
  );
}

/** Classes da "caixa" compartilhadas por input, select, textarea, combobox. */
export function controlBox({ invalid, valid, disabled }: { invalid?: boolean; valid?: boolean; disabled?: boolean }) {
  return cn(
    "group/ctl relative flex w-full items-center gap-3 rounded-rs-sm border bg-canvas/70 px-4 text-fg",
    "transition-[border-color,box-shadow,background-color] duration-(--rs-duration-fast) ease-rs-standard",
    "focus-within:border-cyan focus-within:bg-canvas focus-within:shadow-[0_0_0_3px_rgb(0_230_209/0.12),var(--rs-glow-sm)]",
    invalid
      ? "border-critical/70 focus-within:border-critical focus-within:shadow-[0_0_0_3px_rgb(255_92_103/0.14)]"
      : valid
        ? "border-success/60"
        : "border-line hover:border-line-strong",
    disabled && "pointer-events-none border-line-subtle bg-panel/30 text-disabled",
  );
}

export const controlInput =
  "h-full min-w-0 flex-1 bg-transparent type-body-md text-fg outline-none placeholder:text-subtle disabled:cursor-not-allowed [color-scheme:dark]";
