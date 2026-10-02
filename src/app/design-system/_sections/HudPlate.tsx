/** Painel "Leitura de placas" reutilizado nos exemplos de case e fotografia. */
export function HudPanelPlate({ className = "absolute left-4 top-4" }: { className?: string }) {
  return (
    <div className={`rs-glass rounded-rs-sm px-3 py-2.5 ${className}`}>
      <p className="type-micro text-[8px] text-cyan">Leitura de placas</p>
      <div className="mt-2 flex items-center gap-2.5">
        <span className="rounded-[3px] bg-fg px-2 py-0.5 font-data text-[11px] font-bold tracking-[0.12em] text-inverse">
          XYZ1A34
        </span>
        <span className="text-[11px] text-fg-secondary">Veículo autorizado</span>
      </div>
    </div>
  );
}
