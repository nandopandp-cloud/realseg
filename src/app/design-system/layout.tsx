import type { Metadata } from "next";
import { ToastProvider } from "@/design-system/components/feedback/Toast";

/** Material interno: nunca indexar. A proteção de acesso fica em src/proxy.ts. */
export const metadata: Metadata = {
  title: { default: "RealSeg Design System", template: "%s · RealSeg Design System" },
  description: "Documentação interna da linguagem digital RealSeg, de uso restrito aos times de design e engenharia.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: null,
  twitter: null,
};

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
