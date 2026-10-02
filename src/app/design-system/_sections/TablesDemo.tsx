"use client";

import { useState } from "react";
import { SecurityEventTable, DataTable } from "@/design-system/components/data-display/DataTable";
import { Badge } from "@/design-system/components/feedback/Badge";
import { Segmented } from "../_components/Playground";
import { demoEvents } from "../_data/demo";

type S = "default" | "loading" | "empty" | "error";

export function EventTableDemo() {
  const [state, setState] = useState<S>("default");
  return (
    <div className="space-y-4">
      <div className="max-w-md">
        <Segmented
          label="Estado da tabela"
          value={state}
          options={["default", "loading", "empty", "error"] as const}
          onChange={setState}
        />
      </div>
      <SecurityEventTable events={demoEvents} state={state} onRetry={() => setState("default")} />
    </div>
  );
}

export function CompactTableDemo() {
  const rows = [
    { id: "c1", device: "CAM 0217", type: "Câmera", sector: "Setor 04", uptime: 99.98, status: "online" },
    { id: "c2", device: "LPR 0042", type: "LPR", sector: "Av. Brasil", uptime: 99.71, status: "online" },
    { id: "c3", device: "DRN 0002", type: "Drone", sector: "Perímetro", uptime: 97.2, status: "missão" },
    { id: "c4", device: "CAM 1187", type: "Câmera", sector: "Shopping", uptime: 88.4, status: "offline" },
  ];
  return (
    <DataTable
      caption="Dispositivos"
      density="compact"
      rows={rows}
      columns={[
        { key: "device", header: "Dispositivo", sortable: true, data: true },
        { key: "type", header: "Tipo" },
        { key: "sector", header: "Local" },
        {
          key: "uptime",
          header: "Uptime",
          align: "right",
          data: true,
          sortable: true,
          render: (r) => `${r.uptime.toFixed(2).replace(".", ",")}%`,
        },
        {
          key: "status",
          header: "Status",
          render: (r) => (
            <Badge
              tone={r.status === "online" ? "success" : r.status === "offline" ? "neutral" : "info"}
              dot
              live={r.status !== "offline"}
            >
              {r.status}
            </Badge>
          ),
        },
      ]}
    />
  );
}
