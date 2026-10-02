import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  as?: "h1" | "h2" | "h3";
  lines: ReactNode[];
  className?: string;
  id?: string;
};

/** Headline com cada linha mascarada: animada pelo MotionSystem (`[data-split]`). */
export function SplitHeading({ as: Tag = "h2", lines, className, id }: Props) {
  return (
    <Tag id={id} data-split className={cn("display", className)}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className="line-inner">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
