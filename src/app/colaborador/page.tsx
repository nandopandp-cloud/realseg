import type { Metadata } from "next";
import { CollaboratorLogin } from "./CollaboratorLogin";

export const metadata: Metadata = {
  title: "Área do colaborador · RealSeg",
  description: "Acesso exclusivo para colaboradores RealSeg.",
  robots: { index: false, follow: false },
};

export default function CollaboratorPage() {
  return <CollaboratorLogin />;
}
