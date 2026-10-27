import ScrollEnd from "@/components/ScrollEnd";
import { profile } from "@/lib/data";

type Day = { date: string; count: number; level: number };

const levelColor = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

async function getContributions() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${profile.handle}?y=last`,
      { next: { revalidate: 60 * 60 * 6 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      total: Record<string, number>;
      contributions: Day[];
    };
    return { total: data.total.lastYear ?? 0, days: data.contributions };
  } catch {
    return null;
  }
}

export default async function ContributionGraph() {
  const data = await getContributions();

  // Build empty fallback grid so the layout never collapses.
  const days: Day[] =
    data?.days ??
    Array.from({ length: 365 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (364 - i));
      return { date: d.toISOString().slice(0, 10), count: 0, level: 0 };
    });

  // Group into week columns (Sun–Sat).
  const weeks: (Day | null)[][] = [];
  let col: (Day | null)[] = [];
  const firstDow = new Date(days[0].date + "T00:00:00").getDay();
  for (let i = 0; i < firstDow; i++) col.push(null);
  for (const d of days) {
    col.push(d);
    if (col.length === 7) {
      weeks.push(col);
      col = [];
    }
  }
  if (col.length) {
    while (col.length < 7) col.push(null);
    weeks.push(col);
  }

  const monthLabels = weeks.map((w, i) => {
    const first = w.find(Boolean);
    if (!first) return "";
    const m = new Date(first.date + "T00:00:00").getMonth();
    const prev = i > 0 ? weeks[i - 1].find(Boolean) : null;
    const pm = prev ? new Date(prev.date + "T00:00:00").getMonth() : -1;
    return m !== pm ? MONTHS[m] : "";
  });
  // Drop a label that would collide with the next one (less than 3 columns apart).
  monthLabels.forEach((label, i) => {
    if (!label) return;
    const next = monthLabels.findIndex((l, j) => j > i && l);
    if (next !== -1 && next - i < 3) monthLabels[i] = "";
  });

  return (
    <section aria-label="GitHub contributions">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-[17px]">
          {data ? `${data.total.toLocaleString()} contributions in the last year` : "GitHub activity"}
        </h2>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-muted hover:text-ink"
        >
          GitHub profile
        </a>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4">
        {/* No visible scrollbar; starts scrolled to the right so the latest weeks show first. */}
        <ScrollEnd className="no-scrollbar overflow-x-auto">
        <div className="inline-flex flex-col gap-1">
          <div className="flex gap-[3px] pl-0 text-[10px] text-muted">
            {monthLabels.map((m, i) => (
              <span key={i} className="w-[11px] overflow-visible whitespace-nowrap">
                {m}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map((d, j) =>
                  d ? (
                    <span
                      key={j}
                      title={`${d.count} contributions on ${d.date}`}
                      className="size-[11px] rounded-[2px]"
                      style={{ background: levelColor[d.level] }}
                    />
                  ) : (
                    <span key={j} className="size-[11px]" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        </ScrollEnd>
        <div className="mt-3 flex items-center justify-end gap-1 text-[11px] text-muted">
          Less
          {levelColor.map((c) => (
            <span key={c} className="size-[10px] rounded-[2px]" style={{ background: c }} />
          ))}
          More
        </div>
      </div>
    </section>
  );
}
