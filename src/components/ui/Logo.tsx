import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, withTagline = true }: { className?: string; withTagline?: boolean }) {
  return (
    <Link
      href="#top"
      aria-label="RealSeg — Security Intelligence, voltar ao início"
      className={cn("group flex shrink-0 items-center gap-3", className)}
    >
      <Image
        src="/brand/realseg-logo.png"
        alt="RealSeg"
        width={364}
        height={88}
        preload
        className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-90 md:h-9"
      />
      {withTagline && (
        <span className="micro hidden border-l hairline pl-3 leading-[1.35] text-muted xl:block">
          Security
          <br />
          Intelligence
        </span>
      )}
    </Link>
  );
}
