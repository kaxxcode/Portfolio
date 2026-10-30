import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "@/components/BlogContent";
import { formatDate, posts, readingMinutes } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: `${post.title} · Krishna Jha`, description: post.summary } : {};
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-[55vh] max-w-[720px] py-16">
      <Link href="/blog" className="text-[14px] text-muted transition hover:text-ink">
        ← All posts
      </Link>
      <article className="mt-8">
        <p className="font-mono text-[13px] text-muted">
          <time>{formatDate(post.date)}</time> · {readingMinutes(post)} min read
        </p>
        <h1 className="mt-3 text-[clamp(2rem,6vw,2.75rem)] font-semibold leading-[1.12] tracking-tight">
          {post.title}
        </h1>
        <BlogContent blocks={post.content} />
      </article>

      <div className="mt-16 border-t border-line pt-8">
        <Link href="/blog" className="text-[14px] text-muted transition hover:text-ink">
          ← All posts
        </Link>
      </div>
    </main>
  );
}
