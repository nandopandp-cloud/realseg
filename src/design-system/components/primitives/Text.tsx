import type { ElementType, ReactNode } from "react";
import type { TypeScaleName } from "@/design-system/tokens/typography";
import { cn } from "@/lib/utils";

const tones = {
  primary: "text-fg",
  secondary: "text-fg-secondary",
  muted: "text-muted",
  subtle: "text-subtle",
  accent: "text-cyan",
  inverse: "text-inverse",
  success: "text-success",
  warning: "text-warning",
  critical: "text-critical",
} as const;

export type TextTone = keyof typeof tones;

type TextProps = {
  as?: ElementType;
  variant?: TypeScaleName;
  tone?: TextTone;
  balance?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
};

/** Texto tipado pelos tokens. Nunca defina tamanho/peso manualmente. */
export function Text({
  as: Tag = "p",
  variant = "body-md",
  tone = "secondary",
  balance,
  className,
  children,
  id,
}: TextProps) {
  return (
    <Tag id={id} className={cn(`type-${variant}`, tones[tone], balance && "text-balance", className)}>
      {children}
    </Tag>
  );
}

const headingDefaults: Record<string, TypeScaleName> = {
  h1: "display-lg",
  h2: "display-md",
  h3: "heading-lg",
  h4: "heading-md",
  h5: "heading-sm",
  h6: "heading-sm",
};

/** Heading semântico. O nível (h1 a h6) é independente do estilo visual (`variant`). */
export function Heading({
  level = 2,
  variant,
  tone = "primary",
  className,
  children,
  id,
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: TypeScaleName;
  tone?: TextTone;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const Tag = `h${level}` as ElementType;
  return (
    <Text as={Tag} id={id} variant={variant ?? headingDefaults[`h${level}`]} tone={tone} balance className={className}>
      {children}
    </Text>
  );
}

/** Destaque cyan dentro de headlines: use uma vez por título, na palavra-chave. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="rs-text-gradient">{children}</span>;
}
