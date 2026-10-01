import type { LucideIcon } from "lucide-react";
import { Building2, GraduationCap, HeartPulse, Landmark, ShoppingBag, ShoppingCart } from "lucide-react";

export type Segment = {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon: LucideIcon;
};

export const segments: Segment[] = [
  {
    id: "cidades",
    index: "01",
    title: "Cidades",
    description: "Inteligência para proteger territórios inteiros.",
    tags: ["LPR", "Videomonitoramento", "Integração 190"],
    image: "/images/seg-cidades.jpg",
    icon: Landmark,
  },
  {
    id: "condominios",
    index: "02",
    title: "Condomínios",
    description: "Mais controle. Mais tranquilidade.",
    tags: ["Portaria remota", "Controle de acesso"],
    image: "/images/seg-condominios.jpg",
    icon: Building2,
  },
  {
    id: "escolas",
    index: "03",
    title: "Escolas",
    description: "Proteção para quem está aprendendo.",
    tags: ["Perímetro", "Acesso seguro"],
    image: "/images/seg-escolas.jpg",
    icon: GraduationCap,
  },
  {
    id: "hospitais",
    index: "04",
    title: "Hospitais",
    description: "Segurança para ambientes críticos.",
    tags: ["Áreas restritas", "Fluxo de pessoas"],
    image: "/images/seg-hospitais.jpg",
    icon: HeartPulse,
  },
  {
    id: "shoppings",
    index: "05",
    title: "Shoppings",
    description: "Segurança sem interferir na experiência.",
    tags: ["Mapas de calor", "Analytics"],
    image: "/images/seg-shoppings.jpg",
    icon: ShoppingBag,
  },
  {
    id: "mercados",
    index: "06",
    title: "Mercados",
    description: "Prevenção de perdas e mais eficiência operacional.",
    tags: ["Prevenção de perdas", "IA"],
    image: "/images/seg-mercados.jpg",
    icon: ShoppingCart,
  },
];
