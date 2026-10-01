/**
 * Cases de sucesso.
 * PLACEHOLDER: textos e resultados precisam ser validados pela RealSeg.
 * O primeiro case segue a referência visual; os demais são modelos editáveis.
 */
export type CaseStudy = {
  id: string;
  segment: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metric: { value: string; label: string };
  image: string;
  /** Overlay HUD exibido sobre a imagem. */
  hud: "lpr" | "access" | "retail" | "perimeter";
};

export const cases: CaseStudy[] = [
  {
    id: "muralha-digital",
    segment: "Cidades",
    title: "Muralha digital para uma cidade mais segura.",
    challenge: "Acessos ao município sem visibilidade sobre a circulação de veículos com restrição.",
    solution: "Sistema de leitura de placas (LPR) nos acessos, integrado ao 190 e a bases de dados.",
    result: "Mais segurança e agilidade na resposta a incidentes.",
    metric: { value: "-80%", label: "Veículos irregulares em circulação" },
    image: "/images/case-cidade.jpg",
    hud: "lpr",
  },
  {
    id: "portaria-inteligente",
    segment: "Condomínios",
    title: "Portaria inteligente sem perder a proximidade.",
    challenge: "Custo elevado de portaria física e falhas no controle de visitantes.",
    solution: "Portaria remota com controle de acesso, interfonia IP e monitoramento 24/7 pela Central.",
    result: "Acesso rastreável e operação mais eficiente para moradores.",
    metric: { value: "24/7", label: "Acesso monitorado pela Central" },
    image: "/images/case-condominio.jpg",
    hud: "access",
  },
  {
    id: "prevencao-de-perdas",
    segment: "Mercados",
    title: "Prevenção de perdas guiada por dados.",
    challenge: "Perdas recorrentes em áreas de maior giro, sem evidência para agir.",
    solution: "Analytics de vídeo com mapas de calor e alertas de comportamento em pontos críticos.",
    result: "Decisões baseadas em evidências e equipes posicionadas onde importa.",
    metric: { value: "IA", label: "Alertas de comportamento em tempo real" },
    image: "/images/case-varejo.jpg",
    hud: "retail",
  },
  {
    id: "ambiente-critico",
    segment: "Hospitais",
    title: "Ambientes críticos sob controle contínuo.",
    challenge: "Circulação intensa de pessoas e áreas restritas sem controle unificado.",
    solution: "Controle de acesso por zonas, videomonitoramento e protocolos de resposta integrados.",
    result: "Áreas sensíveis protegidas sem atrito para pacientes e equipes.",
    metric: { value: "100%", label: "Áreas restritas sob controle de acesso" },
    image: "/images/case-hospital.jpg",
    hud: "perimeter",
  },
];
