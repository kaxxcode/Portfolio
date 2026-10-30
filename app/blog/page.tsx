import type { Metadata } from "next";
import Link from "next/link";
import AnimatedContent from "@/components/AnimatedContent";
import { formatDate, readingMinutes, sortedPosts } from "@/lib/blog";
import { iconProps } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Blog · Krishna Jha",
  description: "Things I'm learning while building, and whatever feels worth writing down.",
};

export default function BlogIndex() {
  return (
    <main className="mx-auto min-h-[55vh] max-w-[720px] py-16">
      <AnimatedContent trigger="mount" distance={28} blur={6} delay={0.1}>
        <h1 className="text-[40px] font-semibold tracking-tight">Blog</h1>
        <p className="mt-3 text-[17px] leading-[1.9] text-muted">
          Things I&apos;m learning while building, and whatever feels worth writing down.
        </p>
      </AnimatedContent>

      {sortedPosts.length === 0 ? (
        <AnimatedContent trigger="mount" distance={28} blur={6} delay={0.3} className="mt-12">
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white px-6 py-14 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-paper">
              <svg {...iconProps}>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </span>
            <h2 className="mt-5 text-[20px] font-semibold tracking-tight">Nothing here yet</h2>
            <p className="mt-2 max-w-[36ch] text-[15px] leading-relaxed text-muted">
              I haven&apos;t written anything yet. When I do, it&apos;ll show up here.
            </p>
            <Link
              href="/"
              className="mt-6 rounded-xl border border-line bg-white px-4 py-2.5 text-[15px] transition hover:border-ink/30"
            >
              Back home
            </Link>
          </div>
        </AnimatedContent>
      ) : (
        <AnimatedContent
          role="list"
          trigger="mount"
          distance={18}
          blur={4}
          duration={0.6}
          delay={0.3}
          stagger={0.07}
          className="mt-12 border-t border-line"
        >
          {sortedPosts.map((post) => (
            <div role="listitem" key={post.slug} className="border-b border-line">
              <Link href={`/blog/${post.slug}`} className="group block py-6">
                <p className="font-mono text-[13px] text-muted">
                  <time>{formatDate(post.date)}</time> · {readingMinutes(post)} min read
                </p>
                <h2 className="mt-1.5 text-[22px] font-semibold tracking-tight transition group-hover:text-[#1478E8]">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{post.summary}</p>
              </Link>
            </div>
          ))}
        </AnimatedContent>
      )}
    </main>
  );
}
