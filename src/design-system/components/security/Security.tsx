import Image from "next/image";
import type { ReactNode } from "react";
import { BellRing, BrainCircuit, Cctv, ChevronRight, MapPin, Radio, ShieldCheck, Siren } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusDot, type StatusTone } from "@/design-system/components/primitives/Indicators";
import { SecurityTarget } from "@/design-system/components/graphics/Hud";

/* ------------------------------------------------------------------ */
/* StatusChip — base comum de todos os indicadores operacionais        */
/* ------------------------------------------------------------------ */

const chip: Record<StatusTone, string> = {
  accent: "border-cyan/45 bg-cyan/[0.06] text-cyan",
  success: "border-success/45 bg-success/[0.06] text-success",
  warning: "border-warning/45 bg-warning/[0.07] text-warning",
  critical: "border-critical/50 bg-critical/[0.08] text-critical",
  info: "border-info/45 bg-info/[0.07] text-info",
  neutral: "border-line-strong bg-white/[0.03] text-fg-secondary",
};

export function StatusChip({
  tone = "accent",
  live = true,
  icon,
  children,
  className,
}: {
  tone?: StatusTone;
  live?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      role="status"
      className={cn(
        "type-micro inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-rs-sm border px-3 text-[10px]",
        chip[tone],
        className,
      )}
    >
      {icon ?? <StatusDot tone={tone} live={live} />}
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */

export type SystemState = "online" | "degraded" | "offline";

/** ● SYSTEM ONLINE */
export function SecurityStatus({ state = "online", label }: { state?: SystemState; label?: string }) {
  const map = {
    online: { tone: "success" as const, text: "System online" },
    degraded: { tone: "warning" as const, text: "System degraded" },
    offline: { tone: "critical" as const, text: "System offline" },
  }[state];
  return (
    <StatusChip tone={map.tone} live={state !== "offline"}>
      {label ?? map.text}
    </StatusChip>
  );
}

/** ● MONITORING ACTIVE */
export function MonitoringIndicator({ active = true, sources }: { active?: boolean; sources?: number }) {
  return (
    <StatusChip tone={active ? "accent" : "neutral"} live={active}>
      {active ? "Monitoring active" : "Monitoring paused"}
      {sources != null && <span className="font-data tracking-normal text-fg-secondary">· {sources}</span>}
    </StatusChip>
  );
}

/** ● ALERT — contador de alertas com severidade. */
export function AlertIndicator({ count, severity = "critical" }: { count: number; severity?: "warning" | "critical" }) {
  return (
    <StatusChip
      tone={count ? severity : "neutral"}
      live={count > 0}
      icon={<BellRing aria-hidden className="size-3.5" />}
    >
      {count ? `${count} ${count === 1 ? "alerta" : "alertas"}` : "Sem alertas"}
    </StatusChip>
  );
}

/** AI ANALYSIS 98.4% — confiança da inferência. */
export function AIIndicator({
  value,
  label = "AI analysis",
  context,
  className,
}: {
  value: number;
  label?: string;
  context?: string;
  className?: string;
}) {
  const bars = 22;
  return (
    <div className={cn("relative overflow-hidden rounded-rs-md border border-line bg-elevated p-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-rs-sm border border-cyan/40 bg-cyan/10 text-cyan">
            <BrainCircuit aria-hidden className="size-4" strokeWidth={1.6} />
          </span>
          <div>
            <p className="type-micro text-[9px] text-cyan">{label}</p>
            {context && <p className="type-label-sm text-muted">{context}</p>}
          </div>
        </div>
        <p className="font-data text-2xl font-semibold leading-none text-fg tabular-nums">
          {value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
          <span className="text-sm text-muted">%</span>
        </p>
      </div>
      <div aria-hidden className="mt-4 flex h-5 items-end gap-[3px]">
        {Array.from({ length: bars }, (_, i) => (
          <span
            key={i}
            className={cn("flex-1 rounded-[1px]", i / bars < value / 100 ? "bg-cyan" : "bg-white/10")}
            style={{ height: `${35 + ((i * 47) % 65)}%`, opacity: i / bars < value / 100 ? 0.4 + (i / bars) * 0.6 : 1 }}
          />
        ))}
      </div>
      <p className="sr-only">Confiança da análise: {value}%</p>
    </div>
  );
}

/** Câmera · status · local — card compacto de status de dispositivo. */
export function CameraStatus({
  name,
  status = "online",
  location,
  thumbnail,
  className,
}: {
  name: string;
  status?: "online" | "recording" | "offline";
  location?: string;
  thumbnail?: string;
  className?: string;
}) {
  const s = {
    online: { tone: "success" as const, text: "Online" },
    recording: { tone: "critical" as const, text: "Gravando" },
    offline: { tone: "neutral" as const, text: "Offline" },
  }[status];
  return (
    <div className={cn("flex items-center gap-3 rounded-rs-md border border-line bg-elevated p-3 pr-4", className)}>
      <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-rs-sm border border-line bg-canvas">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes="48px"
            className={cn("object-cover", status === "offline" && "opacity-30 grayscale")}
          />
        ) : (
          <Cctv aria-hidden className="size-5 text-cyan" strokeWidth={1.5} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="type-label-lg truncate text-fg">{name}</p>
        <p
          className={cn(
            "type-micro mt-1 flex items-center gap-1.5 text-[9px]",
            s.tone === "success" ? "text-success" : s.tone === "critical" ? "text-critical" : "text-muted",
          )}
        >
          <StatusDot tone={s.tone} live={status !== "offline"} /> {s.text}
        </p>
        {location && <p className="type-label-sm mt-0.5 truncate text-subtle">{location}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export type Severity = "low" | "medium" | "high" | "critical";
const sev: Record<Severity, { tone: StatusTone; label: string; bar: string }> = {
  low: { tone: "info", label: "Baixa", bar: "bg-info" },
  medium: { tone: "warning", label: "Média", bar: "bg-warning" },
  high: { tone: "critical", label: "Alta", bar: "bg-critical" },
  critical: { tone: "critical", label: "Crítica", bar: "bg-critical" },
};

/** EVENT DETECTED — evento de segurança com evidência, contexto e ação. */
export function EventCard({
  title,
  severity = "high",
  camera,
  location,
  time,
  image,
  status = "Em análise",
  action,
  className,
}: {
  title: string;
  severity?: Severity;
  camera: string;
  location: string;
  time: string;
  image?: string;
  status?: string;
  action?: ReactNode;
  className?: string;
}) {
  const s = sev[severity];
  return (
    <article className={cn("relative overflow-hidden rounded-rs-md border border-line bg-elevated", className)}>
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-[3px]", s.bar)} />
      <div className="flex gap-4 p-4 pl-5">
        {image && (
          <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-rs-sm border border-line">
            <Image src={image} alt={`Evidência: ${title}`} fill sizes="112px" className="object-cover opacity-80" />
            <SecurityTarget tone={s.tone} className="absolute inset-[28%_30%_18%_34%]" size={7} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "type-micro flex items-center gap-1.5 text-[9px]",
                s.tone === "critical" ? "text-critical" : s.tone === "warning" ? "text-warning" : "text-info",
              )}
            >
              <Siren aria-hidden className="size-3" /> Event detected
            </span>
            <span className="type-micro rounded-rs-xs border border-line px-1.5 py-0.5 text-[8px] text-muted">
              Severidade {s.label}
            </span>
          </div>
          <h3 className="type-heading-sm mt-1.5 text-fg">{title}</h3>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-data text-[11px] text-muted">
            <span className="inline-flex items-center gap-1">
              <Cctv aria-hidden className="size-3" /> {camera}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden className="size-3" /> {location}
            </span>
            <time>{time}</time>
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <span className="type-label-sm flex items-center gap-1.5 text-fg-secondary">
              <StatusDot tone="info" /> {status}
            </span>
            {action}
          </div>
        </div>
      </div>
    </article>
  );
}

/** RESPONSE IN PROGRESS — andamento da resposta a um evento. */
export function ResponseStatus({
  stage = 2,
  team,
  eta,
  className,
}: {
  /** 0 acionado · 1 em deslocamento · 2 no local · 3 concluído */
  stage?: 0 | 1 | 2 | 3;
  team?: string;
  eta?: string;
  className?: string;
}) {
  const steps = ["Acionado", "Em deslocamento", "No local", "Concluído"];
  const done = stage === 3;
  return (
    <div className={cn("rounded-rs-md border border-line bg-elevated p-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <StatusChip
          tone={done ? "success" : "info"}
          live={!done}
          icon={done ? <ShieldCheck aria-hidden className="size-3.5" /> : <Radio aria-hidden className="size-3.5" />}
        >
          {done ? "Response completed" : "Response in progress"}
        </StatusChip>
        {eta && !done && <span className="font-data text-xs text-fg">ETA {eta}</span>}
      </div>
      <ol className="mt-4 grid grid-cols-4 gap-1.5" aria-label="Etapas da resposta">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === stage ? "step" : undefined}>
            <span
              className={cn(
                "block h-1 rounded-full transition-colors duration-(--rs-duration-slow)",
                i < stage || done ? "bg-cyan" : i === stage ? "bg-cyan/60 animate-pulse" : "bg-white/10",
              )}
            />
            <span className={cn("type-label-sm mt-2 block", i <= stage ? "text-fg" : "text-subtle")}>{s}</span>
          </li>
        ))}
      </ol>
      {team && (
        <p className="type-label-sm mt-3 flex items-center gap-1 text-muted">
          Equipe <span className="text-fg">{team}</span> <ChevronRight aria-hidden className="size-3" />
        </p>
      )}
    </div>
  );
}
