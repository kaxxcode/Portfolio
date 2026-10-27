"use client";

import { useState } from "react";
import AnimatedContent from "@/components/AnimatedContent";
import type { Item } from "@/lib/data";

const palette = [
  ["#fff1e6", "#f26a00"],
  ["#e8f0ff", "#2f5bea"],
  ["#e9f7ec", "#1f8a3b"],
  ["#fdecef", "#d3304f"],
  ["#f1ebff", "#6d3fd9"],
  ["#fff8dc", "#a87b00"],
];

function Monogram({
  text,
  index,
  domain,
  logo,
  logoBg,
}: {
  text: string;
  index: number;
  domain?: string;
  logo?: string;
  logoBg?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [bg, fg] = palette[index % palette.length];

  if ((logo || domain) && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo ?? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt=""
        width={36}
        height={36}
        loading="lazy"
        onError={() => setFailed(true)}
        // Google returns a generic 16px globe when it has no icon: treat as missing.
        onLoad={(e) => e.currentTarget.naturalWidth <= 16 && setFailed(true)}
        style={logoBg ? { background: logoBg } : undefined}
        className="size-9 shrink-0 rounded-lg border border-line bg-white object-contain p-1"
      />
    );
  }

  return (
    <span
      className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-[13px] font-semibold"
      style={{ background: bg, color: fg }}
    >
      {text
        .split(/\s|,/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()}
    </span>
  );
}

export default function Accordion({ items, delay = 0 }: { items: Item[]; delay?: number }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedContent
      role="list"
      trigger="mount"
      distance={18}
      blur={4}
      duration={0.6}
      delay={delay}
      stagger={0.05}
      className="border-t border-line"
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div role="listitem" key={item.title + i} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left"
            >
              <Monogram text={item.title} index={i} domain={item.domain} logo={item.logo} logoBg={item.logoBg} />
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] leading-snug">{item.title}</span>
                {item.subtitle && (
                  <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                    {item.subtitle}
                  </span>
                )}
              </span>
              <span className="shrink-0 whitespace-nowrap font-mono text-[13px] text-ink">
                {item.meta}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 pb-5 pl-12 pr-6 text-[15px] leading-relaxed text-muted">
                  {item.description && <p>{item.description}</p>}
                  {item.bullets && (
                    <ul className="list-disc space-y-1.5 pl-4 marker:text-line">
                      {item.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line bg-white px-2 py-0.5 font-mono text-[12px] text-ink"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                    >
                      Visit
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </AnimatedContent>
  );
}
