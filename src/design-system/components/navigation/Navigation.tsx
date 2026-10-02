"use client";

import Link from "next/link";
import { useId, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================== Tabs ============================== */

/**
 * Tabs (WAI-ARIA). Setas ← → movem o foco e ativam a aba; Home/End.
 * - underline: navegação de seções de conteúdo (padrão)
 * - segmented: alternância compacta de visualização / controles
 */
export function Tabs({
  tabs,
  defaultTab,
  value,
  onChange,
  variant = "underline",
  label,
  className,
}: {
  tabs: Array<{ id: string; label: string; content?: ReactNode; badge?: ReactNode }>;
  defaultTab?: string;
  value?: string;
  onChange?: (id: string) => void;
  variant?: "underline" | "segmented";
  label: string;
  className?: string;
}) {
  const uid = useId();
  const [internal, setInternal] = useState(defaultTab ?? tabs[0]?.id);
  const current = value ?? internal;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const select = (id: string) => {
    setInternal(id);
    onChange?.(id);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = tabs.length - 1;
    if (n >= 0) {
      e.preventDefault();
      refs.current[n]?.focus();
      select(tabs[n].id);
    }
  };
  const panel = tabs.find((t) => t.id === current);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "flex",
          variant === "underline"
            ? "gap-1 overflow-x-auto border-b border-line-subtle"
            : "inline-flex gap-1 rounded-rs-md border border-line bg-canvas/60 p-1",
        )}
      >
        {tabs.map((t, i) => {
          const sel = t.id === current;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${uid}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={sel}
              aria-controls={t.content ? `${uid}-panel-${t.id}` : undefined}
              tabIndex={sel ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "rs-focus relative inline-flex shrink-0 items-center gap-2 type-label-md transition-colors duration-(--rs-duration-fast)",
                variant === "underline" && cn("h-11 px-3", sel ? "text-cyan" : "text-muted hover:text-fg"),
                variant === "segmented" &&
                  cn(
                    "h-9 rounded-rs-sm px-3.5",
                    sel
                      ? "bg-panel text-fg shadow-[inset_0_0_0_1px_var(--rs-border-strong)]"
                      : "text-muted hover:text-fg",
                  ),
              )}
            >
              {t.label}
              {t.badge}
              {variant === "underline" && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-2 -bottom-px h-[2px] origin-center bg-cyan transition-transform duration-(--rs-duration-slow) ease-rs-standard",
                    sel ? "scale-x-100" : "scale-x-0",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
      {panel?.content && (
        <div
          key={panel.id}
          role="tabpanel"
          id={`${uid}-panel-${panel.id}`}
          aria-labelledby={`${uid}-tab-${panel.id}`}
          tabIndex={0}
          className="rs-focus animate-rs-fade pt-5"
        >
          {panel.content}
        </div>
      )}
    </div>
  );
}

/* ============================ Breadcrumb ============================ */

export function Breadcrumb({
  items,
  className,
}: {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}) {
  return (
    <nav aria-label="Você está em" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 type-label-md">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.label} className="flex items-center gap-1.5">
              {last || !it.href ? (
                <span aria-current={last ? "page" : undefined} className={last ? "text-cyan" : "text-muted"}>
                  {it.label}
                </span>
              ) : (
                <Link href={it.href} className="rs-focus rounded-rs-xs text-muted transition-colors hover:text-fg">
                  {it.label}
                </Link>
              )}
              {!last && <ChevronRight aria-hidden className="size-3.5 text-subtle" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ============================ Pagination ============================ */

function pages(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current - 1, current, current + 1]);
  const list = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: Array<number | "…"> = [];
  list.forEach((n, i) => {
    if (i && n - list[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

export function Pagination({
  total,
  page,
  defaultPage = 1,
  onChange,
  className,
}: {
  total: number;
  page?: number;
  defaultPage?: number;
  onChange?: (p: number) => void;
  className?: string;
}) {
  const [internal, setInternal] = useState(defaultPage);
  const current = page ?? internal;
  const go = (p: number) => {
    const n = Math.min(total, Math.max(1, p));
    setInternal(n);
    onChange?.(n);
  };
  const box =
    "rs-focus grid size-10 place-items-center rounded-rs-sm border text-[13px] font-semibold tabular-nums transition-[border-color,background-color,color] duration-(--rs-duration-fast)";
  return (
    <nav aria-label="Paginação" className={className}>
      <ul className="flex items-center gap-1.5">
        <li>
          <button
            type="button"
            aria-label="Página anterior"
            disabled={current === 1}
            onClick={() => go(current - 1)}
            className={cn(
              box,
              "border-line text-fg-secondary hover:border-cyan/60 hover:text-cyan disabled:opacity-40",
            )}
          >
            <ChevronLeft className="size-4" />
          </button>
        </li>
        {pages(current, total).map((p, i) => (
          <li key={`${p}-${i}`}>
            {p === "…" ? (
              <span className="grid size-10 place-items-center text-subtle">…</span>
            ) : (
              <button
                type="button"
                aria-label={`Página ${p}`}
                aria-current={p === current ? "page" : undefined}
                onClick={() => go(p)}
                className={cn(
                  box,
                  p === current
                    ? "border-cyan bg-cyan text-inverse"
                    : "border-line text-fg-secondary hover:border-line-strong hover:text-fg",
                )}
              >
                {p}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            type="button"
            aria-label="Próxima página"
            disabled={current === total}
            onClick={() => go(current + 1)}
            className={cn(
              box,
              "border-line text-fg-secondary hover:border-cyan/60 hover:text-cyan disabled:opacity-40",
            )}
          >
            <ChevronRight className="size-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

/* ============================== Sidebar ============================== */

export type SidebarGroup = {
  label?: string;
  items: Array<{ id: string; label: string; href: string; icon?: ReactNode; badge?: ReactNode }>;
};

/** Sidebar de produto/documentação. Item ativo: barra cyan + fundo panel. */
export function Sidebar({
  groups,
  active,
  header,
  footer,
  onNavigate,
  className,
}: {
  groups: SidebarGroup[];
  active?: string;
  header?: ReactNode;
  footer?: ReactNode;
  onNavigate?: (id: string) => void;
  className?: string;
}) {
  return (
    <aside className={cn("flex h-full flex-col border-r border-line-subtle bg-section/80", className)}>
      {header && <div className="border-b border-line-subtle p-5">{header}</div>}
      <nav aria-label="Seções" className="rs-scrollbar flex-1 overflow-y-auto px-3 py-5">
        {groups.map((g, gi) => (
          <div key={gi} className={cn(gi > 0 && "mt-6")}>
            {g.label && <p className="type-micro mb-2 px-3 text-[10px] text-subtle">{g.label}</p>}
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const on = it.id === active;
                return (
                  <li key={it.id}>
                    <Link
                      href={it.href}
                      onClick={() => onNavigate?.(it.id)}
                      aria-current={on ? "location" : undefined}
                      className={cn(
                        "rs-focus group relative flex min-h-9 items-center gap-3 rounded-rs-sm px-3 py-2 type-label-md font-medium transition-[background-color,color] duration-(--rs-duration-fast)",
                        on ? "bg-panel text-fg" : "text-muted hover:bg-white/[0.03] hover:text-fg",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 bg-cyan transition-transform duration-(--rs-duration-normal) ease-rs-standard",
                          on ? "scale-y-100" : "scale-y-0",
                        )}
                      />
                      {it.icon && (
                        <span
                          className={cn(
                            "shrink-0 transition-colors",
                            on ? "text-cyan" : "text-subtle group-hover:text-muted",
                          )}
                        >
                          {it.icon}
                        </span>
                      )}
                      <span className="flex-1 truncate">{it.label}</span>
                      {it.badge}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="border-t border-line-subtle p-4">{footer}</div>}
    </aside>
  );
}
