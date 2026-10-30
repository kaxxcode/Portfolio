import Link from "next/link";
import AnimatedContent from "@/components/AnimatedContent";
import StarBorder from "@/components/StarBorder";
import { profile } from "@/lib/data";
import { iconProps, star } from "@/lib/ui";

/** Top bar shared by the home page and the blog: logo + Blog link on the left, actions on the right. */
export default function SiteHeader({ current }: { current?: "blog" }) {
  const onBlog = current === "blog";

  return (
    <AnimatedContent trigger="mount" distance={-24} blur={6} duration={0.8}>
      <header className="flex items-center justify-between gap-4 border-b border-line py-7">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="text-[20px] font-semibold tracking-tight sm:text-[22px]">
            kaxxcode
          </Link>
          <Link
            href="/blog"
            aria-current={onBlog ? "page" : undefined}
            className={`rounded-full border px-3 py-1 text-[14px] transition sm:px-3.5 ${
              onBlog
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-muted hover:border-ink/30 hover:text-ink"
            }`}
          >
            Blog
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {/* Opens LinkedIn so people can message me there. Hidden on small screens (the LinkedIn icon is in the social row too). */}
          <StarBorder
            as="a"
            {...star}
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-4! py-2.5! text-[15px] max-sm:hidden!"
          >
            Say hello
          </StarBorder>
          <StarBorder
            as="a"
            {...star}
            href="/Krishna-Kumar-Jha-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-3.5! py-2.5! text-[15px] sm:px-4!"
          >
            <span className="max-sm:hidden">My resume</span>
            <span className="sm:hidden">Resume</span>
            <svg {...iconProps} width={16} height={16}>
              <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
            </svg>
          </StarBorder>
        </nav>
      </header>
    </AnimatedContent>
  );
}
