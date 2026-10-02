"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { Logo } from "@/design-system/brand/Logo";
import { Button } from "@/design-system/components/primitives/Button";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; href: string };

/**
 * Header — transparente no topo; ao rolar: blur, fundo escuro translúcido,
 * borda inferior sutil e altura reduzida. Item ativo em cyan.
 */
export function Header({
  items,
  active,
  cta = { label: "Falar com especialista", href: "#contato" },
  position = "fixed",
  scrolled: forced,
  className,
}: {
  items: NavItem[];
  active?: string;
  cta?: { label: string; href: string } | null;
  position?: "fixed" | "sticky" | "static";
  /** Força o estado (documentação/preview). */
  scrolled?: boolean;
  className?: string;
}) {
  const [auto, setAuto] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolled = forced ?? auto;

  useEffect(() => {
    if (forced !== undefined) return;
    const on = () => setAuto(window.scrollY > 24);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, [forced]);

  return (
    <header
      className={cn(
        position === "fixed" && "fixed inset-x-0 top-0 z-(--rs-z-header)",
        position === "sticky" && "sticky top-0 z-(--rs-z-header)",
        position === "static" && "relative",
        "border-b transition-[background-color,border-color,backdrop-filter] duration-(--rs-duration-slow) ease-rs-standard",
        scrolled
          ? "border-line-subtle bg-canvas/72 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
        className,
      )}
    >
      <div
        className={cn(
          "rs-container-wide flex items-center justify-between gap-6 transition-[height] duration-(--rs-duration-slow) ease-rs-standard",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Link href="/" aria-label="RealSeg — início" className="rs-focus shrink-0 rounded-rs-xs">
          <Logo height={32} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((it) => {
              const isActive = active === it.href;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rs-focus group relative block rounded-rs-xs px-3.5 py-2 type-label-md font-medium transition-colors duration-(--rs-duration-fast)",
                      isActive ? "text-fg" : "text-fg/65 hover:text-fg",
                    )}
                  >
                    {it.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 -bottom-px h-px origin-left bg-cyan transition-transform duration-(--rs-duration-slow) ease-rs-standard",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {cta && (
            <span className="hidden sm:block">
              <Button href={cta.href} size="sm">
                {cta.label}
              </Button>
            </span>
          )}
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="rs-focus grid size-11 place-items-center rounded-rs-sm border border-line text-fg transition-colors hover:border-cyan/60 lg:hidden"
          >
            {open ? <X className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Principal (mobile)"
          className="animate-rs-fade border-t border-line-subtle bg-canvas/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="rs-container-wide flex flex-col py-4">
            {items.map((it, i) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-baseline gap-3 py-2 text-2xl font-extrabold uppercase tracking-tight text-fg hover:text-cyan"
                >
                  <span className="type-micro text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
