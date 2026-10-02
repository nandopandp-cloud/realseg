"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { gsap, useGSAP } from "@/lib/gsap";
import { onBootDone } from "@/lib/boot";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seção ativa no menu
  useEffect(() => {
    const ids = navigation.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Trava o scroll com menu aberto
  useEffect(() => {
    const lenis = window.__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useGSAP(
    () => {
      if (!open || !menuRef.current) return;
      gsap.fromTo(
        menuRef.current.querySelectorAll("[data-menu-item]"),
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.9, ease: "expo.out", delay: 0.1 },
      );
    },
    { dependencies: [open] },
  );

  // Entrada do header junto com o hero
  useGSAP(() => {
    const tween = gsap.from("[data-header]", {
      y: -24,
      opacity: 0,
      duration: 1.2,
      delay: 0.9,
      ease: "expo.out",
      paused: true,
    });
    return onBootDone(() => tween.play());
  });

  return (
    <>
      <header
        data-header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-ink-950/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo",
            scrolled ? "h-16" : "h-20 md:h-24",
          )}
        >
          <Logo />

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active === item.href ? "location" : undefined}
                    className={cn(
                      "group relative block px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
                      active === item.href ? "text-fg" : "text-fg/65 hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3.5 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ease-out-expo",
                        active === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button href="#contato" size="sm">
                Falar com especialista
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="relative z-[60] grid h-10 w-10 place-items-center rounded-md border border-white/10 text-fg transition-colors hover:border-accent/60 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <ScrollProgress />
      </header>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="fixed inset-0 z-[45] bg-ink-950/95 backdrop-blur-2xl lg:hidden"
      >
        <div aria-hidden className="absolute inset-0 bg-grid mask-radial opacity-60" />
        <nav
          aria-label="Navegação mobile"
          className="container-x relative flex h-full flex-col justify-center gap-10 pt-16"
        >
          <ul className="space-y-2">
            {navigation.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  data-menu-item
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1 text-4xl font-extrabold uppercase tracking-tight text-fg transition-colors hover:text-accent sm:text-5xl"
                >
                  <span className="micro text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div data-menu-item>
            <Button href="#contato" onClick={() => setOpen(false)} size="lg">
              Falar com especialista
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
