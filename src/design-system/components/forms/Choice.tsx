"use client";

import { useId, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Base = Omit<ComponentPropsWithoutRef<"input">, "type" | "size"> & { label: ReactNode; description?: string };

/** Checkbox nativo (acessível) com visual da marca. Suporta `indeterminate`. */
export function Checkbox({
  label,
  description,
  className,
  indeterminate,
  disabled,
  ...rest
}: Base & { indeterminate?: boolean }) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn(
        "group flex cursor-pointer items-start gap-3",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          ref={(el) => {
            if (el) el.indeterminate = !!indeterminate;
          }}
          className="peer absolute inset-0 cursor-pointer appearance-none rounded-rs-xs border border-line-strong bg-canvas transition-[background-color,border-color,box-shadow] duration-(--rs-duration-fast) checked:border-cyan checked:bg-cyan indeterminate:border-cyan indeterminate:bg-cyan hover:border-cyan/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-not-allowed"
          {...rest}
        />
        <Check
          aria-hidden
          strokeWidth={3}
          className="pointer-events-none relative size-3.5 scale-50 text-inverse opacity-0 transition-[opacity,transform] duration-(--rs-duration-fast) peer-checked:scale-100 peer-checked:opacity-100 peer-indeterminate:opacity-0"
        />
        <Minus
          aria-hidden
          strokeWidth={3}
          className="pointer-events-none absolute size-3.5 text-inverse opacity-0 peer-indeterminate:opacity-100"
        />
      </span>
      <span className="min-w-0">
        <span className="type-label-lg block font-medium text-fg">{label}</span>
        {description && <span className="type-body-sm block text-muted">{description}</span>}
      </span>
    </label>
  );
}

/** Grupo de rádios com fieldset/legend. */
export function RadioGroup({
  legend,
  name,
  options,
  defaultValue,
  value,
  onChange,
  orientation = "vertical",
  className,
}: {
  legend: string;
  name: string;
  options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  return (
    <fieldset className={className}>
      <legend className="type-label-md mb-3 text-fg-secondary">{legend}</legend>
      <div className={cn("flex gap-3", orientation === "vertical" ? "flex-col" : "flex-wrap gap-x-6")}>
        {options.map((o) => (
          <label
            key={o.value}
            className={cn("group flex cursor-pointer items-start gap-3", o.disabled && "cursor-not-allowed opacity-50")}
          >
            <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
              <input
                type="radio"
                name={name}
                value={o.value}
                disabled={o.disabled}
                checked={current === o.value}
                onChange={() => {
                  setInternal(o.value);
                  onChange?.(o.value);
                }}
                className="peer absolute inset-0 cursor-pointer appearance-none rounded-full border border-line-strong bg-canvas transition-[border-color,box-shadow] duration-(--rs-duration-fast) checked:border-cyan checked:shadow-glow-sm hover:border-cyan/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              />
              <span className="pointer-events-none relative size-2.5 scale-0 rounded-full bg-cyan transition-transform duration-(--rs-duration-normal) ease-rs-standard peer-checked:scale-100" />
            </span>
            <span>
              <span className="type-label-lg block font-medium text-fg">{o.label}</span>
              {o.description && <span className="type-body-sm block text-muted">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Switch (role="switch"). Para ativar/desativar efeitos imediatos. */
export function Switch({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
}: {
  label: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  className?: string;
}) {
  const id = useId();
  const [internal, setInternal] = useState(!!defaultChecked);
  const on = checked ?? internal;
  return (
    <div className={cn("flex items-start justify-between gap-4", disabled && "opacity-50", className)}>
      <label htmlFor={id} className="min-w-0 cursor-pointer">
        <span className="type-label-lg block font-medium text-fg">{label}</span>
        {description && <span className="type-body-sm block text-muted">{description}</span>}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={() => {
          setInternal(!on);
          onChange?.(!on);
        }}
        className={cn(
          "rs-focus rs-hit relative h-6 w-11 shrink-0 rounded-full border transition-[background-color,border-color,box-shadow] duration-(--rs-duration-normal) ease-rs-standard",
          on ? "border-cyan bg-cyan shadow-glow-sm" : "border-line-strong bg-panel",
        )}
      >
        <span
          className={cn(
            "absolute left-[2px] top-[2px] size-[18px] rounded-full transition-[translate,background-color] duration-(--rs-duration-normal) ease-rs-standard",
            on ? "translate-x-5 bg-inverse" : "translate-x-0 bg-muted",
          )}
        />
      </button>
    </div>
  );
}

/** Slider (range). Input nativo invisível sobre trilho desenhado: acessível e preciso. */
export function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  format = (v: number) => `${v}%`,
  className,
}: {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (v: number) => void;
  format?: (v: number) => string;
  className?: string;
}) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const v = value ?? internal;
  const pct = ((v - min) / (max - min)) * 100;
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="type-label-md text-fg-secondary">
          {label}
        </label>
        <output htmlFor={id} className="font-data text-xs text-fg tabular-nums">
          {format(v)}
        </output>
      </div>
      <div className="group relative h-5">
        <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/[0.08]" />
        <span
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_rgb(0_230_209/0.5)]"
          style={{ width: `${pct}%` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan bg-canvas transition-transform duration-(--rs-duration-fast) group-hover:scale-110 group-has-[:focus-visible]:ring-4 group-has-[:focus-visible]:ring-cyan/25"
          style={{ left: `${pct}%` }}
        />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          aria-valuetext={format(v)}
          onChange={(e) => {
            setInternal(Number(e.target.value));
            onChange?.(Number(e.target.value));
          }}
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}
