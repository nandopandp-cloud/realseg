"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type MenuItem =
  | { type?: "item"; label: string; icon?: ReactNode; shortcut?: string; danger?: boolean; onSelect?: () => void }
  | { type: "separator" }
  | { type: "label"; label: string };

/**
 * Dropdown Menu (role="menu").
 * Teclado: Enter/Espaço/↓ abre · ↑ ↓ navegam · Home/End · Esc fecha e devolve o foco.
 */
export function Menu({
  label,
  items,
  align = "start",
  trigger,
  className,
}: {
  label: string;
  items: MenuItem[];
  align?: "start" | "end";
  trigger?: ReactNode;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const focusables = () => Array.from(list.current?.querySelectorAll<HTMLButtonElement>("[role=menuitem]") ?? []);

  useEffect(() => {
    if (!open) return;
    focusables()[0]?.focus();
    const onDoc = (e: PointerEvent) => {
      if (!list.current?.contains(e.target as Node) && !btn.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [open]);

  const close = () => {
    setOpen(false);
    btn.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const els = focusables();
    const i = els.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      els[(i + 1) % els.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      els[(i - 1 + els.length) % els.length]?.focus();
    } else if (e.key === "Home") els[0]?.focus();
    else if (e.key === "End") els.at(-1)?.focus();
    else if (e.key === "Escape" || e.key === "Tab") close();
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        ref={btn}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === "ArrowDown" && (e.preventDefault(), setOpen(true))}
        className={cn(
          "rs-focus inline-flex h-10 items-center gap-2 rounded-rs-sm border px-4 text-[13px] font-semibold transition-[border-color,color,background-color] duration-(--rs-duration-fast)",
          open ? "border-cyan text-fg" : "border-line text-fg-secondary hover:border-line-strong hover:text-fg",
        )}
      >
        {trigger ?? label}
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-(--rs-duration-normal)", open && "rotate-180 text-cyan")}
        />
      </button>
      {open && (
        <div
          ref={list}
          id={id}
          role="menu"
          aria-label={label}
          onKeyDown={onKey}
          className={cn(
            "absolute top-[calc(100%+6px)] z-(--rs-z-interaction) min-w-56 animate-rs-fade rounded-rs-md border border-line bg-elevated p-1.5 shadow-rs-md",
            align === "end" ? "right-0" : "left-0",
          )}
        >
          {items.map((it, i) => {
            if (it.type === "separator") return <div key={i} role="separator" className="my-1.5 h-px bg-line-subtle" />;
            if (it.type === "label")
              return (
                <p key={i} className="type-micro px-3 pb-1 pt-2 text-[10px] text-subtle">
                  {it.label}
                </p>
              );
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  it.onSelect?.();
                  close();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-rs-sm px-3 py-2.5 text-left type-body-sm outline-none transition-colors duration-(--rs-duration-fast)",
                  it.danger
                    ? "text-critical hover:bg-critical/10 focus:bg-critical/10"
                    : "text-fg-secondary hover:bg-panel hover:text-fg focus:bg-panel focus:text-fg",
                )}
              >
                {it.icon && <span className="shrink-0 text-muted">{it.icon}</span>}
                <span className="flex-1">{it.label}</span>
                {it.shortcut && <span className="font-data text-[10px] text-subtle">{it.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
