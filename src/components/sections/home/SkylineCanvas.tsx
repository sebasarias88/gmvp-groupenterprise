"use client";

import { useEffect, useRef } from "react";

type Building = { x: number; w: number; h: number; layer: number; windows: { x: number; y: number; lit: number; speed: number }[] };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generative night skyline: three layers of towers with windows that
 * slowly light up in gold. Reacts to the pointer with a subtle parallax.
 */
export function SkylineCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let buildings: Building[] = [];
    let raf = 0;
    let mouseX = 0;
    let targetX = 0;
    let visible = true;

    const build = () => {
      const rand = mulberry32(7);
      buildings = [];
      const layers = [
        { min: 0.25, max: 0.55, wMin: 50, wMax: 120 },
        { min: 0.35, max: 0.72, wMin: 60, wMax: 150 },
        { min: 0.3, max: 0.9, wMin: 70, wMax: 170 },
      ];
      layers.forEach((cfg, layer) => {
        let x = -100;
        while (x < width + 100) {
          const w = cfg.wMin + rand() * (cfg.wMax - cfg.wMin);
          const h = height * (cfg.min + rand() * (cfg.max - cfg.min));
          const windows: Building["windows"] = [];
          const cols = Math.floor(w / 14);
          const rows = Math.floor(h / 18);
          for (let c = 1; c < cols; c++) {
            for (let r = 2; r < rows; r++) {
              if (rand() > 0.55) windows.push({ x: c * 14, y: r * 18, lit: rand() * (layer + 1) * 0.3, speed: 0.2 + rand() * 0.8 });
            }
          }
          buildings.push({ x, w, h, layer, windows });
          x += w + 6 + rand() * 24;
        }
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const fills = ["#16130d", "#1b170f", "#211c12"];
    const strokes = ["rgba(212,175,55,0.06)", "rgba(212,175,55,0.1)", "rgba(212,175,55,0.16)"];

    const draw = (t: number) => {
      mouseX += (targetX - mouseX) * 0.05;
      ctx.clearRect(0, 0, width, height);

      for (const b of buildings) {
        const shift = mouseX * (b.layer + 1) * 10;
        const bx = b.x + shift;
        const by = height - b.h;
        ctx.fillStyle = fills[b.layer];
        ctx.fillRect(bx, by, b.w, b.h);
        ctx.fillStyle = strokes[b.layer];
        ctx.fillRect(bx, by, b.w, 1.5);

        for (const win of b.windows) {
          const pulse = reduce ? win.lit : win.lit + Math.sin(t * 0.0006 * win.speed + win.x + win.y) * 0.25;
          if (pulse < 0.18) continue;
          ctx.fillStyle = `rgba(241, 214, 122, ${Math.min(0.85, pulse * (0.35 + b.layer * 0.25))})`;
          ctx.fillRect(bx + win.x, by + win.y, 5, 8);
        }
      }

      // Fade towers into the page at the bottom
      const g = ctx.createLinearGradient(0, height * 0.55, 0, height);
      g.addColorStop(0, "rgba(11,10,8,0)");
      g.addColorStop(1, "rgba(11,10,8,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });

    resize();
    raf = requestAnimationFrame(draw);
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
