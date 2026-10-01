import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Segment } from "@/data/segments";

export function SegmentCard({ segment }: { segment: Segment }) {
  const Icon = segment.icon;
  return (
    <a
      href="#contato"
      data-cursor="EXPLORE"
      aria-label={`${segment.title}: ${segment.description}`}
      className="group relative block aspect-[3/4.6] overflow-hidden rounded-lg border border-white/[0.08] bg-ink-900 transition-[border-color,box-shadow] duration-500 hover:border-accent/50 hover:shadow-[0_30px_80px_-30px_rgb(0_230_209/0.45)] focus-visible:border-accent"
    >
      <Image
        src={segment.image}
        alt=""
        fill
        sizes="(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 78vw"
        className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/35 to-transparent transition-opacity duration-500" />
      <div className="absolute inset-0 bg-linear-to-t from-accent/25 via-accent/5 to-transparent opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-[10%] -translate-y-full bg-linear-to-b from-transparent to-accent/25 opacity-0 group-hover:animate-scan group-hover:opacity-100" />

      {/* Cantoneiras HUD */}
      <div className="hud-corners absolute inset-3 scale-[1.04] opacity-0 transition-[opacity,transform] duration-500 ease-out-expo [--l:12px] group-hover:scale-100 group-hover:opacity-100" />

      {/* Topo */}
      <div className="micro absolute inset-x-4 top-4 flex items-center justify-between text-[9px]">
        <span className="text-fg/60 transition-colors group-hover:text-accent">{segment.index}</span>
        <span className="flex items-center gap-1.5 text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="h-1 w-1 rounded-full bg-accent" /> Monitorado
        </span>
      </div>

      {/* Conteúdo */}
      <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1.5 md:p-5">
        <span className="mb-4 grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-ink-950/50 backdrop-blur transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[-6deg] group-hover:border-accent/60 group-hover:bg-accent/10">
          <Icon className="h-[18px] w-[18px] text-accent" strokeWidth={1.6} />
        </span>
        <h3 className="text-lg font-bold tracking-tight text-fg md:text-xl">{segment.title}</h3>
        <p className="mt-1.5 text-[13px] leading-snug text-fg/65">{segment.description}</p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {segment.tags.map((t) => (
              <li
                key={t}
                className="micro translate-y-2 rounded-sm border border-white/10 px-1.5 py-1 text-[8px] text-fg/70 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100"
              >
                {t}
              </li>
            ))}
          </ul>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink-950">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Linha cyan */}
      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-linear-to-r from-accent to-accent-2 transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
    </a>
  );
}
