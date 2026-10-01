/** Artigos do RealSeg Insights. PLACEHOLDER: substituir por posts reais / CMS. */
export type Insight = {
  id: string;
  category: string;
  date: string; // ISO
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  href: string;
};

export const insights: Insight[] = [
  {
    id: "futuro-drones",
    category: "Drones",
    date: "2026-09-18",
    title: "O futuro da segurança eletrônica e o papel dos drones",
    excerpt:
      "Como patrulhas aéreas autônomas ampliam a cobertura de grandes áreas e reduzem o tempo de verificação de eventos.",
    image: "/images/ins-drone.jpg",
    readTime: "6 min",
    href: "#",
  },
  {
    id: "ia-monitoramento",
    category: "IA",
    date: "2026-09-09",
    title: "Como a IA está revolucionando o monitoramento urbano",
    excerpt: "Da detecção de objetos à análise de comportamento: o que muda na rotina de uma central.",
    image: "/images/ins-ia.jpg",
    readTime: "5 min",
    href: "#",
  },
  {
    id: "lgpd",
    category: "LGPD",
    date: "2026-08-28",
    title: "LGPD e segurança eletrônica: o que sua empresa precisa saber",
    excerpt: "Imagens são dados pessoais. Entenda bases legais, retenção e governança.",
    image: "/images/ins-lgpd.jpg",
    readTime: "7 min",
    href: "#",
  },
  {
    id: "smart-cities",
    category: "Smart Cities",
    date: "2026-08-14",
    title: "Cidades inteligentes começam pela integração de dados",
    excerpt: "Câmeras, sensores e sistemas públicos conversando em uma mesma camada.",
    image: "/images/ins-smartcity.jpg",
    readTime: "4 min",
    href: "#",
  },
  {
    id: "cftv-ip",
    category: "Segurança eletrônica",
    date: "2026-07-30",
    title: "Do CFTV analógico à câmera que interpreta a cena",
    excerpt: "O que considerar ao modernizar um parque de câmeras.",
    image: "/images/ins-cftv.jpg",
    readTime: "5 min",
    href: "#",
  },
  {
    id: "edge-computing",
    category: "Tecnologia",
    date: "2026-07-16",
    title: "Edge computing: inteligência na ponta da rede",
    excerpt: "Processar vídeo perto da câmera reduz latência e consumo de banda.",
    image: "/images/ins-tech.jpg",
    readTime: "4 min",
    href: "#",
  },
];
