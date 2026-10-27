"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  /** Size of one grid cell in px. */
  cellSize?: number;
  /** Grid / highlight colour (hex). */
  color?: string;
  /** "area" lights every cell inside the radius, "cell" only the one under the cursor. */
  highlight?: "area" | "cell";
  gridStyle?: "lines" | "dots";
  /** Radius (px) of the cursor's influence. */
  radius?: number;
  /** How long (ms) a lit cell stays fully lit after the cursor leaves it. */
  holdTime?: number;
  /** How long (ms) a lit cell takes to fade out after holdTime. */
  fadeDuration?: number;
  fillOpacity?: number;
  /** Peak opacity of the grid lines, which only appear around the cursor. */
  gridOpacity?: number;
  /** 0–1 strength of the glow that follows the cursor. */
  spotlight?: number;
  /** Ripple ring on click. */
  clickPulse?: boolean;
  className?: string;
  children?: ReactNode;
};

function toRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  if (h.length !== 6 || Number.isNaN(n)) return [0, 0, 0];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Lit = { t: number; s: number };
type Pulse = { x: number; y: number; t: number };

const PULSE_MS = 750;

export default function CursorGrid({
  cellSize = 60,
  color = "#ffffff",
  highlight = "area",
  gridStyle = "lines",
  radius = 140,
  holdTime = 400,
  fadeDuration = 800,
  fillOpacity = 0.06,
  gridOpacity = 0.08,
  spotlight = 0.6,
  clickPulse = false,
  className,
  children,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [r, g, b] = toRgb(color);
    const rgba = (a: number) => `rgba(${r},${g},${b},${a})`;

    let w = 0;
    let h = 0;
    const pointer = { x: -9999, y: -9999, active: false, last: 0 };
    const lit = new Map<number, Lit>();
    let pulses: Pulse[] = [];
    let raf = 0;

    const key = (cx: number, cy: number) => cy * 10000 + cx;

    // The grid is only ever drawn on lit cells, so nothing shows until the cursor passes.
    const revealGrid = (cx: number, cy: number, alpha: number) => {
      const x = cx * cellSize + 0.5;
      const y = cy * cellSize + 0.5;
      if (gridStyle === "lines") {
        ctx.strokeStyle = rgba(alpha);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + cellSize, y);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + cellSize);
        // only close the far edges when the neighbour isn't lit, so shared edges aren't drawn twice
        if (!lit.has(key(cx + 1, cy))) {
          ctx.moveTo(x + cellSize, y);
          ctx.lineTo(x + cellSize, y + cellSize);
        }
        if (!lit.has(key(cx, cy + 1))) {
          ctx.moveTo(x, y + cellSize);
          ctx.lineTo(x + cellSize, y + cellSize);
        }
        ctx.stroke();
      } else {
        ctx.fillStyle = rgba(Math.min(1, alpha * 1.6));
        ctx.beginPath();
        ctx.arc(cx * cellSize, cy * cellSize, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const { x: px, y: py, active } = pointer;

      // soft glow following the cursor
      if (active && spotlight > 0) {
        const R = radius * 1.6;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, R);
        glow.addColorStop(0, rgba(spotlight * 0.07));
        glow.addColorStop(1, rgba(0));
        ctx.fillStyle = glow;
        ctx.fillRect(px - R, py - R, R * 2, R * 2);
      }

      // lit cells: hold, then fade
      for (const [k, c] of lit) {
        const age = now - c.t;
        const f = age <= holdTime ? 1 : 1 - (age - holdTime) / fadeDuration;
        if (f <= 0) {
          lit.delete(k);
          continue;
        }
        const cx = k % 10000;
        const cy = Math.floor(k / 10000);
        ctx.fillStyle = rgba(Math.min(1, fillOpacity * 2.2 * c.s * f));
        ctx.fillRect(cx * cellSize, cy * cellSize, cellSize, cellSize);
        revealGrid(cx, cy, Math.min(1, gridOpacity) * c.s * f);
      }

      // click ripples
      pulses = pulses.filter((p) => now - p.t < PULSE_MS);
      for (const p of pulses) {
        const prog = (now - p.t) / PULSE_MS;
        const ease = 1 - Math.pow(1 - prog, 3);
        const rad = radius * 0.3 + radius * 1.7 * ease;
        const band = cellSize * 0.7;
        const x0 = Math.max(0, Math.floor((p.x - rad - band) / cellSize));
        const x1 = Math.floor((p.x + rad + band) / cellSize);
        const y0 = Math.max(0, Math.floor((p.y - rad - band) / cellSize));
        const y1 = Math.floor((p.y + rad + band) / cellSize);
        for (let cy = y0; cy <= y1; cy++) {
          for (let cx = x0; cx <= x1; cx++) {
            const d = Math.hypot((cx + 0.5) * cellSize - p.x, (cy + 0.5) * cellSize - p.y);
            const off = Math.abs(d - rad);
            if (off < band) {
              ctx.fillStyle = rgba(fillOpacity * 3 * (1 - off / band) * (1 - prog));
              ctx.fillRect(cx * cellSize, cy * cellSize, cellSize, cellSize);
            }
          }
        }
      }
    };

    const frame = (now: number) => {
      if (pointer.active && now - pointer.last > holdTime + fadeDuration + 300) {
        pointer.active = false;
      }
      draw(now);
      raf = pointer.active || lit.size || pulses.length ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      pointer.last = now;

      if (highlight === "cell") {
        const cx = Math.floor(e.clientX / cellSize);
        const cy = Math.floor(e.clientY / cellSize);
        lit.set(key(cx, cy), { t: now, s: 1 });
      } else {
        const x0 = Math.max(0, Math.floor((e.clientX - radius) / cellSize));
        const x1 = Math.floor((e.clientX + radius) / cellSize);
        const y0 = Math.max(0, Math.floor((e.clientY - radius) / cellSize));
        const y1 = Math.floor((e.clientY + radius) / cellSize);
        for (let cy = y0; cy <= y1; cy++) {
          for (let cx = x0; cx <= x1; cx++) {
            const d = Math.hypot((cx + 0.5) * cellSize - e.clientX, (cy + 0.5) * cellSize - e.clientY);
            if (d < radius) lit.set(key(cx, cy), { t: now, s: 1 - d / radius });
          }
        }
      }
      kick();
    };

    const onDown = (e: PointerEvent) => {
      if (!clickPulse) return;
      pulses.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      kick();
    };

    const onLeave = () => {
      pointer.active = false;
      kick();
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [cellSize, color, highlight, gridStyle, radius, holdTime, fadeDuration, fillOpacity, gridOpacity, spotlight, clickPulse]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
