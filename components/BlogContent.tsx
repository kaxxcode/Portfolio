import type { ReactNode } from "react";
import HeddlePill from "@/components/HeddlePill";

/**
 * Turns **bold** and *italic* into real elements (no raw HTML involved) and swaps every
 * "Heddle" for the Heddle button used on the home page.
 */
function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\bHeddle\b)/g);
  const out: ReactNode[] = [];

  parts.forEach((part, i) => {
    if (!part) return;

    if (part === "Heddle") {
      // Keep punctuation that follows ("Heddle," / "Heddle.") glued to the button so a line never breaks between them.
      const next = parts[i + 1];
      let glue = "";
      if (next && !next.startsWith("*") && next !== "Heddle") {
        glue = /^[.,;:!?)"']+/.exec(next)?.[0] ?? "";
        if (glue) parts[i + 1] = next.slice(glue.length);
      }
      out.push(
        <span key={i} className="whitespace-nowrap">
          <HeddlePill />
          {glue}
        </span>,
      );
    } else if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      out.push(
        <strong key={i} className="font-semibold text-ink">
          {inline(part.slice(2, -2))}
        </strong>,
      );
    } else if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      out.push(<em key={i}>{inline(part.slice(1, -1))}</em>);
    } else {
      out.push(part);
    }
  });

  return out;
}

const IMAGE = /^!\[(.*)\]\((.+)\)$/;

/** Renders a post's content blocks. See the comment in lib/blog.ts for the syntax. */
export default function BlogContent({ blocks }: { blocks: string[] }) {
  return (
    <div className="mt-10 space-y-5 text-[17px] leading-[1.9] text-muted">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="!mt-14 text-[26px] font-semibold leading-tight tracking-tight text-ink">
              {inline(block.slice(3))}
            </h2>
          );
        }

        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="!my-10 border-l-[3px] border-[#1478E8] pl-5 text-[22px] font-medium leading-[1.55] tracking-tight text-ink"
            >
              {inline(block.slice(2))}
            </blockquote>
          );
        }

        const image = IMAGE.exec(block);
        if (image) {
          const [, caption, src] = image;
          return (
            <figure key={i} className="!my-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={caption} className="w-full rounded-2xl border border-line" />
              {caption && (
                <figcaption className="mt-3 text-center text-[13px] leading-snug text-muted">{caption}</figcaption>
              )}
            </figure>
          );
        }

        // A paragraph that is one long italic line is the post's lead-in.
        const lead = /^\*[^*].*[^*]\*$/.test(block);
        return (
          <p key={i} className={lead ? "text-[19px] leading-[1.7] text-ink/80" : undefined}>
            {inline(block)}
          </p>
        );
      })}
    </div>
  );
}
