import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[6px] font-mono uppercase tracking-[0.16em] whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink-950 font-semibold hover:bg-accent-2 hover:shadow-[0_10px_40px_-10px_rgb(0_230_209/0.7)]",
  outline:
    "border border-accent/40 text-fg hover:border-accent hover:bg-accent/[0.06] hover:shadow-[0_0_30px_-12px_rgb(0_230_209/0.8)]",
  ghost: "text-fg/80 hover:text-accent",
};

const sizes = {
  sm: "h-10 px-4 text-[10px]",
  md: "h-12 px-6 text-[11px]",
  lg: "h-14 px-8 text-[11px]",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
  type = "button",
  onClick,
  disabled,
}: Props) {
  const content = (
    <>
      {/* Brilho que atravessa o botão no hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out-expo group-hover/btn:translate-x-[300%] group-hover/btn:opacity-100"
      />
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="relative h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
        />
      )}
    </>
  );
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
