import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BrainCircuit,
  Building,
  Building2,
  Car,
  Cctv,
  ChartColumnIncreasing,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crosshair,
  Download,
  Drone,
  Fingerprint,
  GraduationCap,
  Hospital,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Link2,
  MapPin,
  Menu,
  Minus,
  MonitorDot,
  Plus,
  Radar,
  ScanFace,
  ScanLine,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Siren,
  User,
  Users,
  X,
  House,
  Flame,
  Route,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Registro semântico de ícones RealSeg.
 * Times usam o NOME semântico (`camera`, `lpr`…), nunca o nome da biblioteca:
 * trocar o ícone de um conceito passa a ser uma alteração em um único lugar.
 */
export const icons = {
  // Segurança & operação
  security: ShieldCheck,
  monitoring: MonitorDot,
  camera: Cctv,
  ai: BrainCircuit,
  "facial-recognition": ScanFace,
  lpr: ScanLine,
  drone: Drone,
  radar: Radar,
  location: MapPin,
  alert: Bell,
  siren: Siren,
  analytics: ChartColumnIncreasing,
  activity: Activity,
  "access-control": KeyRound,
  biometrics: Fingerprint,
  vehicle: Car,
  route: Route,
  heatmap: Flame,
  target: Crosshair,
  time: Clock,
  integrations: Link2,
  dashboard: LayoutDashboard,
  // Segmentos
  city: Landmark,
  building: Building2,
  condo: Building,
  home: House,
  hospital: Hospital,
  school: GraduationCap,
  shopping: ShoppingBag,
  market: ShoppingCart,
  // Interface
  user: User,
  users: Users,
  settings: Settings,
  search: Search,
  menu: Menu,
  arrow: ArrowRight,
  "arrow-up-right": ArrowUpRight,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  close: X,
  check: Check,
  plus: Plus,
  minus: Minus,
  download: Download,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/** Tamanhos oficiais (grid 24px). */
export const iconSizes = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32, "2xl": 48 } as const;
export type IconSize = keyof typeof iconSizes;

const tones = {
  current: "",
  primary: "text-cyan",
  secondary: "text-cyan-light",
  success: "text-success",
  warning: "text-warning",
  critical: "text-critical",
  neutral: "text-fg",
  muted: "text-muted",
  disabled: "text-disabled",
} as const;

type IconProps = Omit<LucideProps, "size"> & {
  name: IconName;
  size?: IconSize;
  tone?: keyof typeof tones;
  /** outline (padrão) · container · container-active */
  variant?: "outline" | "container" | "container-active";
  label?: string;
};

/**
 * Ícone oficial. Stroke 1.5px até 24px; 1.75px em tamanhos maiores para manter o peso óptico.
 * Decorativo por padrão (aria-hidden); passe `label` quando o ícone carregar significado sozinho.
 */
export function Icon({
  name,
  size = "md",
  tone = "current",
  variant = "outline",
  label,
  className,
  ...rest
}: IconProps) {
  const Cmp = icons[name];
  const px = iconSizes[size];
  const glyph = (
    <Cmp
      width={px}
      height={px}
      strokeWidth={px >= 32 ? 1.75 : 1.5}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      className={cn("shrink-0", tones[tone], variant === "outline" && className)}
      {...rest}
    />
  );
  if (variant === "outline") return glyph;

  const box = Math.round(px * 2);
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-rs-md border transition-[border-color,background-color,box-shadow] duration-(--rs-duration-fast)",
        variant === "container-active"
          ? "border-cyan/60 bg-cyan/10 text-cyan shadow-glow-sm"
          : "border-line bg-elevated text-cyan",
        className,
      )}
      style={{ width: box, height: box }}
    >
      {glyph}
    </span>
  );
}

/** Ícone proprietário LPR/OCR (Brandbook 07.04). */
export function LprIcon({ size = "md", className }: { size?: IconSize; className?: string }) {
  const px = iconSizes[size];
  return (
    <svg width={px} height={px} viewBox="0 0 24 24" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="12"
        y="14.2"
        textAnchor="middle"
        fontSize="6.4"
        fontWeight="700"
        fill="currentColor"
        fontFamily="var(--font-inter)"
      >
        LPR
      </text>
    </svg>
  );
}
