import { profile } from "@/lib/data";

/**
 * The "Heddle" button: logo, name and a small arrow, linking to heddle.so.
 * Sized in `em`, so it scales with the text around it (16px inside 17px body text).
 */
export default function HeddlePill() {
  return (
    <a
      href={profile.heddleUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex items-center gap-[0.5em] rounded-full border border-[#1478E8]/20 bg-gradient-to-b from-white to-[#eaf3ff] py-[0.19em] pl-[0.19em] pr-[0.75em] align-middle text-[0.94em] font-semibold leading-none text-ink no-underline shadow-[0_1px_2px_rgba(20,120,232,0.10)] transition duration-300 hover:-translate-y-0.5 hover:border-[#1478E8]/50 hover:shadow-[0_8px_18px_-8px_rgba(20,120,232,0.55)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://heddle.so/apple-touch-icon.png"
        alt=""
        className="size-[1.5em] rounded-full object-cover transition duration-500 group-hover:rotate-[360deg]"
      />
      Heddle
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="-ml-[0.12em] size-[0.8em] text-[#1478E8] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  );
}
