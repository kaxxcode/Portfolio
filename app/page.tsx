import AnimatedContent from "@/components/AnimatedContent";
import PaperCrumple from "@/components/PaperCrumple";
import SiteHeader from "@/components/SiteHeader";
import StarBorder from "@/components/StarBorder";
import Tabs from "@/components/Tabs";
import TechText from "@/components/TechText";
import ContributionGraph from "@/components/ContributionGraph";
import { experience, profile, projects } from "@/lib/data";
import { iconProps, star } from "@/lib/ui";

const socials = [
  {
    label: "GitHub",
    href: profile.github,
    icon: (
      <svg {...iconProps}>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: (
      <svg {...iconProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: profile.instagram,
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: profile.gmailCompose,
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1100px] overflow-x-clip px-6">
      <SiteHeader />

      <main className="grid grid-cols-[minmax(0,1fr)] gap-14 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <section className="min-w-0 lg:sticky lg:top-10 lg:self-start">
          <AnimatedContent
            trigger="mount"
            distance={32}
            blur={8}
            delay={0.1}
            className="flex items-center gap-5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatar}
              alt={profile.name}
              width={96}
              height={96}
              className="size-24 rounded-full border-4 border-white object-cover shadow-[0_2px_12px_rgba(0,0,0,0.12)]"
            />
            <div className="min-w-0 flex-1">
              <h1 className="sr-only">{profile.name}</h1>
              {/* Taller than the text so the selection frame, labels and specks have room; margins pull it back in. */}
              <div className="-my-6 -ml-4 h-24 w-[calc(100%+1rem)] max-w-[360px]">
                <TechText
                  text={profile.name}
                  fontSize={46}
                  fontWeight={600}
                  letterSpacing={-0.035}
                  align="left"
                  accentColor="#1478E8"
                  reveal="letter"
                  specks={10}
                  sweep={false}
                  intro="assemble"
                  introDuration={1.6}
                />
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 text-[15px] text-muted">
                <svg {...iconProps} width={16} height={16}>
                  <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                {profile.location}
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent
            trigger="mount"
            distance={28}
            blur={6}
            delay={0.3}
            stagger={0.12}
            className="mt-10 space-y-6 text-[17px] leading-[1.9] text-muted"
          >
            <p>
              Hey, I&apos;m Krishna. I co-founded{" "}
              <span className="whitespace-nowrap">
                <a
                  href={profile.heddleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-2 rounded-full border border-[#1478E8]/20 bg-gradient-to-b from-white to-[#eaf3ff] py-[3px] pl-[3px] pr-3 align-middle text-[16px] font-semibold leading-none text-ink shadow-[0_1px_2px_rgba(20,120,232,0.10)] transition duration-300 hover:-translate-y-0.5 hover:border-[#1478E8]/50 hover:shadow-[0_8px_18px_-8px_rgba(20,120,232,0.55)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://heddle.so/apple-touch-icon.png"
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 rounded-full object-cover transition duration-500 group-hover:rotate-[360deg]"
                  />
                  Heddle
                  <svg
                    {...iconProps}
                    width={13}
                    height={13}
                    strokeWidth={2.2}
                    className="-ml-0.5 text-[#1478E8] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
                ,
              </span>{" "}
              where we turn a live product workflow into a walkthrough video, so teams don&apos;t
              have to record and edit demos by hand. 200+ people are using it in beta and we
              already have paying customers.
            </p>
            <p>
              I look after product and operations, which mostly means talking to users, figuring
              out what to build next and then actually shipping it. Before Heddle I built
              Basebrain, got 1,700+ people on the waitlist, and pivoted when the feedback told me
              it wasn&apos;t the right thing.
            </p>
            <p>
              I also edited videos for 6+ years (100M+ views across creators, startups and
              brands), so I&apos;m a bit obsessed with pacing and how things feel. Right now I&apos;m
              studying CS at MIT ADT and I&apos;m VP of the Innovation Council there.
            </p>
            <p>
              I also make{" "}
              <a
                href={profile.contentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-line decoration-2 underline-offset-4 transition hover:decoration-[#1478E8]"
              >
                content
              </a>{" "}
              :)
            </p>
          </AnimatedContent>

          <AnimatedContent
            trigger="mount"
            distance={20}
            scale={0.8}
            delay={0.7}
            stagger={0.07}
            ease="back.out(1.7)"
            className="mt-10 flex gap-3"
          >
            {socials.map((s) => (
              <StarBorder
                as="a"
                key={s.label}
                {...star}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="size-11 p-0!"
              >
                {s.icon}
              </StarBorder>
            ))}
          </AnimatedContent>
        </section>

        <div className="min-w-0 space-y-14">
          <AnimatedContent trigger="mount" distance={36} blur={8} delay={0.25}>
            <ContributionGraph />
          </AnimatedContent>

          <Tabs
            tabs={[
              { label: "Projects", items: projects },
              { label: "Experience", items: experience },
            ]}
          />
        </div>
      </main>

      <AnimatedContent distance={40} blur={8} duration={0.9}>
        <section className="border-t border-line pb-16 pt-14 text-center">
          <PaperCrumple
            src="/paper-note.jpg?v=2"
            alt="A handwritten note from Krishna with small sketches of a motorbike, mountains, chai and a laptop"
            width={660}
            height={520}
            sceneHeight={640}
            style={{ height: "clamp(280px, 62vw, 640px)" }}
            releaseBehavior="restore"
            lightAngle={-30}
            shadowOpacity={0.1}
          />
          <p className="mt-2 text-[13px] text-muted">psst, hold the paper and drag. it crumples.</p>
        </section>
      </AnimatedContent>

      <AnimatedContent distance={24} duration={0.9}>
        <footer className="border-t border-line py-8 text-[13px] text-muted">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </AnimatedContent>
    </div>
  );
}
