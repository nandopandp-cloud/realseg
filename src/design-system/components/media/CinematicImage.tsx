import Image from "next/image";
import type { ReactNode } from "react";
import { cn, positioned } from "@/lib/utils";
import { SecurityGrid, SecurityScan } from "@/design-system/components/graphics/Surfaces";
import { Reveal } from "@/design-system/components/motion/Motion";

/**
 * Tratamento de imagem RealSeg (Brandbook 09):
 *   01 imagem original → 02 color grading → 03 overlay → 04 elementos gráficos
 *
 * `grade="brand"` aplica o grading em CSS (tons frios, alto contraste): útil para
 * fotos não tratadas. Fotos oficiais já tratadas devem usar `grade="none"`.
 */
export function CinematicImage({
  src,
  alt,
  grade = "none",
  overlay = "gradient",
  grid = false,
  scan = false,
  frame = false,
  hud,
  reveal = false,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  rounded = true,
  className,
}: {
  src: string;
  alt: string;
  grade?: "none" | "brand";
  overlay?: "none" | "midnight" | "gradient" | "vignette";
  grid?: boolean;
  scan?: boolean;
  frame?: boolean;
  /** Elementos HUD (Layer 3) posicionados sobre a imagem. */
  hud?: ReactNode;
  reveal?: boolean;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
}) {
  const body = (
    <div
      className={cn(
        positioned(className),
        "overflow-hidden bg-canvas",
        rounded && "rounded-rs-lg border border-line-subtle",
        aspect,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        className={cn("object-cover", grade === "brand" && "[filter:saturate(0.55)_contrast(1.12)_brightness(0.78)]")}
      />
      {grade === "brand" && (
        <>
          <div aria-hidden className="absolute inset-0 bg-[#0c3a48] mix-blend-color opacity-45" />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-b from-[#02081130] to-[#020811a0] mix-blend-multiply"
          />
        </>
      )}
      {overlay === "midnight" && <div aria-hidden className="absolute inset-0 bg-canvas/55" />}
      {overlay === "gradient" && (
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/30 to-canvas/10" />
      )}
      {overlay === "vignette" && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(2_8_17/0.85))]"
        />
      )}
      {grid && <SecurityGrid size={48} intensity={1.2} />}
      {scan && <SecurityScan duration={7} />}
      {frame && <div aria-hidden className="rs-frame absolute inset-4 [--rs-frame-size:16px]" />}
      {hud && <div className="absolute inset-0">{hud}</div>}
    </div>
  );
  return reveal ? <Reveal variant="clip">{body}</Reveal> : body;
}
