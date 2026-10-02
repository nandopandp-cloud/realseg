import type { LucideIcon } from "lucide-react";
import { Activity, Blocks, Clock, Users } from "lucide-react";

/**
 * PLACEHOLDER: valores da referência visual: confirmar com a RealSeg antes de publicar.
 * `value` é o número animado; `prefix`/`suffix` envolvem o número.
 * Para valores não numéricos (ex.: 24/7), use `static`.
 */
export type Metric = {
  id: string;
  label: string;
  icon: LucideIcon;
  value?: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
  static?: string;
};

export const metrics: Metric[] = [
  { id: "atendimentos", value: 2400, prefix: "+", label: "Atendimentos realizados", icon: Activity },
  { id: "clientes", value: 150, prefix: "+", label: "Clientes atendidos", icon: Users },
  { id: "monitoramento", static: "24/7", label: "Monitoramento ativo", icon: Clock },
  { id: "segmentos", value: 6, pad: 2, label: "Segmentos de atuação", icon: Blocks },
];
