"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; r: number; phase: number; hub: boolean };
type Edge = { a: number; b: number };
type Packet = { e: number; t: number; speed: number; dir: 1 | -1 };
type Ping = { n: number; t: number };

/**
 * Rede de "câmeras" conectadas sobre a cidade.
 * Pontos = câmeras, linhas = links, pacotes = eventos trafegando, pings = detecções.
 * Densidade baixa e propositalmente discreta; pausa fora da viewport.
 */
export function DataNetwork({ className, density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];
    let pings: Ping[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let running = false;
    let last = performance.now();

    // PRNG determinística para layout estável
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed = 7;
      const count = Math.round(Math.min(64, Math.max(18, (w * h) / 26000)) * density);
      nodes = Array.from({ length: count }, () => {
        // Concentra os nós na faixa da cidade (metade inferior / direita)
        const x = 0.15 * w + rand() * 0.85 * w;
        const y = h * (0.42 + Math.pow(rand(), 0.8) * 0.5);
        return { x, y, r: 0.8 + rand() * 1.2, phase: rand() * Math.PI * 2, hub: rand() > 0.86 };
      });
      edges = [];
      const maxD = Math.max(120, w * 0.11);
      nodes.forEach((n, i) => {
        const near = nodes
          .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
          .filter((o) => o.j !== i && o.d < maxD)
          .sort((p, q) => p.d - q.d)
          .slice(0, n.hub ? 4 : 2);
        near.forEach(({ j }) => {
          if (!edges.some((e) => (e.a === i && e.b === j) || (e.a === j && e.b === i))) edges.push({ a: i, b: j });
        });
      });
      packets = Array.from({ length: Math.min(14, Math.round(edges.length / 4)) }, () => spawnPacket());
      pings = [];
    };

    const spawnPacket = (): Packet => ({
      e: Math.floor(Math.random() * Math.max(1, edges.length)),
      t: Math.random(),
      speed: 0.12 + Math.random() * 0.22,
      dir: Math.random() > 0.5 ? 1 : -1,
    });

    const draw = (dt: number, time: number) => {
      ctx.clearRect(0, 0, w, h);

      // Links
      ctx.lineWidth = 0.6;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const md = Math.hypot(mx - mouse.x, my - mouse.y);
        const boost = md < 220 ? (1 - md / 220) * 0.22 : 0;
        ctx.strokeStyle = `rgba(0, 230, 209, ${0.07 + boost})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Conexão com o cursor (sutil)
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < 160) {
          ctx.strokeStyle = `rgba(66, 255, 240, ${(1 - d / 160) * 0.25})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Nós
      for (const n of nodes) {
        const tw = 0.55 + Math.sin(time * 0.0012 + n.phase) * 0.35;
        ctx.fillStyle = n.hub ? `rgba(66, 255, 240, ${0.5 + tw * 0.4})` : `rgba(160, 255, 246, ${0.22 + tw * 0.3})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hub ? n.r + 0.9 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pacotes trafegando
      for (const p of packets) {
        p.t += p.speed * dt;
        if (p.t >= 1) {
          const e = edges[p.e];
          if (e && Math.random() > 0.6) pings.push({ n: p.dir === 1 ? e.b : e.a, t: 0 });
          Object.assign(p, spawnPacket(), { t: 0 });
        }
        const e = edges[p.e];
        if (!e) continue;
        const a = nodes[p.dir === 1 ? e.a : e.b];
        const b = nodes[p.dir === 1 ? e.b : e.a];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.18);
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.18);
        const g = ctx.createLinearGradient(tx, ty, x, y);
        g.addColorStop(0, "rgba(66,255,240,0)");
        g.addColorStop(1, "rgba(66,255,240,0.75)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "rgba(200,255,250,0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 0.6;

      // Pings de detecção
      pings = pings.filter((p) => p.t < 1);
      for (const p of pings) {
        p.t += dt * 0.7;
        const n = nodes[p.n];
        ctx.strokeStyle = `rgba(0,230,209,${(1 - p.t) * 0.55})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3 + p.t * 22, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt, now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();
    draw(0, 0);

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(() => {
      build();
      if (!running) draw(0, 0);
    });
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none h-full w-full", className)} />;
}
