import type { Technology } from "@/data/technologies";
import { cn } from "@/lib/utils";

export function TechnologyItem({
  tech,
  active,
  index,
  onSelect,
}: {
  tech: Technology;
  active: boolean;
  index: number;
  onSelect?: () => void;
}) {
  const Icon = tech.icon;
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={cn(
          "group relative flex w-full items-center gap-4 border-b border-white/[0.06] py-2.5 pl-4 text-left transition-colors duration-300",
          active ? "text-fg" : "text-fg/50 hover:text-fg/85",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 origin-center bg-accent transition-transform duration-500 ease-out-expo",
            active ? "scale-y-100" : "scale-y-0",
          )}
        />
        <span
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-md border transition-all duration-500",
            active
              ? "border-accent/60 bg-accent/10 text-accent shadow-[0_0_20px_-6px_rgb(0_230_209/0.8)]"
              : "border-white/10 text-subtle group-hover:text-accent",
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <span className="flex-1 text-[14px] font-medium tracking-tight">{tech.title}</span>
        <span className={cn("micro pr-1 text-[9px] transition-colors", active ? "text-accent" : "text-subtle")}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </button>
    </li>
  );
}
