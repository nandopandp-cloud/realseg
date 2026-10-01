import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Insight } from "@/data/insights";
import { cn, formatDate } from "@/lib/utils";

export function InsightCard({
  post,
  variant = "default",
}: {
  post: Insight;
  variant?: "featured" | "default" | "compact";
}) {
  const featured = variant === "featured";
  const compact = variant === "compact";

  return (
    <article className={cn("group relative h-full", compact && "flex gap-4")}>
      <a
        href={post.href}
        className="absolute inset-0 z-10 rounded-lg"
        aria-label={`Ler: ${post.title}`}
        data-cursor="LER"
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-white/[0.07] bg-ink-900",
          featured ? "aspect-[16/11]" : compact ? "aspect-square w-28 shrink-0 sm:w-32" : "aspect-[16/10]",
        )}
      >
        <Image
          src={post.image}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : compact ? "128px" : "(min-width: 1024px) 25vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-ink-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
        <div className="hud-corners absolute inset-2.5 opacity-0 transition-opacity duration-500 [--l:10px] group-hover:opacity-100" />
        {!compact && (
          <span className="micro absolute left-4 top-4 rounded-sm border border-accent/40 bg-ink-950/60 px-2 py-1 text-[8px] text-accent backdrop-blur">
            {post.category}
          </span>
        )}
      </div>

      <div className={cn(compact ? "min-w-0 py-1" : "pt-5")}>
        <p className="micro flex items-center gap-3 text-[9px] text-subtle">
          {compact && <span className="text-accent">{post.category}</span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>· {post.readTime}</span>
        </p>
        <h3
          className={cn(
            "mt-2.5 font-bold tracking-tight text-fg transition-colors duration-300 group-hover:text-accent-2",
            featured
              ? "text-2xl leading-tight md:text-[2rem] md:leading-[1.1]"
              : compact
                ? "text-[15px] leading-snug"
                : "text-lg leading-snug",
          )}
        >
          {post.title}
        </h3>
        {!compact && <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted">{post.excerpt}</p>}
        <span className="micro mt-4 inline-flex items-center gap-1.5 text-[9px] text-fg/80 transition-colors group-hover:text-accent">
          Leia mais
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
