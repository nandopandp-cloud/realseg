import type { Metadata } from "next";
import { safeNext } from "@/design-system/auth/session";
import { AccessGate } from "./AccessGate";

export const metadata: Metadata = { title: "Acesso restrito" };

export default async function AccessPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <AccessGate next={safeNext(next)} />;
}
