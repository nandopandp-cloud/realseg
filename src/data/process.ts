export type ProcessStep = {
  id: "observar" | "analisar" | "alertar" | "responder";
  index: string;
  title: string;
  description: string;
  detail: string;
  status: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "observar",
    index: "01",
    title: "Observar",
    description: "Câmeras, sensores e dados integrados.",
    detail: "Imagens, sensores e sistemas conectados em uma única camada de visibilidade sobre o ambiente.",
    status: "MONITORING",
  },
  {
    id: "analisar",
    index: "02",
    title: "Analisar",
    description: "Inteligência artificial em tempo real.",
    detail:
      "Visão computacional classifica pessoas, veículos e comportamentos, e separa o que é rotina do que é risco.",
    status: "ANALYZING",
  },
  {
    id: "alertar",
    index: "03",
    title: "Alertar",
    description: "Identificação de riscos e anomalias.",
    detail:
      "Eventos relevantes viram alertas priorizados, com contexto, imagem e localização para quem precisa decidir.",
    status: "EVENT DETECTED",
  },
  {
    id: "responder",
    index: "04",
    title: "Responder",
    description: "Apoio à tomada de decisão.",
    detail: "Operadores especializados acionam protocolos, equipes e autoridades com rapidez e rastreabilidade.",
    status: "RESPONSE",
  },
];

/** Etapas exibidas no radar de Security Intelligence. */
export const intelligencePipeline = [
  { id: "camera", label: "Câmera", code: "CAPTURE" },
  { id: "ai", label: "IA", code: "INFERENCE" },
  { id: "event", label: "Evento", code: "CLASSIFY" },
  { id: "alert", label: "Alerta", code: "PRIORITIZE" },
  { id: "response", label: "Resposta", code: "DISPATCH" },
] as const;

/** Log simulado: apenas ilustrativo, não representa dados reais. */
export const simulatedEvents = [
  { cam: "CAM-0217", text: "Movimento em área restrita", level: "alto" },
  { cam: "LPR-0042", text: "Veículo com restrição identificado", level: "alto" },
  { cam: "CAM-1187", text: "Aglomeração acima do padrão", level: "medio" },
  { cam: "SNS-0310", text: "Porta de acesso mantida aberta", level: "medio" },
  { cam: "CAM-0954", text: "Objeto abandonado detectado", level: "alto" },
  { cam: "DRN-0002", text: "Patrulha aérea concluída", level: "baixo" },
  { cam: "CAM-0631", text: "Permanência prolongada em perímetro", level: "medio" },
  { cam: "ACS-0118", text: "Tentativa de acesso não autorizado", level: "alto" },
] as const;
