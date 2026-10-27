"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** A horizontally scrollable box that starts (and stays, on resize) scrolled to its right edge. */
export default function ScrollEnd({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const toEnd = () => {
      el.scrollLeft = el.scrollWidth;
    };
    toEnd();
    // Re-pin when the box or its content changes size (window resize, fonts loading in, etc.).
    const observer = new ResizeObserver(toEnd);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
