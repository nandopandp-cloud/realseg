import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

/* ============================ DocSection ============================ */

export function DocSection({
  id,
  index,
  kicker,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 border-t border-line-subtle py-16 md:py-24"
    >
      <header className="mb-12 grid gap-6 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-end">
        <div>
          <p className="type-micro flex items-center gap-3 text-cyan">
            <span className="font-data text-[11px] tracking-normal text-subtle">{index}</span>
            <span aria-hidden className="h-px w-6 bg-cyan" />
            {kicker}
          </p>
          <h2 id={`${id}-title`} className="type-display-md mt-5 text-balance text-fg">
            {title}
          </h2>
        </div>
        {description && <div className="type-body-md text-muted">{description}</div>}
      </header>
      <div className="space-y-16">{children}</div>
    </section>
  );
}

/* ============================ SubSection ============================ */

export function SubSection({
  title,
  description,
  children,
  className,
  id,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("scroll-mt-24", className)}>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h3 className="type-heading-md flex items-center gap-3 text-fg">
          <span aria-hidden className="h-4 w-[2px] bg-cyan" />
          {title}
        </h3>
        {description && <p className="type-body-sm max-w-xl text-muted">{description}</p>}
      </div>
      {children}
    </div>
  );
}

/* ============================ Specimen ============================ */

/** Moldura de preview: superfície, grid sutil opcional, rótulo e código. */
export function Specimen({
  label,
  children,
  code,
  grid = true,
  padding = "md",
  className,
  bodyClassName,
}: {
  label?: string;
  children: ReactNode;
  code?: string;
  grid?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-rs-lg border border-line bg-section", className)}>
      {label && (
        <div className="flex items-center justify-between border-b border-line-subtle px-4 py-2.5">
          <span className="type-micro text-[9px] text-subtle">{label}</span>
          <span aria-hidden className="flex gap-1">
            <span className="size-1 rounded-full bg-line-strong" />
            <span className="size-1 rounded-full bg-line-strong" />
            <span className="size-1 rounded-full bg-cyan/60" />
          </span>
        </div>
      )}
      <div
        className={cn("relative", { none: "", sm: "p-4", md: "p-6 md:p-8", lg: "p-8 md:p-12" }[padding], bodyClassName)}
      >
        {grid && <div aria-hidden className="rs-grid rs-mask-radial pointer-events-none absolute inset-0 opacity-60" />}
        <div className="relative">{children}</div>
      </div>
      {code && <CodeBlock code={code} flush />}
    </div>
  );
}

/* ============================ PropsTable ============================ */

export function PropsTable({ rows }: { rows: Array<[prop: string, type: string, def: string, desc: string]> }) {
  return (
    <div className="rs-scrollbar overflow-x-auto rounded-rs-md border border-line">
      <table className="w-full min-w-[640px] text-left">
        <caption className="sr-only">Propriedades</caption>
        <thead>
          <tr className="border-b border-line bg-elevated/50">
            {["Prop", "Tipo", "Padrão", "Descrição"].map((h) => (
              <th key={h} scope="col" className="type-micro px-4 py-3 text-[9px] text-subtle">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([p, t, d, desc]) => (
            <tr key={p} className="border-b border-line-subtle last:border-0">
              <td className="px-4 py-3 font-data text-[12px] text-cyan">{p}</td>
              <td className="px-4 py-3 font-data text-[11px] text-fg-secondary">{t}</td>
              <td className="px-4 py-3 font-data text-[11px] text-muted">{d}</td>
              <td className="type-body-sm px-4 py-3 text-muted">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================ DoDont ============================ */

export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-rs-md border border-success/25 bg-success/[0.04] p-5">
        <p className="type-micro flex items-center gap-2 text-success">
          <Check aria-hidden className="size-3.5" /> Faça
        </p>
        <ul className="mt-4 space-y-2.5">
          {dos.map((d) => (
            <li key={d} className="type-body-sm flex gap-2.5 text-fg-secondary">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-success" />
              {d}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-rs-md border border-critical/25 bg-critical/[0.04] p-5">
        <p className="type-micro flex items-center gap-2 text-critical">
          <X aria-hidden className="size-3.5" /> Não faça
        </p>
        <ul className="mt-4 space-y-2.5">
          {donts.map((d) => (
            <li key={d} className="type-body-sm flex gap-2.5 text-fg-secondary">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-critical" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================ ComponentDoc ============================ */

/**
 * Estrutura oficial de documentação de componente:
 * Purpose · Anatomy · Variants · States · Usage · Do · Don't
 */
export function ComponentDoc({
  name,
  importPath,
  purpose,
  anatomy,
  variants,
  states,
  preview,
  usage,
  props,
  dos,
  donts,
}: {
  name: string;
  importPath: string;
  purpose: string;
  anatomy?: string[];
  variants?: string[];
  states?: string[];
  preview?: ReactNode;
  usage?: string;
  props?: Array<[string, string, string, string]>;
  dos?: string[];
  donts?: string[];
}) {
  return (
    <article className="space-y-6" aria-label={`Componente ${name}`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="type-heading-lg flex items-center gap-3 text-fg">
          <span aria-hidden className="h-5 w-[2px] bg-cyan" />
          {name}
        </h3>
        <code className="rounded-rs-xs border border-line bg-canvas px-2.5 py-1 font-data text-[11px] text-muted">
          {importPath}
        </code>
      </div>
      <div className={cn("grid gap-4", !!preview && "lg:grid-cols-[minmax(0,1fr)_280px]")}>
        {preview && <div className="min-w-0">{preview}</div>}
        <dl
          className={cn(
            "rounded-rs-lg border border-line-subtle bg-section p-5",
            preview ? "space-y-5" : "grid gap-6 md:grid-cols-2 xl:grid-cols-4",
          )}
        >
          <div>
            <dt className="type-micro text-[9px] text-cyan">Purpose</dt>
            <dd className="type-body-sm mt-1.5 text-fg-secondary">{purpose}</dd>
          </div>
          {anatomy && <TagList title="Anatomy" items={anatomy} numbered />}
          {variants && <TagList title="Variants" items={variants} />}
          {states && <TagList title="States" items={states} />}
        </dl>
      </div>
      {usage && <CodeBlock code={usage} title="Usage" />}
      {props && <PropsTable rows={props} />}
      {dos && donts && <DoDont dos={dos} donts={donts} />}
    </article>
  );
}

function TagList({ title, items, numbered }: { title: string; items: string[]; numbered?: boolean }) {
  return (
    <div>
      <dt className="type-micro text-[9px] text-cyan">{title}</dt>
      <dd className="mt-2 flex flex-wrap gap-1.5">
        {items.map((i, k) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 rounded-rs-xs border border-line px-2 py-1 text-[11px] text-fg-secondary"
          >
            {numbered && <span className="font-data text-[10px] text-cyan">{k + 1}</span>}
            {i}
          </span>
        ))}
      </dd>
    </div>
  );
}

/* ============================ Note ============================ */

export function Note({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warning" }) {
  return (
    <p
      className={cn(
        "type-body-sm rounded-rs-md border px-4 py-3",
        tone === "info"
          ? "border-cyan/25 bg-cyan/[0.04] text-fg-secondary"
          : "border-warning/30 bg-warning/[0.05] text-fg-secondary",
      )}
    >
      {children}
    </p>
  );
}
