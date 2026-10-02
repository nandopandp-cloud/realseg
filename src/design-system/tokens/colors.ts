/**
 * RealSeg: Color tokens
 * Fonte: Brandbook v1.0 · 03 Paleta de cores.
 *
 * Camada 1 (primitives): valores brutos. Nunca usar diretamente em componentes.
 * Camada 2 (semantic): papéis de cor. Componentes consomem SOMENTE estes.
 */

export const palette = {
  midnight: "#020811", // fundo principal, hero, navegação e footer
  deep: "#06121D", // seções, cards e containers
  navy: "#081A27", // componentes, painéis e interfaces
  panel: "#0B2231", // hover, superfícies e destaques
  surface: "#0F2A3A", // superfícies evidenciadas
  cyan: "#00E6D1", // cor da inteligência: CTAs, links, indicadores
  cyanLight: "#42FFF0", // highlights, hover, glow: uso restrito
  white: "#F5FBFF", // texto principal
  muted: "#8295A6", // texto secundário
  subtle: "#4F6476", // metadados, legendas não essenciais
  disabled: "#3A505F", // desabilitado
  success: "#39E58C",
  warning: "#FFB84D",
  critical: "#FF5C67",
  info: "#5AA9FF",
  steel: "#5F86A3", // azul acinzentado para dados secundários
} as const;

/** Cor base das bordas: rgba(117,180,201,α). */
const line = (a: number) => `rgba(117, 180, 201, ${a})`;
const cyanA = (a: number) => `rgba(0, 230, 209, ${a})`;
const midnightA = (a: number) => `rgba(2, 8, 17, ${a})`;

export const semantic = {
  background: {
    primary: palette.midnight,
    secondary: palette.deep,
    elevated: palette.navy,
    panel: palette.panel,
    surface: palette.surface,
    overlay: midnightA(0.72),
    inverse: palette.white,
  },
  text: {
    primary: palette.white,
    secondary: "#B4C3CF",
    muted: palette.muted,
    subtle: palette.subtle,
    disabled: palette.disabled,
    inverse: palette.midnight,
    accent: palette.cyan,
  },
  border: {
    subtle: line(0.08),
    default: line(0.16),
    strong: line(0.28),
    focus: palette.cyan,
    active: palette.cyan,
  },
  action: {
    primary: palette.cyan,
    primaryHover: palette.cyanLight,
    primaryForeground: palette.midnight,
    secondary: cyanA(0.45),
    secondaryHover: cyanA(0.08),
    danger: palette.critical,
  },
  status: {
    success: palette.success,
    warning: palette.warning,
    critical: palette.critical,
    info: palette.info,
  },
  data: {
    series1: palette.cyan,
    series2: palette.white,
    series3: palette.steel,
    series4: "#2E5A70",
    grid: line(0.1),
  },
} as const;

export const gradients = {
  principal: `linear-gradient(90deg, ${palette.midnight}, ${palette.cyan})`,
  highlight: `linear-gradient(90deg, ${palette.deep}, ${palette.cyanLight})`,
  text: `linear-gradient(100deg, ${palette.cyan} 10%, ${palette.cyanLight} 55%, #b7fff8 100%)`,
  fadeBottom: `linear-gradient(to top, ${palette.midnight}, transparent)`,
} as const;

/** Metadados para a documentação. */
export const paletteDocs = [
  { token: "midnight", name: "RealSeg Midnight", use: "Fundo principal, hero, navegação e footer." },
  { token: "deep", name: "RealSeg Deep", use: "Seções, cards e containers." },
  { token: "navy", name: "RealSeg Navy", use: "Componentes, painéis e interfaces." },
  { token: "panel", name: "RealSeg Panel", use: "Estados hover, superfícies e destaques." },
  { token: "cyan", name: "RealSeg Cyan", use: "Cor da inteligência. CTAs, links, indicadores, ícones." },
  { token: "cyanLight", name: "RealSeg Cyan Light", use: "Highlights, hover, glow. Uso restrito." },
] as const;

export const supportDocs = [
  { token: "white", name: "White", use: "Texto principal." },
  { token: "muted", name: "Muted", use: "Texto secundário." },
  { token: "subtle", name: "Subtle", use: "Metadados e legendas não essenciais." },
  { token: "surface", name: "Surface", use: "Superfícies evidenciadas." },
] as const;

export const statusDocs = [
  { token: "success", name: "Success", use: "Estados positivos, operação ativa." },
  { token: "warning", name: "Warning", use: "Alertas e atenção." },
  { token: "critical", name: "Critical", use: "Eventos críticos. Usar com parcimônia." },
  { token: "info", name: "Info", use: "Informação e atualizações do sistema." },
] as const;
