import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Space = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/* Mapas estáticos: o Tailwind precisa enxergar as classes completas. */
const gapMap: Record<Space, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
};

/** Container: 1280px (padrão) ou 1440px (wide), gutter fluido. */
export function Container({
  wide,
  as: Tag = "div",
  className,
  children,
}: {
  wide?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn(wide ? "rs-container-wide" : "rs-container", className)}>{children}</Tag>;
}

/** Stack: empilhamento vertical com espaçamento de token. */
export function Stack({
  gap = 4,
  align,
  as: Tag = "div",
  className,
  children,
}: {
  gap?: Space;
  align?: "start" | "center" | "end" | "stretch";
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "flex flex-col",
        gapMap[gap],
        align && { start: "items-start", center: "items-center", end: "items-end", stretch: "items-stretch" }[align],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Inline: linha com quebra, espaçamento de token. */
export function Inline({
  gap = 3,
  align = "center",
  justify,
  wrap = true,
  className,
  children,
}: {
  gap?: Space;
  align?: "start" | "center" | "end" | "baseline";
  justify?: "start" | "between" | "end" | "center";
  wrap?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex",
        wrap && "flex-wrap",
        gapMap[gap],
        { start: "items-start", center: "items-center", end: "items-end", baseline: "items-baseline" }[align],
        justify &&
          { start: "justify-start", between: "justify-between", end: "justify-end", center: "justify-center" }[justify],
        className,
      )}
    >
      {children}
    </div>
  );
}

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
} as const;

/** Grid: responsivo mobile-first; 12 colunas no desktop. */
export function Grid({
  cols = 3,
  gap = 6,
  className,
  children,
}: {
  cols?: keyof typeof colsMap;
  gap?: Space;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("grid", colsMap[cols], gapMap[gap], className)}>{children}</div>;
}

/** Section: ritmo vertical oficial entre seções (96px desktop / 64px mobile). */
export function Section({
  id,
  labelledBy,
  tone = "primary",
  divider,
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: "primary" | "secondary";
  divider?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-16 md:py-24", tone === "secondary" ? "bg-section" : "bg-canvas", className)}
    >
      {divider && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-line to-transparent"
        />
      )}
      {children}
    </section>
  );
}

/** Split: duas colunas (texto + mídia). `ratio` controla a proporção no desktop. */
export function Split({
  ratio = "5/7",
  reverse,
  gap = 12,
  align = "center",
  className,
  children,
}: {
  ratio?: "1/1" | "5/7" | "7/5" | "4/8";
  reverse?: boolean;
  gap?: Space;
  align?: "start" | "center";
  className?: string;
  children: [ReactNode, ReactNode];
}) {
  const cols = {
    "1/1": "lg:grid-cols-2",
    "5/7": "lg:grid-cols-[5fr_7fr]",
    "7/5": "lg:grid-cols-[7fr_5fr]",
    "4/8": "lg:grid-cols-[4fr_8fr]",
  }[ratio];
  return (
    <div
      className={cn(
        "grid grid-cols-1",
        cols,
        gapMap[gap],
        align === "center" ? "lg:items-center" : "lg:items-start",
        className,
      )}
    >
      <div className={cn(reverse && "lg:order-2")}>{children[0]}</div>
      <div className={cn(reverse && "lg:order-1")}>{children[1]}</div>
    </div>
  );
}

/** SidebarLayout: documentação e ferramentas internas. Sidebar fixa a partir de lg. */
export function SidebarLayout({
  sidebar,
  children,
  className,
}: {
  sidebar: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-dvh lg:grid lg:grid-cols-[272px_1fr]", className)}>
      <div className="hidden lg:block">
        <div className="sticky top-0 h-dvh">{sidebar}</div>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** DashboardLayout: sidebar + topbar + área de conteúdo com grid denso. */
export function DashboardLayout({
  sidebar,
  topbar,
  children,
  className,
}: {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-dvh bg-canvas lg:grid lg:grid-cols-[248px_1fr]", className)}>
      <div className="hidden lg:block">
        <div className="sticky top-0 h-dvh">{sidebar}</div>
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="sticky top-0 z-(--rs-z-sticky) border-b border-line-subtle bg-canvas/80 backdrop-blur-xl">
          {topbar}
        </div>
        <main className="flex-1 p-4 md:p-6 wide:p-8">{children}</main>
      </div>
    </div>
  );
}
