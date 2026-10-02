"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CircleCheck, Info, OctagonAlert, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "success" | "warning" | "critical";
type ToastItem = { id: number; tone: Tone; title: string; message?: string };

const Ctx = createContext<(t: Omit<ToastItem, "id">) => void>(() => {});

const icon = { info: Info, success: CircleCheck, warning: TriangleAlert, critical: OctagonAlert };
const color = { info: "text-info", success: "text-success", warning: "text-warning", critical: "text-critical" };

/** Provider de toasts. Envolva a aplicação uma única vez. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => setItems((p) => p.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = Date.now() + Math.random();
      setItems((p) => [...p.slice(-3), { ...t, id }]);
      setTimeout(() => dismiss(id), t.tone === "critical" ? 8000 : 5000);
    },
    [dismiss],
  );

  return (
    <Ctx.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed bottom-4 right-4 z-(--rs-z-toast) flex w-[min(380px,calc(100vw-2rem))] flex-col gap-2"
      >
        {items.map((t) => {
          const I = icon[t.tone];
          return (
            <div
              key={t.id}
              role={t.tone === "critical" ? "alert" : "status"}
              className="rs-glass pointer-events-auto relative flex animate-rs-enter gap-3 overflow-hidden rounded-rs-md p-4 pr-11 shadow-rs-lg"
            >
              <span aria-hidden className={cn("absolute inset-y-0 left-0 w-[2px] bg-current", color[t.tone])} />
              <I aria-hidden className={cn("mt-0.5 size-[18px] shrink-0", color[t.tone])} strokeWidth={1.75} />
              <div className="min-w-0">
                <p className="type-label-lg text-fg">{t.title}</p>
                {t.message && <p className="type-body-sm mt-0.5 text-fg-secondary">{t.message}</p>}
              </div>
              <button
                type="button"
                aria-label="Fechar notificação"
                onClick={() => dismiss(t.id)}
                className="rs-focus absolute right-3 top-3 grid size-7 place-items-center rounded-rs-sm text-muted hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);
