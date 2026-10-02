/**
 * RealSeg: Foundation tokens: spacing, radius, borders, shadows, motion,
 * breakpoints, z-index e camadas de profundidade.
 */

/** Escala em múltiplos de 4. `tw` = utilitário Tailwind equivalente (p-*, gap-*, m-*). */
export const spacing = [
  { token: "space-1", px: 4, tw: "1" },
  { token: "space-2", px: 8, tw: "2" },
  { token: "space-3", px: 12, tw: "3" },
  { token: "space-4", px: 16, tw: "4" },
  { token: "space-5", px: 20, tw: "5" },
  { token: "space-6", px: 24, tw: "6" },
  { token: "space-7", px: 32, tw: "8" },
  { token: "space-8", px: 40, tw: "10" },
  { token: "space-9", px: 48, tw: "12" },
  { token: "space-10", px: 64, tw: "16" },
  { token: "space-11", px: 80, tw: "20" },
  { token: "space-12", px: 96, tw: "24" },
  { token: "space-13", px: 120, tw: "30" },
  { token: "space-14", px: 160, tw: "40" },
] as const;

export const radius = {
  xs: { value: "4px", use: "Somente micro elementos: badges, tags HUD, teclas." },
  sm: { value: "8px", use: "Inputs compactos, botões pequenos, chips." },
  md: { value: "12px", use: "Botões, inputs, cards compactos (padrão)." },
  lg: { value: "20px", use: "Cards, painéis, modais." },
  xl: { value: "24px", use: "Containers de destaque, bottom sheet." },
  full: { value: "9999px", use: "Avatares, indicadores, switches." },
} as const;

export const borders = {
  width: { hairline: "1px", focus: "2px" },
  levels: {
    subtle: { value: "rgba(117, 180, 201, 0.08)", use: "Divisores internos, grids." },
    default: { value: "rgba(117, 180, 201, 0.16)", use: "Cards, inputs, containers." },
    strong: { value: "rgba(117, 180, 201, 0.28)", use: "Hover, separação forte." },
    active: { value: "#00E6D1", use: "Foco, seleção, estado ativo." },
  },
} as const;

export const shadows = {
  sm: { value: "0 1px 2px rgba(0, 0, 0, 0.4)", use: "Elementos pouco elevados." },
  md: { value: "0 8px 24px -8px rgba(0, 0, 0, 0.6)", use: "Dropdowns, popovers." },
  lg: { value: "0 24px 48px -16px rgba(0, 0, 0, 0.7)", use: "Cards elevados, drawers." },
  xl: { value: "0 40px 120px -40px rgba(0, 0, 0, 0.85)", use: "Modais." },
} as const;

/** Glow é SINAL de inteligência: nunca decoração. */
export const glows = {
  sm: {
    value: "0 0 0 1px rgba(0, 230, 209, 0.25), 0 0 12px -2px rgba(0, 230, 209, 0.45)",
    use: "Ícone ativo, indicador vivo.",
  },
  md: {
    value: "0 0 0 1px rgba(0, 230, 209, 0.35), 0 0 28px -4px rgba(0, 230, 209, 0.55)",
    use: "Hover do botão primário, foco de card.",
  },
  lg: {
    value: "0 0 0 1px rgba(0, 230, 209, 0.4), 0 0 60px -8px rgba(0, 230, 209, 0.6)",
    use: "Elemento único em destaque por tela.",
  },
} as const;

export const motion = {
  duration: {
    fast: { value: "150ms", use: "Hover, cor, foco." },
    normal: { value: "200ms", use: "Botões, dropdown, tooltip, toggle (Brandbook 05.07)." },
    slow: { value: "500ms", use: "Modal, drawer, card hover." },
    cinematic: { value: "1000ms", use: "Reveal de seção, hero, transições narrativas." },
  },
  easing: {
    standard: { value: "cubic-bezier(0.16, 1, 0.3, 1)", use: "Padrão. Rápido no início, pouso suave." },
    emphasized: { value: "cubic-bezier(0.76, 0, 0.24, 1)", use: "Transições narrativas, mudança de cena." },
    enter: { value: "cubic-bezier(0.22, 1, 0.36, 1)", use: "Elementos que entram." },
    exit: { value: "cubic-bezier(0.64, 0, 0.78, 0)", use: "Elementos que saem." },
  },
  distance: { sm: "8px", md: "24px", lg: "40px" },
  stagger: { tight: "60ms", normal: "90ms" },
} as const;

export const breakpoints = {
  mobile: { min: 0, tw: "(base)", use: "Mobile-first. Até 767px." },
  tablet: { min: 768, tw: "md:", use: "Tablets e telas médias." },
  desktop: { min: 1024, tw: "lg:", use: "Desktop. Grid de 12 colunas." },
  wide: { min: 1440, tw: "wide:", use: "Monitores amplos, centrais." },
} as const;

export const zIndex = {
  base: { value: 0, use: "Fundo (Layer 0)." },
  content: { value: 10, use: "Conteúdo (Layer 1)." },
  ui: { value: 20, use: "Interface (Layer 2)." },
  hud: { value: 30, use: "HUD e overlays gráficos (Layer 3)." },
  interaction: { value: 40, use: "Interação local (Layer 4)." },
  sticky: { value: 100, use: "Elementos sticky." },
  header: { value: 200, use: "Header global." },
  overlay: { value: 300, use: "Backdrop." },
  modal: { value: 400, use: "Modal, drawer, bottom sheet." },
  toast: { value: 500, use: "Toasts." },
  tooltip: { value: 550, use: "Tooltips." },
  cursor: { value: 600, use: "Cursor customizado." },
} as const;

export const depthLayers = [
  { layer: 0, name: "Background", desc: "Imagem, gradiente, grid. Nunca interativo." },
  { layer: 1, name: "Content", desc: "Tipografia e conteúdo editorial." },
  { layer: 2, name: "UI", desc: "Cards, inputs, navegação." },
  { layer: 3, name: "HUD", desc: "Indicadores técnicos, bounding boxes, status." },
  { layer: 4, name: "Interaction", desc: "Foco, hover, cursor, tooltips." },
] as const;

export const container = { max: "1280px", wide: "1440px", gutter: "clamp(1.25rem, 4vw, 3.5rem)" } as const;
