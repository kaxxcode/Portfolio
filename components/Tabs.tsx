"use client";

import { useState } from "react";
import Accordion from "@/components/Accordion";
import AnimatedContent from "@/components/AnimatedContent";
import type { Item } from "@/lib/data";

export default function Tabs({ tabs }: { tabs: { label: string; items: Item[] }[] }) {
  const [active, setActive] = useState(0);
  // First paint waits for the tab bar to land; after a tab switch the rows play straight away.
  const [firstPaint, setFirstPaint] = useState(true);

  return (
    <section>
      <AnimatedContent trigger="mount" distance={24} blur={6} delay={0.4}>
        <div role="tablist" className="mb-5 flex gap-1 rounded-xl border border-line bg-white p-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              type="button"
              aria-selected={active === i}
              onClick={() => {
                if (i === active) return;
                setActive(i);
                setFirstPaint(false);
              }}
              className={`flex-1 cursor-pointer rounded-lg px-4 py-2 text-[15px] transition ${
                active === i ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </AnimatedContent>
      {/* key remounts the list so the open row resets and the rows animate in again */}
      <Accordion
        key={tabs[active].label}
        items={tabs[active].items}
        delay={firstPaint ? 0.6 : 0.05}
      />
    </section>
  );
}
