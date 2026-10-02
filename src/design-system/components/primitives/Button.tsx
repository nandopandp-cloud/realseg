import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/design-system/components/feedback/Spinner";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Brandbook 05 — Botões e interações.
 * Altura 56/46/40 · Inter 700 uppercase · raio 12px · transição 200ms.
 * Microinterações: elevação -2px, glow suave, ícone desliza no eixo X.
 */
const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-bold uppercase tracking-[0.04em] rs-focus " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-(--rs-duration-normal) ease-rs-standard " +
  "disabled:pointer-events-none aria-disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan text-inverse hover:-translate-y-0.5 hover:bg-cyan-light hover:shadow-glow-md active:translate-y-0 active:scale-[0.98] " +
    "disabled:bg-panel disabled:text-disabled disabled:shadow-none aria-disabled:bg-panel aria-disabled:text-disabled",
  secondary:
    "border border-cyan/45 text-cyan hover:-translate-y-0.5 hover:border-cyan hover:bg-cyan/[0.08] hover:text-cyan-light hover:shadow-glow-sm active:translate-y-0 active:scale-[0.98] " +
    "disabled:border-line disabled:text-disabled aria-disabled:border-line aria-disabled:text-disabled",
  ghost:
    "text-fg hover:bg-white/[0.04] hover:text-cyan active:scale-[0.98] disabled:text-disabled aria-disabled:text-disabled",
  danger:
    "border border-critical/50 bg-critical/[0.1] text-critical hover:-translate-y-0.5 hover:bg-critical/[0.18] hover:border-critical active:translate-y-0 " +
    "disabled:border-line disabled:bg-transparent disabled:text-disabled",
  link: "h-auto! px-0! text-cyan hover:text-cyan-light disabled:text-disabled",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[11px] rounded-rs-sm",
  md: "h-[46px] px-6 text-[13px] rounded-rs-md",
  lg: "h-14 px-8 text-[15px] rounded-rs-md",
};

const iconSize: Record<ButtonSize, string> = { sm: "size-3.5", md: "size-4", lg: "size-[18px]" };

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Ícone à esquerda (componente já renderizado). */
  icon?: ReactNode;
  /** Seta à direita, que desliza no hover. Padrão: true no primary/secondary/link. */
  arrow?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsButton = Common & Omit<ComponentPropsWithoutRef<"button">, keyof Common> & { href?: undefined };
type AsLink = Common & { href: string; target?: string; rel?: string; onClick?: () => void; disabled?: boolean };

export function Button(props: AsButton | AsLink) {
  const {
    variant = "primary",
    size = "md",
    icon,
    arrow = variant === "primary" || variant === "secondary" || variant === "link",
    loading,
    loadingLabel,
    fullWidth,
    className,
    children,
  } = props;

  const cls = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
  const content = (
    <>
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} tone="current" /> : icon}
      <span
        className={cn(
          variant === "link" &&
            "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-(--rs-duration-slow) ease-rs-standard group-hover/btn:bg-[length:100%_1px]",
        )}
      >
        {loading ? (loadingLabel ?? children) : children}
      </span>
      {arrow && !loading && (
        <ArrowRight
          aria-hidden
          className={cn(
            iconSize[size],
            "transition-transform duration-(--rs-duration-normal) ease-rs-standard group-hover/btn:translate-x-1",
          )}
        />
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, onClick, disabled } = props;
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={cls}
      >
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    icon: _i,
    arrow: _a,
    loading: _l,
    loadingLabel: _ll,
    fullWidth: _f,
    className: _c,
    children: _ch,
    type = "button",
    disabled,
    ...rest
  } = props as AsButton;
  void [_v, _s, _i, _a, _l, _ll, _f, _c, _ch];
  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={cls} {...rest}>
      {content}
    </button>
  );
}

/** Botão somente ícone. `label` é obrigatório (acessibilidade). */
export function IconButton({
  label,
  children,
  variant = "secondary",
  size = "md",
  className,
  ...rest
}: Omit<ComponentPropsWithoutRef<"button">, "children"> & {
  label: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: ButtonSize;
}) {
  const dims = { sm: "size-10 rounded-rs-sm", md: "size-[46px] rounded-rs-md", lg: "size-14 rounded-rs-md" }[size];
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(base, variants[variant], dims, "px-0", className)}
      {...rest}
    >
      {children}
    </button>
  );
}
