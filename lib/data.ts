export const profile = {
  name: "Krishna Jha",
  handle: "kaxxcode",
  location: "Pune, IN",
  email: "kaxxsays@gmail.com",
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=kaxxsays@gmail.com",
  avatar: "https://github.com/kaxxcode.png?size=400",
  heddleUrl: "https://heddle.so",
  github: "https://github.com/kaxxcode",
  linkedin: "https://www.linkedin.com/in/krishna-kumar-jha-b18a262a4/",
  instagram: "https://www.instagram.com/kisna.fr",
};

export type Item = {
  title: string;
  subtitle?: string;
  meta: string;
  domain?: string;
  logo?: string;
  logoBg?: string;
  href?: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
};

export const projects: Item[] = [
  {
    title: "Heddle",
    domain: "heddle.so",
    logo: "https://heddle.so/apple-touch-icon.png",
    subtitle: "formerly BuildShot",
    meta: "AI · 0→1",
    href: "https://heddle.so",
    description:
      "Heddle turns a live product workflow into a proper walkthrough video, so teams don't have to record and edit demos by hand. We've got 200+ people in beta, paying customers from other countries, and a few early conversations with enterprises.",
    bullets: [
      "Made it into AIBoomi's Top 20 Under 20 (Annual '26), and JioGenNext's leadership reached out about their Market Access Program.",
    ],
    tags: ["AI browser automation", "Video generation", "Next.js"],
  },
  {
    title: "Nudge",
    domain: "heddle.so",
    logo: "https://heddle.so/apple-touch-icon.png",
    subtitle: "Privacy-first browser agent",
    meta: "TypeScript",
    href: "https://nudge.heddle.so",
    description:
      "A browser agent that runs locally. Before anything reaches an AI model, a privacy layer on your own device strips out the sensitive stuff. I built it for Smart India Hackathon 2026.",
    tags: ["TypeScript", "Playwright", "DOM APIs", "Docker"],
  },
  {
    title: "Basebrain",
    logo: "/logos/basebrain.webp",
    subtitle: "Pivoted",
    meta: "1,700+ waitlist",
    description:
      "A tool that helps developers see and understand how their backend fits together. I got it to 1,700+ people on the waitlist by trying a lot of different positioning and distribution ideas. Then early feedback made me question the demand, so I made the call to pivot.",
    tags: ["Developer tools", "0→1"],
  },
  {
    title: "Metis",
    subtitle: "Maternal & child health",
    meta: "PWA",
    description:
      "A PWA for maternal and child health. It made the top 7 at the MIT-ADT AI Grand Challenge 2026.",
    tags: ["PWA", "HealthTech"],
  },
  {
    title: "Kairos",
    logo: "/logos/kairos.svg",
    subtitle: "Life management",
    meta: "Next.js",
    href: "https://kairos-buildshot.vercel.app/",
    description:
      "One app for habits, money, journaling and productivity stats, so you don't have to juggle four different tools. I built it at PCCOE HackMatrix.",
    tags: ["Next.js", "React", "MongoDB", "Supabase", "Gemini API"],
  },
  {
    title: "AlexaHire",
    domain: "alexahire.com",
    meta: "Next.js",
    href: "https://alexahire.com/",
    description:
      "A recruitment platform that makes hiring simpler for companies. I worked on it as an SDE intern.",
    tags: ["Next.js", "TypeScript"],
  },
  {
    title: "Lernova",
    logo: "/logos/lernova.svg",
    domain: "lernova.vercel.app",
    meta: "EdTech",
    href: "https://lernova.vercel.app/",
    description:
      "A learning platform for students, made so online learning feels smooth instead of clunky.",
    tags: ["EdTech", "LMS"],
  },
  {
    title: "Life Map",
    logo: "/logos/lifemap.png",
    logoBg: "#262626",
    domain: "life-map-xi.vercel.app",
    meta: "Web App",
    href: "https://life-map-xi.vercel.app/",
    description:
      "A planning app where you set your goals and can actually see where your life is heading.",
    tags: ["Web App", "Visualization"],
  },
];

export const experience: Item[] = [
  {
    title: "Heddle",
    domain: "heddle.so",
    logo: "https://heddle.so/apple-touch-icon.png",
    subtitle: "Co-Founder, Product & Operations",
    meta: "2026 – Now",
    href: "https://heddle.so",
    description: "Jan 2026 – Present · Pune · formerly BuildShot",
    bullets: [
      "We're building a platform that turns live product workflows into walkthrough videos. 200+ beta users, paying customers abroad and a few early enterprise conversations.",
      "I run the product side: talking to customers, deciding what to build next, writing requirements and shipping it.",
      "Worked on onboarding, the AI browser automation, video generation, captions, voiceovers and making everything more reliable.",
      "Did the early sales myself: demos, outbound, pricing experiments and enterprise calls.",
      "Picked for AIBoomi's Top 20 Under 20 (Annual '26).",
    ],
  },
  {
    title: "Institution's Innovation Council, MIT-ADT",
    domain: "mituniversity.ac.in",
    logo: "https://mituniversity.ac.in/assets_web/images/favicon.png",
    subtitle: "Vice President",
    meta: "2026 – Now",
    description: "Aug 2026 – Present · Pune",
    bullets: [
      "I work on student innovation, startup and Smart India Hackathon stuff on campus.",
      "Helped run innovation programs, interviews and entrepreneurship exercises.",
      "Work with students and faculty across a bunch of different initiatives.",
    ],
  },
  {
    title: "Innovation & Entrepreneurship Club, MIT-ADT",
    domain: "mituniversity.ac.in",
    logo: "https://mituniversity.ac.in/assets_web/images/favicon.png",
    subtitle: "Social Media Lead",
    meta: "2025 – 2026",
    description: "Aug 2025 – Aug 2026 · Pune",
    bullets: [
      "I run the club's content and social media, mostly around startups and entrepreneurship.",
    ],
  },
  {
    title: "Cloud Computing Club, MIT-ADT",
    domain: "mituniversity.ac.in",
    logo: "https://mituniversity.ac.in/assets_web/images/favicon.png",
    subtitle: "Social Media Lead",
    meta: "2025 – 2026",
    description: "Jul 2025 – Aug 2026 · Pune",
    bullets: [
      "Handled promotion for events like Cloud 101 and the Docker sessions.",
      "Worked on how the club looks and on reaching more students.",
    ],
  },
  {
    title: "Parmanand Group",
    subtitle: "AI & Automation Intern",
    meta: "2025 – 2026",
    description: "Dec 2025 – May 2026",
    bullets: [
      "Built CRM and workflow automations for lead management, follow-ups and day-to-day ops.",
      "Spotted repetitive work in the business and turned it into automations people could actually use, then kept tweaking them based on feedback.",
    ],
  },
  {
    title: "Alexa Hire",
    domain: "alexahire.com",
    subtitle: "SDE Intern",
    meta: "2025",
    href: "https://alexahire.com/",
    description: "Jun 2025 – Oct 2025 · Remote",
    bullets: [
      "Shipped features real users touch, on both the frontend and the backend.",
      "Turned business requirements into working features and spent a lot of time on usability, responsiveness and performance.",
    ],
  },
  {
    title: "Rooter.gg",
    domain: "rooter.gg",
    logo: "https://rooter.gg/images/rooter.svg",
    subtitle: "Assistant Video Editor",
    meta: "2025",
    description: "Feb 2025 – Jun 2025 · Remote",
    bullets: [
      "Edited a lot of gaming and digital content, and fast. Pacing, graphics, transitions, the works.",
    ],
  },
  {
    title: "GeeksforGeeks MIT-ADT Student Chapter",
    domain: "geeksforgeeks.org",
    subtitle: "Design Team Member",
    meta: "2024",
    description: "Aug 2024 – Jul 2025 · Pune",
    bullets: [
      "Designed posters and creatives for technical events and workshops.",
      "Kept the branding consistent across our social posts.",
    ],
  },
  {
    title: "Video Editing",
    subtitle: "6+ years",
    meta: "100M+ views",
    description: "Creators, startups and brands",
    bullets: [
      "Edited videos that added up to 100M+ views, for creators, startups and brands.",
      "Worked with Prakhar Gupta, Cinemastics, Physics Wallah, Rooter.gg, Growitbuddy and a few others.",
      "Mostly Premiere Pro and After Effects. I think a lot about hooks, pacing and why people keep watching.",
    ],
  },
];
