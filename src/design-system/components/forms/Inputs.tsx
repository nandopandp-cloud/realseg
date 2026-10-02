"use client";

import { useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Calendar, ChevronDown, CircleAlert, CircleCheck, Eye, EyeOff, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field, controlBox, controlInput } from "@/design-system/components/forms/Field";
import { Kbd } from "@/design-system/components/primitives/Indicators";

type BaseField = {
  label: string;
  hint?: string;
  error?: string;
  success?: string | boolean;
  hideLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
};

type InputProps = BaseField &
  Omit<ComponentPropsWithoutRef<"input">, "size" | "className"> & {
    icon?: ReactNode;
    trailing?: ReactNode;
  };

const h = { sm: "h-10", md: "h-12" };

export function Input({
  label,
  hint,
  error,
  success,
  hideLabel,
  size = "md",
  className,
  icon,
  trailing,
  required,
  disabled,
  ...rest
}: InputProps) {
  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      success={success}
      required={required}
      disabled={disabled}
      hideLabel={hideLabel}
      className={className}
    >
      {(f) => (
        <div className={cn(controlBox(f), h[size])}>
          {icon && (
            <span
              className={cn(
                "shrink-0 text-muted transition-colors group-focus-within/ctl:text-cyan",
                f.invalid && "text-critical",
              )}
            >
              {icon}
            </span>
          )}
          <input
            id={f.id}
            aria-describedby={f.describedBy}
            aria-invalid={f.invalid || undefined}
            required={required}
            disabled={disabled}
            className={controlInput}
            {...rest}
          />
          {trailing}
          {!trailing && f.invalid && <CircleAlert aria-hidden className="size-4 shrink-0 text-critical" />}
          {!trailing && f.valid && <CircleCheck aria-hidden className="size-4 shrink-0 text-success" />}
        </div>
      )}
    </Field>
  );
}

export function PasswordInput(props: Omit<InputProps, "type" | "trailing">) {
  const [show, setShow] = useState(false);
  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      autoComplete={props.autoComplete ?? "current-password"}
      trailing={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={show}
          className="rs-focus rs-hit grid size-8 shrink-0 place-items-center rounded-rs-xs text-muted transition-colors hover:text-cyan"
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      }
    />
  );
}

export function SearchInput({
  shortcut = "⌘K",
  onClear,
  ...props
}: Omit<InputProps, "type" | "icon" | "trailing"> & { shortcut?: string | false; onClear?: () => void }) {
  const [value, setValue] = useState(String(props.defaultValue ?? ""));
  const controlled = props.value !== undefined;
  const current = controlled ? String(props.value) : value;
  return (
    <Input
      hideLabel
      {...props}
      type="search"
      value={current}
      onChange={(e) => {
        if (!controlled) setValue(e.target.value);
        props.onChange?.(e);
      }}
      icon={<Search className="size-4" />}
      trailing={
        current ? (
          <button
            type="button"
            aria-label="Limpar busca"
            onClick={() => {
              if (!controlled) setValue("");
              onClear?.();
            }}
            className="rs-focus rs-hit grid size-7 shrink-0 place-items-center rounded-rs-xs text-muted hover:text-fg"
          >
            <X className="size-4" />
          </button>
        ) : shortcut ? (
          <Kbd>{shortcut}</Kbd>
        ) : null
      }
      className={cn("[&_input::-webkit-search-cancel-button]:hidden", props.className)}
    />
  );
}

export function DateInput(props: Omit<InputProps, "type" | "icon">) {
  return (
    <Input
      {...props}
      type="date"
      icon={<Calendar className="size-4" />}
      className={cn(
        "[&_input::-webkit-calendar-picker-indicator]:opacity-0 [&_input::-webkit-calendar-picker-indicator]:absolute [&_input::-webkit-calendar-picker-indicator]:inset-0 [&_input::-webkit-calendar-picker-indicator]:w-full [&_input::-webkit-calendar-picker-indicator]:cursor-pointer",
        props.className,
      )}
    />
  );
}

export function Textarea({
  label,
  hint,
  error,
  success,
  hideLabel,
  className,
  required,
  disabled,
  maxLength,
  ...rest
}: BaseField & Omit<ComponentPropsWithoutRef<"textarea">, "className">) {
  const [count, setCount] = useState(String(rest.defaultValue ?? "").length);
  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      success={success}
      required={required}
      disabled={disabled}
      hideLabel={hideLabel}
      className={className}
    >
      {(f) => (
        <div className={cn(controlBox(f), "flex-col items-stretch py-3")}>
          <textarea
            id={f.id}
            aria-describedby={f.describedBy}
            aria-invalid={f.invalid || undefined}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            rows={4}
            onInput={(e) => setCount(e.currentTarget.value.length)}
            className={cn(controlInput, "resize-none leading-relaxed")}
            {...rest}
          />
          {maxLength && (
            <span className="self-end font-data text-[10px] text-subtle tabular-nums" aria-hidden>
              {count}/{maxLength}
            </span>
          )}
        </div>
      )}
    </Field>
  );
}

/** Select nativo estilizado — melhor acessibilidade e UX mobile. Para busca, use Combobox. */
export function Select({
  label,
  hint,
  error,
  success,
  hideLabel,
  size = "md",
  className,
  required,
  disabled,
  options,
  placeholder,
  icon,
  ...rest
}: BaseField &
  Omit<ComponentPropsWithoutRef<"select">, "className" | "size"> & {
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
    icon?: ReactNode;
  }) {
  const ref = useRef<HTMLSelectElement>(null);
  return (
    <Field
      label={label}
      hint={hint}
      error={error}
      success={success}
      required={required}
      disabled={disabled}
      hideLabel={hideLabel}
      className={className}
    >
      {(f) => (
        <div className={cn(controlBox(f), h[size], "pr-3")}>
          {icon && <span className="shrink-0 text-muted group-focus-within/ctl:text-cyan">{icon}</span>}
          <select
            ref={ref}
            id={f.id}
            aria-describedby={f.describedBy}
            aria-invalid={f.invalid || undefined}
            required={required}
            disabled={disabled}
            defaultValue={rest.value === undefined && rest.defaultValue === undefined && placeholder ? "" : undefined}
            className={cn(controlInput, "cursor-pointer appearance-none pr-6 [&>option]:bg-elevated")}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-3 size-4 text-muted transition-transform group-focus-within/ctl:text-cyan"
          />
        </div>
      )}
    </Field>
  );
}
