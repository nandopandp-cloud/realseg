import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Drone, Flame, KeyRound, MonitorDot, ScanFace, ScanLine, Waypoints } from "lucide-react";

export type Technology = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const technologies: Technology[] = [
  {
    id: "ia",
    title: "IA & Visão Computacional",
    description: "Modelos que interpretam cenas, classificam objetos e reconhecem padrões em tempo real.",
    icon: BrainCircuit,
  },
  {
    id: "facial",
    title: "Reconhecimento Facial",
    description: "Identificação em pontos de acesso e áreas sensíveis, com governança e conformidade à LGPD.",
    icon: ScanFace,
  },
  {
    id: "lpr",
    title: "Leitura de Placas (LPR / OCR)",
    description: "Leitura automática de placas integrada a listas de interesse e bases de dados.",
    icon: ScanLine,
  },
  {
    id: "remoto",
    title: "Monitoramento Remoto",
    description: "Operação contínua a partir da Central RealSeg, com protocolos estruturados.",
    icon: MonitorDot,
  },
  {
    id: "drones",
    title: "Drones",
    description: "Patrulhas aéreas e cobertura rápida de grandes áreas e eventos.",
    icon: Drone,
  },
  {
    id: "acesso",
    title: "Controle de Acesso",
    description: "Gestão de entradas e saídas com credenciais, biometria e rastreabilidade.",
    icon: KeyRound,
  },
  {
    id: "calor",
    title: "Mapas de Calor",
    description: "Leitura de fluxo e comportamento para decisões operacionais e de layout.",
    icon: Flame,
  },
  {
    id: "integracoes",
    title: "Integrações",
    description: "Conexão com sistemas de terceiros, alarmes, ERPs e centrais públicas.",
    icon: Waypoints,
  },
];

export const techPhases = ["Câmera", "Visão computacional", "Dados", "Inteligência"] as const;
