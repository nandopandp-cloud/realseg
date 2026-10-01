import Image from "next/image";
import { ScanFace } from "lucide-react";
import type { CaseStudy } from "@/data/cases";
import { DetectionBox, HudPanel, StatusDot } from "@/components/ui/Hud";
import { cn } from "@/lib/utils";

function CaseHud({ type }: { type: CaseStudy["hud"] }) {
  if (type === "lpr")
    return (
      <>
        <DetectionBox className="left-[44%] top-[60%] h-[16%] w-[14%]" />
        <HudPanel className="absolute left-[6%] top-[8%] w-[200px]">
          <p className="micro text-[8px] text-accent">Leitura de placas</p>
          <div className="mt-2 flex items-center gap-2.5">
            <span className="rounded-[3px] bg-fg px-2 py-0.5 font-mono text-[11px] font-bold tracking-[0.12em] text-ink-950">
              XYZ1A34
            </span>
            <span className="text-[10px] text-fg/70">Veículo autorizado</span>
          </div>
        </HudPanel>
      </>
    );
  if (type === "access")
    return (
      <>
        <div className="absolute left-[38%] top-[30%] grid h-[30%] w-[18%] place-items-center">
          <DetectionBox className="inset-0" />
          <ScanFace className="h-8 w-8 text-accent/80" strokeWidth={1} />
        </div>
        <HudPanel className="absolute right-[6%] top-[8%]">
          <p className="micro flex items-center gap-1.5 text-[8px] text-accent">
            <StatusDot /> Acesso liberado
          </p>
          <p className="mt-1 text-[11px] text-fg/80">Morador · Bloco B · 21:42</p>
        </HudPanel>
      </>
    );
  if (type === "retail")
    return (
      <>
        <div className="absolute inset-0 mix-blend-screen">
          <span className="absolute left-[38%] top-[48%] h-[40%] w-[30%] rounded-full bg-[radial-gradient(circle,rgb(255_95_87/0.55),rgb(255_181_71/0.25)_45%,transparent_70%)] blur-md" />
          <span className="absolute left-[58%] top-[58%] h-[30%] w-[22%] rounded-full bg-[radial-gradient(circle,rgb(255_181_71/0.45),rgb(0_230_209/0.2)_50%,transparent_70%)] blur-md" />
          <span className="absolute left-[18%] top-[62%] h-[24%] w-[18%] rounded-full bg-[radial-gradient(circle,rgb(0_230_209/0.4),transparent_70%)] blur-md" />
        </div>
        <HudPanel className="absolute left-[6%] top-[8%]">
          <p className="micro text-[8px] text-warn">Mapa de calor</p>
          <p className="mt-1 text-[11px] text-fg/80">Zona quente · Corredor 07</p>
        </HudPanel>
      </>
    );
  return (
    <>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <polygon
          points="18,62 52,54 80,60 70,86 22,90"
          fill="rgb(0 230 209 / 0.08)"
          stroke="rgb(0 230 209 / 0.7)"
          strokeWidth="0.3"
          strokeDasharray="1.2 1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <HudPanel className="absolute right-[6%] top-[8%]">
        <p className="micro flex items-center gap-1.5 text-[8px] text-accent">
          <StatusDot /> Área restrita
        </p>
        <p className="mt-1 text-[11px] text-fg/80">Acesso controlado · Zona C</p>
      </HudPanel>
    </>
  );
}

export function CaseCard({
  item,
  index,
  total,
  className,
  idSuffix = "",
}: {
  item: CaseStudy;
  index: number;
  total: number;
  className?: string;
  idSuffix?: string;
}) {
  const headingId = `case-${item.id}${idSuffix}`;
  const blocks = [
    { k: "Desafio", v: item.challenge },
    { k: "Solução", v: item.solution },
    { k: "Resultado", v: item.result },
  ];
  return (
    <article
      data-case
      aria-labelledby={headingId}
      className={cn("grid shrink-0 gap-6 lg:grid-cols-12 lg:items-center lg:gap-10", className)}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] lg:col-span-7" data-cursor="CASE">
        <div className="relative aspect-[16/11] lg:aspect-[16/10.5]">
          <div data-case-img className="absolute -inset-x-[6%] inset-y-0">
            <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 55vw, 90vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-ink-950/30" />
          <div aria-hidden className="absolute inset-0">
            <CaseHud type={item.hud} />
          </div>
          <div
            className="absolute inset-x-0 top-0 h-[10%] animate-scan bg-linear-to-b from-transparent to-accent/15 [animation-duration:8s]"
            aria-hidden
          />
          <span className="micro absolute bottom-4 left-5 text-[9px] text-fg/60">
            Case {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="lg:col-span-5" data-case-copy>
        <p className="micro inline-flex items-center gap-2 rounded-sm border border-accent/30 bg-accent/[0.06] px-2 py-1 text-[9px] text-accent">
          {item.segment}
        </p>
        <h3
          id={headingId}
          className="mt-4 text-[clamp(1.6rem,2.6vw,2.6rem)] font-extrabold uppercase leading-[1] tracking-[-0.03em] text-balance"
        >
          {item.title}
        </h3>

        <dl className="mt-7 space-y-4">
          {blocks.map((b, i) => (
            <div key={b.k} className="grid grid-cols-[92px_1fr] gap-4 border-t border-white/[0.07] pt-4">
              <dt className="micro flex items-start gap-2 pt-0.5 text-[9px] text-subtle">
                <span className="text-accent">0{i + 1}</span> {b.k}
              </dt>
              <dd className="text-[14px] leading-relaxed text-fg/80">{b.v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex items-center gap-5 rounded-lg border border-white/[0.08] bg-ink-900/60 p-4">
          <span className="text-gradient-accent text-4xl font-extrabold tracking-tight md:text-5xl">
            {item.metric.value}
          </span>
          <span className="max-w-[16rem] text-[13px] leading-snug text-muted">{item.metric.label}</span>
        </div>
      </div>
    </article>
  );
}
