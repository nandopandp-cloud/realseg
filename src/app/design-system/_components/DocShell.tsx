"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  Accessibility,
  Blocks,
  BookOpen,
  Box,
  Camera,
  ChartColumnIncreasing,
  Component,
  CreditCard,
  Gauge,
  Grid3x3,
  LayoutTemplate,
  Menu,
  MessageSquare,
  MousePointerClick,
  Navigation,
  Palette,
  Radar,
  Ruler,
  Shapes,
  ShieldCheck,
  Sparkles,
  Table2,
  TextCursorInput,
  Type,
  Waves,
  X,
  Bell,
} from "lucide-react";
import { Logo } from "@/design-system/brand/Logo";
import { Sidebar, type SidebarGroup } from "@/design-system/components/navigation/Navigation";
import { Badge } from "@/design-system/components/feedback/Badge";
import { cn } from "@/lib/utils";

const ic = "size-4";
export const docNav: SidebarGroup[] = [
  {
    label: "Fundamentos",
    items: [
      { id: "overview", label: "Overview", href: "#overview", icon: <Sparkles className={ic} /> },
      { id: "brand", label: "Brand & Logo", href: "#brand", icon: <ShieldCheck className={ic} /> },
      { id: "colors", label: "Colors", href: "#colors", icon: <Palette className={ic} /> },
      { id: "typography", label: "Typography", href: "#typography", icon: <Type className={ic} /> },
      { id: "spacing", label: "Spacing & Depth", href: "#spacing", icon: <Ruler className={ic} /> },
      { id: "icons", label: "Icons", href: "#icons", icon: <Shapes className={ic} /> },
    ],
  },
  {
    label: "Componentes",
    items: [
      { id: "buttons", label: "Buttons", href: "#buttons", icon: <MousePointerClick className={ic} /> },
      { id: "inputs", label: "Inputs", href: "#inputs", icon: <TextCursorInput className={ic} /> },
      { id: "cards", label: "Cards", href: "#cards", icon: <CreditCard className={ic} /> },
      { id: "navigation", label: "Navigation", href: "#navigation", icon: <Navigation className={ic} /> },
      { id: "feedback", label: "Feedback", href: "#feedback", icon: <Bell className={ic} /> },
      { id: "overlays", label: "Overlays", href: "#overlays", icon: <Box className={ic} /> },
      { id: "tables", label: "Tables", href: "#tables", icon: <Table2 className={ic} /> },
      { id: "data", label: "Data & Metrics", href: "#data", icon: <ChartColumnIncreasing className={ic} /> },
    ],
  },
  {
    label: "Security Language",
    items: [
      { id: "security", label: "Security Components", href: "#security", icon: <Gauge className={ic} /> },
      { id: "graphics", label: "Radar · HUD · Scan", href: "#graphics", icon: <Radar className={ic} /> },
      { id: "motion", label: "Motion", href: "#motion", icon: <Waves className={ic} /> },
      { id: "photography", label: "Photography", href: "#photography", icon: <Camera className={ic} /> },
    ],
  },
  {
    label: "Sistema",
    items: [
      { id: "layout", label: "Layout", href: "#layout", icon: <LayoutTemplate className={ic} /> },
      { id: "content", label: "Content", href: "#content", icon: <MessageSquare className={ic} /> },
      { id: "accessibility", label: "Accessibility", href: "#accessibility", icon: <Accessibility className={ic} /> },
      { id: "tokens", label: "Tokens & Arquitetura", href: "#tokens", icon: <Grid3x3 className={ic} /> },
      { id: "brandbook", label: "Brandbook v1.0", href: "#brandbook", icon: <BookOpen className={ic} /> },
    ],
  },
];

const allIds = docNav.flatMap((g) => g.items.map((i) => i.id));

export function DocShell({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("overview");
  const [open, setOpen] = useState(false);

  // Scrollspy
  useEffect(() => {
    const els = allIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const sidebar = (
    <Sidebar
      groups={docNav}
      active={active}
      onNavigate={() => setOpen(false)}
      header={
        <Link href="/design-system" className="rs-focus block rounded-rs-xs" aria-label="RealSeg Design System — topo">
          <Logo height={28} tagline={false} />
          <p className="type-micro mt-3 flex items-center gap-2 text-[9px] text-muted">
            Design System <span className="font-data tracking-normal text-cyan">v1.0</span>
          </p>
        </Link>
      }
      footer={
        <div className="space-y-3">
          <Link
            href="/design-system/demo"
            className="rs-focus group flex items-center justify-between gap-2 rounded-rs-sm border border-cyan/30 bg-cyan/[0.05] px-3 py-2.5 text-[13px] font-semibold text-cyan transition-colors hover:bg-cyan/10"
          >
            <span className="flex items-center gap-2">
              <Component className="size-4" /> Demo · Central
            </span>
            <Blocks className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Badge tone="warning" dot className="w-full justify-center">
            Uso interno · Confidencial
          </Badge>
        </div>
      }
    />
  );

  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-dvh">{sidebar}</div>
      </div>

      {/* Topbar mobile */}
      <div className="sticky top-0 z-(--rs-z-header) flex h-14 items-center justify-between border-b border-line-subtle bg-canvas/85 px-4 backdrop-blur-xl lg:hidden">
        <Logo height={24} tagline={false} />
        <button
          type="button"
          aria-label={open ? "Fechar navegação" : "Abrir navegação"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rs-focus grid size-11 place-items-center rounded-rs-sm border border-line text-fg"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>
      <div
        className={cn(
          "fixed inset-0 top-14 z-(--rs-z-overlay) transition-opacity duration-(--rs-duration-normal) lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="absolute inset-0 bg-canvas/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div
          className={cn(
            "relative h-full w-[min(300px,85vw)] transition-transform duration-(--rs-duration-slow) ease-rs-standard",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebar}
        </div>
      </div>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
