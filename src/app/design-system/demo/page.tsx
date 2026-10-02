import type { Metadata } from "next";
import { OpsCenter } from "./OpsCenter";

export const metadata: Metadata = { title: "Demo · Central de operações" };

export default function DemoPage() {
  return <OpsCenter />;
}
