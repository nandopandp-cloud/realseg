"use client";

import { Fragment, useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ChevronRight, ChevronsUpDown, OctagonAlert, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/design-system/components/feedback/Loaders";
import { EmptyState } from "@/design-system/components/feedback/EmptyState";
import { Badge } from "@/design-system/components/feedback/Badge";
import { Button } from "@/design-system/components/primitives/Button";

export type Column<T> = {
  key: keyof T & string;
  header: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  /** Valor numérico / código: fonte de dados, tabular. */
  data?: boolean;
  width?: string;
  render?: (row: T) => ReactNode;
};

type State = "default" | "loading" | "empty" | "error";

/**
 * DataTable: legível em dark: zebra sutil, hover panel, seleção com barra cyan,
 * cabeçalho em micro uppercase, números tabulares.
 */
export function DataTable<T extends { id: string }>({
  columns,
  rows,
  caption,
  selectable,
  expandable,
  density = "default",
  state = "default",
  onRetry,
  emptyTitle,
  emptyMessage,
  className,
}: {
  columns: Column<T>[];
  rows: T[];
  caption: string;
  selectable?: boolean;
  expandable?: (row: T) => ReactNode;
  density?: "default" | "compact";
  state?: State;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
  className?: string;
}) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    if (!sort) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sort.key as keyof T];
      const bv = b[sort.key as keyof T];
      const r =
        typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv), "pt-BR");
      return sort.dir === "asc" ? r : -r;
    });
  }, [rows, sort]);

  const toggle = (set: Set<string>, id: string) => {
    const n = new Set(set);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    return n;
  };
  const allSelected = rows.length > 0 && selected.size === rows.length;
  const cell = density === "compact" ? "px-3 py-2" : "px-4 py-3.5";
  const colCount = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);

  return (
    <div className={cn("overflow-hidden rounded-rs-lg border border-line bg-section", className)}>
      {selectable && selected.size > 0 && (
        <div
          className="flex items-center justify-between gap-3 border-b border-cyan/25 bg-cyan/[0.06] px-4 py-2.5"
          role="status"
        >
          <span className="type-label-md text-cyan">
            {selected.size} {selected.size === 1 ? "item selecionado" : "itens selecionados"}
          </span>
          <button
            type="button"
            onClick={() => setSelected(new Set())}
            className="rs-focus type-label-sm rounded-rs-xs text-muted hover:text-fg"
          >
            Limpar seleção
          </button>
        </div>
      )}
      <div className="rs-scrollbar overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              {selectable && (
                <th scope="col" className={cn(cell, "w-10")}>
                  <input
                    type="checkbox"
                    aria-label="Selecionar todas as linhas"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = selected.size > 0 && !allSelected;
                    }}
                    onChange={() => setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)))}
                    className="size-4 cursor-pointer accent-[#00E6D1]"
                  />
                </th>
              )}
              {expandable && (
                <th scope="col" className={cn(cell, "w-10")}>
                  <span className="sr-only">Expandir</span>
                </th>
              )}
              {columns.map((c) => {
                const active = sort?.key === c.key;
                return (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={active ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined}
                    className={cn(
                      cell,
                      "type-micro whitespace-nowrap text-[10px] font-semibold text-subtle",
                      c.align === "right" && "text-right",
                      c.align === "center" && "text-center",
                    )}
                    style={{ width: c.width }}
                  >
                    {c.sortable ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSort(
                            active && sort!.dir === "asc"
                              ? { key: c.key, dir: "desc" }
                              : active && sort!.dir === "desc"
                                ? null
                                : { key: c.key, dir: "asc" },
                          )
                        }
                        className={cn(
                          "rs-focus inline-flex items-center gap-1 rounded-rs-xs uppercase transition-colors hover:text-fg",
                          active && "text-cyan",
                        )}
                      >
                        {c.header}
                        {active ? (
                          sort!.dir === "asc" ? (
                            <ArrowUp className="size-3" />
                          ) : (
                            <ArrowDown className="size-3" />
                          )
                        ) : (
                          <ChevronsUpDown className="size-3 opacity-60" />
                        )}
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {state === "loading" &&
              Array.from({ length: 4 }, (_, i) => (
                <tr key={i} className="border-b border-line-subtle">
                  {Array.from({ length: colCount }, (_, j) => (
                    <td key={j} className={cell}>
                      <Skeleton className={cn("h-3.5", j === 0 ? "w-4" : j % 2 ? "w-3/4" : "w-1/2")} />
                    </td>
                  ))}
                </tr>
              ))}
            {state === "empty" && (
              <tr>
                <td colSpan={colCount} className="p-6">
                  <EmptyState title={emptyTitle} message={emptyMessage} className="border-0" />
                </td>
              </tr>
            )}
            {state === "error" && (
              <tr>
                <td colSpan={colCount} className="p-10">
                  <div role="alert" className="flex flex-col items-center gap-3 text-center">
                    <OctagonAlert aria-hidden className="size-6 text-critical" strokeWidth={1.5} />
                    <p className="type-micro text-fg">Falha ao carregar eventos</p>
                    <p className="type-body-sm max-w-sm text-muted">
                      A conexão com a central foi interrompida. Os dados exibidos podem estar desatualizados.
                    </p>
                    {onRetry && (
                      <Button
                        variant="secondary"
                        size="sm"
                        arrow={false}
                        icon={<RotateCw className="size-3.5" />}
                        onClick={onRetry}
                      >
                        Tentar novamente
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            )}
            {state === "default" &&
              sorted.map((r, ri) => {
                const isSel = selected.has(r.id);
                const isExp = expanded.has(r.id);
                return (
                  <Fragment key={r.id}>
                    <tr
                      aria-selected={selectable ? isSel : undefined}
                      className={cn(
                        "relative border-b border-line-subtle transition-colors duration-(--rs-duration-fast)",
                        ri % 2 === 1 && "bg-white/[0.012]",
                        isSel ? "bg-cyan/[0.06] shadow-[inset_2px_0_0_#00E6D1]" : "rs-hover-row",
                      )}
                    >
                      {selectable && (
                        <td className={cell}>
                          <input
                            type="checkbox"
                            aria-label={`Selecionar linha ${r.id}`}
                            checked={isSel}
                            onChange={() => setSelected((s) => toggle(s, r.id))}
                            className="size-4 cursor-pointer accent-[#00E6D1]"
                          />
                        </td>
                      )}
                      {expandable && (
                        <td className={cell}>
                          <button
                            type="button"
                            aria-expanded={isExp}
                            aria-label={isExp ? "Recolher detalhes" : "Expandir detalhes"}
                            onClick={() => setExpanded((s) => toggle(s, r.id))}
                            className="rs-focus rs-hit grid size-6 place-items-center rounded-rs-xs text-muted hover:text-cyan"
                          >
                            <ChevronRight
                              className={cn(
                                "size-4 transition-transform duration-(--rs-duration-normal)",
                                isExp && "rotate-90 text-cyan",
                              )}
                            />
                          </button>
                        </td>
                      )}
                      {columns.map((c) => (
                        <td
                          key={c.key}
                          className={cn(
                            cell,
                            "type-body-sm whitespace-nowrap text-fg-secondary",
                            c.data && "font-data text-[12px] tabular-nums",
                            c.align === "right" && "text-right",
                            c.align === "center" && "text-center",
                          )}
                        >
                          {c.render ? c.render(r) : String(r[c.key])}
                        </td>
                      ))}
                    </tr>
                    {expandable && isExp && (
                      <tr className="border-b border-line-subtle bg-canvas/60">
                        <td colSpan={colCount} className="animate-rs-fade px-4 py-4 pl-16">
                          {expandable(r)}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ====================== SecurityEventTable (preset) ====================== */

export type SecurityEvent = {
  id: string;
  time: string;
  camera: string;
  event: string;
  location: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "Novo" | "Em análise" | "Respondido";
};

const sevBadge = {
  low: { tone: "info" as const, label: "Baixa" },
  medium: { tone: "warning" as const, label: "Média" },
  high: { tone: "critical" as const, label: "Alta" },
  critical: { tone: "critical" as const, label: "Crítica" },
};
const sevRank = { low: 0, medium: 1, high: 2, critical: 3 };

export function SecurityEventTable({
  events,
  state,
  onRetry,
}: {
  events: SecurityEvent[];
  state?: State;
  onRetry?: () => void;
}) {
  const rows = events.map((e) => ({ ...e, rank: sevRank[e.severity] }));
  return (
    <DataTable
      caption="Eventos de segurança"
      rows={rows}
      state={state}
      onRetry={onRetry}
      selectable
      expandable={(r) => (
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="type-micro text-[9px] text-subtle">Origem</p>
            <p className="type-body-sm mt-1 text-fg">
              {r.camera} · {r.location}
            </p>
          </div>
          <div>
            <p className="type-micro text-[9px] text-subtle">Classificação IA</p>
            <p className="type-body-sm mt-1 text-fg">Confiança 96,1% · modelo v4.2</p>
          </div>
          <div>
            <p className="type-micro text-[9px] text-subtle">Próxima ação</p>
            <p className="type-body-sm mt-1 text-fg">Validar evidência e acionar protocolo</p>
          </div>
        </div>
      )}
      columns={[
        { key: "time", header: "Hora", data: true, sortable: true },
        {
          key: "event",
          header: "Evento",
          sortable: true,
          render: (r) => <span className="font-medium text-fg">{r.event}</span>,
        },
        { key: "camera", header: "Origem", data: true },
        { key: "location", header: "Local" },
        {
          key: "rank",
          header: "Severidade",
          sortable: true,
          render: (r) => (
            <Badge tone={sevBadge[r.severity].tone} dot live={r.severity === "critical"}>
              {sevBadge[r.severity].label}
            </Badge>
          ),
        },
        {
          key: "status",
          header: "Status",
          render: (r) => (
            <span
              className={cn(
                "type-label-sm",
                r.status === "Novo" ? "text-cyan" : r.status === "Respondido" ? "text-muted" : "text-fg",
              )}
            >
              {r.status}
            </span>
          ),
        },
      ]}
    />
  );
}
