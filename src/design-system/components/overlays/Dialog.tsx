"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "modal" | "drawer" | "sheet";

/**
 * Dialog — base de Modal, Drawer e Bottom Sheet.
 * Usa <dialog> nativo: foco preso, Esc fecha, inerte por trás, sem dependências.
 * Sempre: dark, glass, borda sutil, hierarquia clara (ícone · título · descrição · ações).
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  variant = "modal",
  size = "md",
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const layout: Record<Variant, string> = {
    modal: cn(
      "m-auto w-[calc(100vw-2rem)] rounded-rs-lg animate-[rs-dialog-in_var(--rs-duration-slow)_var(--rs-ease-standard)]",
      { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" }[size],
    ),
    drawer:
      "ml-auto mr-0 h-dvh max-h-dvh w-[min(440px,100vw)] rounded-none rounded-l-rs-lg animate-[rs-drawer-in_var(--rs-duration-slow)_var(--rs-ease-standard)]",
    sheet:
      "mb-0 mt-auto w-full max-w-none rounded-none rounded-t-rs-xl animate-[rs-sheet-in_var(--rs-duration-slow)_var(--rs-ease-standard)] sm:mx-auto sm:max-w-xl",
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={cn(
        "rs-glass max-h-[calc(100dvh-2rem)] overflow-hidden border-line p-0 text-fg shadow-rs-xl",
        "backdrop:bg-canvas/75 backdrop:backdrop-blur-sm",
        layout[variant],
        className,
      )}
    >
      {open && (
        <div className={cn("relative flex max-h-[inherit] flex-col", variant === "drawer" && "h-full")}>
          <span aria-hidden className="absolute left-0 top-0 h-px w-16 bg-cyan" />
          {variant === "sheet" && <span aria-hidden className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/15" />}
          <header className="flex items-start gap-4 p-6 pb-4">
            {icon && <span className="mt-0.5 shrink-0 text-cyan">{icon}</span>}
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="type-heading-md text-fg">
                {title}
              </h2>
              {description && (
                <div id={descId} className="type-body-sm mt-1.5 text-fg-secondary">
                  {description}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className="rs-focus rs-hit -mr-1 -mt-1 grid size-8 shrink-0 place-items-center rounded-rs-sm text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              <X className="size-4" />
            </button>
          </header>
          {children && <div className="rs-scrollbar min-h-0 flex-1 overflow-auto px-6 pb-6">{children}</div>}
          {footer && (
            <footer className="flex flex-wrap justify-end gap-3 border-t border-line-subtle bg-canvas/40 px-6 py-4">
              {footer}
            </footer>
          )}
        </div>
      )}
    </dialog>
  );
}

export const Modal = (p: Omit<Parameters<typeof Dialog>[0], "variant">) => <Dialog {...p} variant="modal" />;
export const Drawer = (p: Omit<Parameters<typeof Dialog>[0], "variant">) => <Dialog {...p} variant="drawer" />;
export const BottomSheet = (p: Omit<Parameters<typeof Dialog>[0], "variant">) => <Dialog {...p} variant="sheet" />;
