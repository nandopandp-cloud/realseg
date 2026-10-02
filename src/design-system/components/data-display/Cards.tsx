import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/design-system/components/visualization/Charts";

/* ============================== Card ============================== */

type CardVariant = "base" | "elevated" | "interactive";

/**
 * Card — superfície escura, borda sutil, raio consistente (20px).
 * - base: agrupamento simples (fundo deep)
 * - elevated: painel destacado (fundo navy + sombra)
 * - interactive: clicável — hover eleva, borda cyan, glow sutil
 */
export function Card({
  variant = "base",
  href,
  padding = "md",
  className,
  children,
}: {
  variant?: CardVariant;
  href?: string;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}) {
  const cls = cn(
    "relative block rounded-rs-lg border",
    { none: "", sm: "p-4", md: "p-6", lg: "p-8" }[padding],
    variant === "base" && "border-line-subtle bg-section",
    variant === "elevated" && "border-line bg-elevated shadow-rs-lg",
    variant === "interactive" &&
      "group rs-focus border-line bg-elevated transition-[transform,border-color,box-shadow,background-color] duration-(--rs-duration-slow) ease-rs-standard hover:-translate-y-1 hover:border-cyan/45 hover:bg-panel hover:shadow-glow-sm",
    className,
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return <div className={cls}>{children}</div>;
}

/* ============================ MediaCard ============================ */

/**
 * MediaCard — imagem + overlay + conteúdo + indicador + micro movimento.
 * Usado para segmentos, soluções e conteúdos com fotografia da marca.
 */
export function MediaCard({
  image,
  alt = "",
  eyebrow,
  title,
  description,
  href = "#",
  icon,
  aspect = "aspect-[3/4]",
  className,
}: {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
  aspect?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group rs-focus relative block overflow-hidden rounded-rs-lg border border-line-subtle bg-section transition-[border-color,box-shadow] duration-(--rs-duration-slow) ease-rs-standard hover:border-cyan/50 hover:shadow-[0_30px_80px_-30px_rgb(0_230_209/0.45)]",
        aspect,
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 80vw"
        className="object-cover transition-transform duration-[1.4s] ease-rs-standard group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-cyan/25 to-transparent opacity-0 mix-blend-screen transition-opacity duration-(--rs-duration-slow) group-hover:opacity-100" />
      <div className="rs-frame absolute inset-3 scale-[1.04] opacity-0 transition-[opacity,transform] duration-(--rs-duration-slow) ease-rs-standard group-hover:scale-100 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-(--rs-duration-slow) ease-rs-standard group-hover:-translate-y-1.5">
        {icon && (
          <span className="mb-4 grid size-10 place-items-center rounded-rs-sm border border-white/15 bg-canvas/50 text-cyan backdrop-blur transition-[transform,border-color] duration-(--rs-duration-slow) ease-rs-standard group-hover:-translate-y-1 group-hover:border-cyan/60">
            {icon}
          </span>
        )}
        {eyebrow && <p className="type-micro mb-1.5 text-[9px] text-cyan">{eyebrow}</p>}
        <h3 className="type-heading-md text-fg">{title}</h3>
        {description && <p className="type-body-sm mt-1 text-fg-secondary">{description}</p>}
        <span className="mt-4 grid size-8 place-items-center rounded-full border border-white/20 text-fg transition-all duration-(--rs-duration-slow) ease-rs-standard group-hover:rotate-45 group-hover:border-cyan group-hover:bg-cyan group-hover:text-inverse">
          <ArrowUpRight aria-hidden className="size-3.5" />
        </span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-linear-to-r from-cyan to-cyan-light transition-transform duration-[700ms] ease-rs-standard group-hover:scale-x-100" />
    </Link>
  );
}

/* ============================ MetricCard ============================ */

/** KPI com tendência e sparkline. Números sempre tabulares. */
export function MetricCard({
  label,
  value,
  prefix,
  suffix,
  delta,
  trend,
  icon,
  className,
}: {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  delta?: { value: string; direction: "up" | "down"; positive?: boolean };
  trend?: number[];
  icon?: ReactNode;
  className?: string;
}) {
  const good = delta ? (delta.positive ?? delta.direction === "up") : true;
  return (
    <div className={cn("relative overflow-hidden rounded-rs-lg border border-line bg-elevated p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="type-label-md text-muted">{label}</p>
        {icon && <span className="text-cyan">{icon}</span>}
      </div>
      <p className="mt-3 text-[2.25rem] font-extrabold leading-none tracking-tight text-fg tabular-nums">
        {prefix && <span className="text-cyan">{prefix}</span>}
        {value}
        {suffix && <span className="ml-0.5 text-xl text-muted">{suffix}</span>}
      </p>
      <div className="mt-4 flex items-end justify-between gap-4">
        {delta ? (
          <span
            className={cn(
              "type-label-sm inline-flex items-center gap-1 font-semibold",
              good ? "text-success" : "text-critical",
            )}
          >
            {delta.direction === "up" ? (
              <TrendingUp aria-hidden className="size-3.5" />
            ) : (
              <TrendingDown aria-hidden className="size-3.5" />
            )}
            {delta.value}
            <span className="sr-only">{good ? "(melhora)" : "(piora)"}</span>
          </span>
        ) : (
          <span />
        )}
        {trend && <Sparkline data={trend} className="h-8 w-28" />}
      </div>
    </div>
  );
}

/* ========================== TechnologyCard ========================== */

export function TechnologyCard({
  icon,
  category = "Tecnologia",
  title,
  description,
  href,
  className,
}: {
  icon: ReactNode;
  category?: string;
  title: string;
  description: string;
  href?: string;
  className?: string;
}) {
  return (
    <Card variant="interactive" href={href ?? "#"} className={cn("overflow-hidden", className)}>
      <div
        aria-hidden
        className="rs-grid rs-mask-radial absolute inset-0 opacity-0 transition-opacity duration-(--rs-duration-slow) group-hover:opacity-100"
      />
      <span className="relative grid size-12 place-items-center rounded-rs-md border border-cyan/35 bg-cyan/[0.06] text-cyan transition-[box-shadow,transform] duration-(--rs-duration-slow) ease-rs-standard group-hover:-translate-y-0.5 group-hover:shadow-glow-sm">
        {icon}
      </span>
      <p className="type-micro relative mt-6 text-[9px] text-cyan">{category}</p>
      <h3 className="type-heading-md relative mt-1.5 text-fg">{title}</h3>
      <p className="type-body-sm relative mt-2 text-muted">{description}</p>
      <span className="type-label-md relative mt-5 inline-flex items-center gap-1.5 text-fg-secondary transition-colors group-hover:text-cyan">
        Saiba mais{" "}
        <ArrowRight
          aria-hidden
          className="size-3.5 transition-transform duration-(--rs-duration-normal) group-hover:translate-x-1"
        />
      </span>
    </Card>
  );
}

/* ============================== CaseCard ============================== */

/** Case — storytelling: segmento, desafio, solução e resultado. */
export function CaseCard({
  image,
  segment,
  title,
  challenge,
  solution,
  result,
  metric,
  hud,
  className,
}: {
  image: string;
  segment: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metric: { value: string; label: string };
  hud?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "grid overflow-hidden rounded-rs-lg border border-line bg-section lg:grid-cols-[1.1fr_1fr]",
        className,
      )}
    >
      <div className="relative min-h-64">
        <Image src={image} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-canvas/80 via-transparent to-canvas/20" />
        {hud && <div className="absolute inset-0">{hud}</div>}
      </div>
      <div className="p-6 md:p-8">
        <span className="type-micro inline-flex rounded-rs-xs border border-cyan/35 bg-cyan/[0.06] px-2 py-1 text-[9px] text-cyan">
          {segment}
        </span>
        <h3 className="type-heading-lg mt-4 text-balance uppercase text-fg">{title}</h3>
        <dl className="mt-6 space-y-3">
          {[
            ["Desafio", challenge],
            ["Solução", solution],
            ["Resultado", result],
          ].map(([k, v], i) => (
            <div key={k} className="grid grid-cols-[88px_1fr] gap-4 border-t border-line-subtle pt-3">
              <dt className="type-micro pt-0.5 text-[9px] text-subtle">
                <span className="text-cyan">0{i + 1}</span> {k}
              </dt>
              <dd className="type-body-sm text-fg-secondary">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex items-center gap-4 rounded-rs-md border border-line bg-canvas/50 p-4">
          <span className="rs-text-gradient text-4xl font-extrabold tracking-tight">{metric.value}</span>
          <span className="type-body-sm text-muted">{metric.label}</span>
        </div>
      </div>
    </article>
  );
}

/* ============================== Avatar ============================== */

export function Avatar({
  name,
  src,
  size = 40,
  status,
}: {
  name: string;
  src?: string;
  size?: number;
  status?: "online" | "busy" | "offline";
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="relative inline-grid shrink-0 place-items-center rounded-full border border-line-strong bg-panel text-fg"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className="rounded-full object-cover" />
      ) : (
        <span className="font-bold" style={{ fontSize: size * 0.34 }} aria-label={name}>
          {initials}
        </span>
      )}
      {status && (
        <span
          aria-label={status}
          className={cn(
            "absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-canvas",
            status === "online" ? "bg-success" : status === "busy" ? "bg-warning" : "bg-subtle",
          )}
        />
      )}
    </span>
  );
}

export function AvatarGroup({ names, max = 3 }: { names: string[]; max?: number }) {
  const rest = names.length - max;
  return (
    <div className="flex -space-x-2.5">
      {names.slice(0, max).map((n) => (
        <span key={n} className="rounded-full ring-2 ring-canvas">
          <Avatar name={n} size={36} />
        </span>
      ))}
      {rest > 0 && (
        <span className="grid size-9 place-items-center rounded-full border border-cyan/50 bg-canvas text-xs font-bold text-cyan ring-2 ring-canvas">
          +{rest}
        </span>
      )}
    </div>
  );
}
