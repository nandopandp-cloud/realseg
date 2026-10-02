import type { SecurityEvent } from "@/design-system/components/data-display/DataTable";

/** Dados ilustrativos para documentação e demo. Não representam operação real. */
export const demoEvents: SecurityEvent[] = [
  {
    id: "EV-2041",
    time: "21:42:08",
    camera: "ACS-0118",
    event: "Acesso não autorizado",
    location: "Portão B · Setor 04",
    severity: "critical",
    status: "Novo",
  },
  {
    id: "EV-2040",
    time: "21:38:51",
    camera: "LPR-0042",
    event: "Veículo com restrição",
    location: "Av. Brasil · km 12",
    severity: "high",
    status: "Em análise",
  },
  {
    id: "EV-2039",
    time: "21:31:17",
    camera: "CAM-0217",
    event: "Permanência em área restrita",
    location: "Setor 04",
    severity: "high",
    status: "Em análise",
  },
  {
    id: "EV-2038",
    time: "21:22:40",
    camera: "CAM-1187",
    event: "Aglomeração acima do padrão",
    location: "Shopping · Piso 2",
    severity: "medium",
    status: "Respondido",
  },
  {
    id: "EV-2037",
    time: "21:09:02",
    camera: "SNS-0310",
    event: "Porta mantida aberta",
    location: "Hospital · Ala C",
    severity: "medium",
    status: "Respondido",
  },
  {
    id: "EV-2036",
    time: "20:57:33",
    camera: "DRN-0002",
    event: "Patrulha aérea concluída",
    location: "Perímetro norte",
    severity: "low",
    status: "Respondido",
  },
];

export const hours = ["00h", "02h", "04h", "06h", "08h", "10h", "12h", "14h", "16h", "18h", "20h", "22h"];
export const eventsByHour = [12, 8, 6, 9, 18, 24, 31, 28, 26, 34, 41, 37];
export const eventsLastWeek = [14, 9, 7, 10, 15, 21, 27, 30, 24, 29, 33, 30];

export const heatRows = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
export const heatCols = ["00", "03", "06", "09", "12", "15", "18", "21"];
export const heatValues = [
  [2, 1, 1, 4, 6, 7, 9, 6],
  [1, 1, 2, 5, 7, 6, 8, 7],
  [2, 0, 1, 4, 6, 8, 10, 8],
  [1, 1, 1, 5, 7, 7, 9, 9],
  [3, 2, 1, 6, 8, 9, 12, 14],
  [5, 4, 2, 3, 7, 10, 13, 15],
  [4, 3, 1, 2, 5, 7, 8, 9],
];
