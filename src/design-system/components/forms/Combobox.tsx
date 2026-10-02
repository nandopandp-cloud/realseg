"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Field, controlBox, controlInput } from "@/design-system/components/forms/Field";

type Option = { value: string; label: string; meta?: string };

/**
 * Combobox (padrão ARIA 1.2): campo com busca + lista.
 * Teclado: ↑ ↓ navegam, Enter seleciona, Esc fecha, Home/End.
 */
export function Combobox({
  label,
  options,
  value,
  onChange,
  placeholder = "Buscar…",
  hint,
  error,
  disabled,
  className,
  emptyMessage = "Nenhum resultado.",
}: {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  emptyMessage?: string;
}) {
  const listId = useId();
  const [internal, setInternal] = useState(value ?? "");
  const selected = value ?? internal;
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? "";
  const [query, setQuery] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = (query ?? "").trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
  }, [options, query]);

  useEffect(() => {
    const onDoc = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery(null);
      }
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  const choose = (o: Option) => {
    setInternal(o.value);
    onChange?.(o.value);
    setQuery(null);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(filtered.length - 1, open ? a + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(filtered.length - 1);
    else if (e.key === "Enter" && open && filtered[active]) {
      e.preventDefault();
      choose(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(null);
    }
  };

  return (
    <Field label={label} hint={hint} error={error} disabled={disabled} className={className}>
      {(f) => (
        <div ref={root} className="relative">
          <div className={cn(controlBox(f), "h-12 pr-3", open && "border-cyan")}>
            <input
              id={f.id}
              role="combobox"
              aria-expanded={open}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={open && filtered[active] ? `${listId}-${filtered[active].value}` : undefined}
              aria-describedby={f.describedBy}
              aria-invalid={f.invalid || undefined}
              disabled={disabled}
              placeholder={selectedLabel || placeholder}
              value={query ?? selectedLabel}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
                setActive(0);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={onKey}
              className={controlInput}
            />
            <ChevronDown
              aria-hidden
              className={cn(
                "size-4 text-muted transition-transform duration-(--rs-duration-normal)",
                open && "rotate-180 text-cyan",
              )}
            />
          </div>
          {open && (
            <ul
              id={listId}
              role="listbox"
              aria-label={label}
              className="rs-scrollbar absolute inset-x-0 top-[calc(100%+6px)] z-(--rs-z-interaction) max-h-64 animate-rs-fade overflow-auto rounded-rs-md border border-line bg-elevated p-1.5 shadow-rs-md"
            >
              {filtered.length === 0 && <li className="type-body-sm px-3 py-2.5 text-muted">{emptyMessage}</li>}
              {filtered.map((o, i) => (
                <li
                  key={o.value}
                  id={`${listId}-${o.value}`}
                  role="option"
                  aria-selected={o.value === selected}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => choose(o)}
                  onPointerMove={() => setActive(i)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-rs-sm px-3 py-2.5 type-body-sm transition-colors duration-(--rs-duration-fast)",
                    i === active ? "bg-panel text-fg" : "text-fg-secondary",
                  )}
                >
                  <span>
                    {o.label}
                    {o.meta && <span className="ml-2 font-data text-[10px] text-subtle">{o.meta}</span>}
                  </span>
                  {o.value === selected && <Check aria-hidden className="size-4 text-cyan" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Field>
  );
}
