"use client";

import Image from "next/image";
import { CityMap } from "@/components/ui/CityMap";
import { DetectionBox, StatusDot } from "@/components/ui/Hud";
import { useClock } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/** Peças do video wall da Central. Conteúdo ilustrativo. */

export function Tile({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      data-tile
      className={cn("relative overflow-hidden rounded-[3px] border border-white/[0.07] bg-ink-900", className)}
    >
      {children}
    </div>
  );
}

export function FeedTile({
  src,
  cam,
  className,
  children,
  tone = "accent",
}: {
  src: string;
  cam: string;
  className?: string;
  children?: React.ReactNode;
  tone?: "accent" | "alert";
}) {
  return (
    <Tile className={cn("min-h-[110px]", className)}>
      <Image src={src} alt="" fill sizes="(min-width: 768px) 17vw, 50vw" className="object-cover opacity-75" />
      <div className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-ink-950/40" />
      {children}
      <span className="micro absolute left-2 top-2 flex items-center gap-1.5 text-[7px] text-fg/85 md:text-[8px]">
        <StatusDot tone={tone} /> {cam}
      </span>
      <span className="micro absolute bottom-1.5 right-2 text-[7px] text-fg/50">LIVE</span>
    </Tile>
  );
}

export function MapTile({ className }: { className?: string }) {
  const points = [
    { l: "22%", t: "30%", tone: "accent" },
    { l: "48%", t: "52%", tone: "accent" },
    { l: "70%", t: "26%", tone: "alert" },
    { l: "35%", t: "72%", tone: "accent" },
    { l: "82%", t: "64%", tone: "accent" },
    { l: "58%", t: "80%", tone: "warn" },
  ] as const;
  return (
    <Tile className={cn("min-h-[220px]", className)}>
      <CityMap className="absolute inset-0" />
      {points.map((p, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.l, top: p.t }}>
          <span data-map-point className="relative block">
            <span
              className={cn(
                "absolute -inset-3 rounded-full animate-pulse-dot",
                p.tone === "alert" ? "bg-alert/40" : p.tone === "warn" ? "bg-warn/40" : "bg-accent/30",
              )}
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            <span
              className={cn(
                "relative block h-2 w-2 rounded-full",
                p.tone === "alert" ? "bg-alert" : p.tone === "warn" ? "bg-warn" : "bg-accent",
              )}
            />
          </span>
        </span>
      ))}
      <div className="micro absolute left-3 top-3 text-[8px] text-fg/80">
        Mapa operacional <span className="text-subtle">· Setores 01 a 08</span>
      </div>
      <div className="glass micro absolute bottom-3 left-3 rounded-sm px-2 py-1.5 text-[8px] text-alert">
        ● Setor 04 · evento em análise
      </div>
      {/* Varredura do mapa */}
      <div className="absolute inset-y-0 left-0 w-1/3 animate-travel bg-linear-to-r from-transparent via-accent/[0.07] to-transparent [animation-duration:6s]" />
    </Tile>
  );
}

export function AlertsTile({ className }: { className?: string }) {
  const items = [
    { t: "Área restrita", s: "SETOR 04", tone: "alert" as const },
    { t: "Veículo de interesse", s: "LPR 0042", tone: "warn" as const },
    { t: "Porta aberta", s: "ACS 0118", tone: "accent" as const },
  ];
  return (
    <Tile className={cn("p-3", className)}>
      <p className="micro flex items-center justify-between text-[8px] text-fg/80">
        Alertas <span className="text-alert">3 ativos</span>
      </p>
      <ul className="mt-2.5 space-y-2">
        {items.map((i) => (
          <li
            key={i.t}
            data-alert
            className="flex items-center gap-2 border-l-2 pl-2"
            style={{ borderColor: `var(--color-${i.tone})` }}
          >
            <span className="min-w-0">
              <span className="block truncate text-[10px] text-fg/90">{i.t}</span>
              <span className="micro block text-[7px] text-subtle">{i.s}</span>
            </span>
          </li>
        ))}
      </ul>
    </Tile>
  );
}

export function ChartTile({ className }: { className?: string }) {
  const bars = [32, 44, 38, 56, 48, 62, 70, 58, 76, 64, 82, 72];
  return (
    <Tile className={cn("flex flex-col p-3", className)}>
      <p className="micro flex justify-between text-[8px] text-fg/80">
        Eventos / hora <span className="text-accent">↑</span>
      </p>
      <div className="mt-2 flex flex-1 items-end gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            data-bar
            className={cn(
              "block flex-1 origin-bottom rounded-[1px]",
              i === bars.length - 2 ? "bg-accent" : "bg-accent/35",
            )}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </Tile>
  );
}

export function StatusTile({ className }: { className?: string }) {
  const time = useClock();
  return (
    <Tile className={cn("flex flex-col justify-between p-3", className)}>
      <p className="micro text-[8px] text-fg/80">Central RealSeg</p>
      <div className="flex items-center gap-3">
        <span className="relative grid h-11 w-11 place-items-center">
          <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
            <circle cx="20" cy="20" r="17" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="2" />
            <circle
              data-ring
              cx="20"
              cy="20"
              r="17"
              fill="none"
              stroke="#00e6d1"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0.02"
              strokeLinecap="round"
            />
          </svg>
          <StatusDot />
        </span>
        <span>
          <span className="block font-mono text-sm text-fg">24/7</span>
          <span className="micro block text-[7px] text-accent">Online</span>
        </span>
      </div>
      <p className="font-mono text-[10px] text-subtle">{time}</p>
    </Tile>
  );
}

export function TickerTile({ className }: { className?: string }) {
  const text =
    "CAM 0217 · movimento em área restrita | LPR 0042 · placa de interesse | DRN 02 · patrulha concluída | ACS 0118 · acesso negado | CAM 1187 · fluxo acima do padrão | ";
  return (
    <Tile className={cn("flex items-center overflow-hidden", className)}>
      <span className="micro absolute left-0 top-0 z-10 flex h-full items-center bg-accent px-3 text-[8px] font-semibold text-ink-950">
        Live
      </span>
      <div className="flex w-max animate-marquee whitespace-nowrap pl-16 font-mono text-[10px] text-fg/70 [animation-duration:40s]">
        <span>{text}</span>
        <span aria-hidden>{text}</span>
      </div>
    </Tile>
  );
}

export { DetectionBox };
