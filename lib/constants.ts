// ============================================================
// WORK WITH ELI — content store
// Every claim here is true and checkable. The five builds are demos I made
// myself to show what I can do — not paying client engagements. Nothing on
// this site says otherwise.
// ============================================================

export const SITE = {
  name: "Work With Eli",
  owner: "Eli Alcantara",
  role: "Website Designer & Front-End Developer",
  location: "Philippines",
  email: "projects@workwithelico.net",
  calendly: "https://calendly.com/projects-workwithelico/30min",
  whatsapp: "https://wa.me/639624039060",
  whatsappNumber: "+63 962 403 9060",
  upwork: "https://www.upwork.com/freelancers/~015367bc2823e2f5c9",
  github: "https://github.com/eli00217",
  instagram: "https://www.instagram.com/heyitsmeeli_1",
  facebook: "https://www.facebook.com/share/1DvhohQX6h/",
} as const;

export const PORTRAIT = {
  src: "/portrait.png",
  alt: "Eli Alcantara — website designer and front-end developer",
} as const;

export const NAV = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

// ---------- 1. THESIS ----------
export const HERO = {
  kicker: "Website designer & front-end developer",
  // deliberate two-beat line break
  line1: "Your website is",
  line2: "the first thing",
  line3: "they judge you on.",
  lead: "Most small businesses are online in the same template as everyone else. I build sites that look like they were made for one company — because they were. Every line written by hand.",
  ctaPrimary: { label: "See the work", href: "#work" },
  ctaSecondary: { label: "Start a project", href: "#contact" },
} as const;

// Counters — all true, all verifiable by clicking
// A stat is EITHER a number that counts up, OR static text. "3–5 days" is a
// range, not a quantity — pushing it through the counter rendered "0–5 days"
// in production, because the counter starts at 0 and appends the suffix.
export const STATS = [
  { kind: "count", value: 5, label: "Live builds" },
  { kind: "count", value: 5, label: "Industries" },
  { kind: "text", text: "3–5 days", label: "Landing page" },
  { kind: "count", value: 1, label: "Person. Me." },
] as const;


// ---------- HERO IMAGE DECK ----------
// Nine photos supplied by Eli from Unsplash (he confirmed each one renders).
// Served at w=900 rather than the w=600 thumbnail params so they stay sharp on
// a retina display; every other query param is left exactly as given.
export const DECK = [
  { src: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=900&q=80&auto=format&fit=crop", alt: "A developer's workspace" },
  { src: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=900&q=80&auto=format&fit=crop", alt: "Code on screen" },
  { src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&q=80&auto=format&fit=crop", alt: "A website being designed" },
  { src: "https://images.unsplash.com/photo-1648134859177-66e35b61e106?w=900&q=80&auto=format&fit=crop", alt: "Interface design detail" },
  { src: "https://images.unsplash.com/photo-1678690832324-67961a27ca92?w=900&q=80&auto=format&fit=crop", alt: "A site laid out on screen" },
  { src: "https://images.unsplash.com/photo-1678690832871-8b9993c76aa8?w=900&q=80&auto=format&fit=crop", alt: "Layout and typography" },
  { src: "https://images.unsplash.com/photo-1519222970733-f546218fa6d7?w=900&q=80&auto=format&fit=crop", alt: "A workspace mid-build" },
  { src: "https://images.unsplash.com/photo-1642052502304-272cb5c31417?w=900&q=80&auto=format&fit=crop", alt: "A finished interface" },
  { src: "https://images.unsplash.com/photo-1740477959010-c2e99bf4a5ff?w=900&q=80&auto=format&fit=crop", alt: "Design work in progress" },
] as const;

export const MARQUEE = [
  "Fitness",
  "Dental",
  "Real estate",
  "Restaurant",
  "Home services",
  "Landing pages",
  "Business sites",
  "Portfolios",
  "Next.js",
  "React",
] as const;

// ---------- 2. TENSION ----------
export const TENSION = {
  kicker: "The problem",
  title: "Most small business sites",
  titleAccent: "look the same.",
  body: [
    "They are built on the same handful of templates, so they share the same layout, the same stock photography, and the same tired hero section. A visitor cannot tell one from another — which means they cannot tell you from your competitor.",
    "They are also slow. Page builders load a stack of scripts before anything appears, and on a phone, on real mobile data, people leave before it ever finishes.",
  ],
  points: [
    {
      n: "01",
      title: "Templated",
      body: "Recognisable at a glance. If your site looks like a template, your business looks like a template.",
    },
    {
      n: "02",
      title: "Slow",
      body: "Page builders ship code you never asked for. On a phone, on real data, that is the difference between a visit and a bounce.",
    },
    {
      n: "03",
      title: "Rented",
      body: "Your site lives inside someone else's platform, on someone else's subscription. Stop paying and it disappears.",
    },
  ],
} as const;

// ---------- 3. THE PROOF ----------
export const INDUSTRIES = [
  "All",
  "Fitness",
  "Dental",
  "Real estate",
  "Restaurant",
  "Home services",
] as const;

export const WORK = [
  {
    id: "apex",
    name: "Apex Fitness",
    industry: "Fitness",
    blurb:
      "A gym site with the intensity of the room it sells. Dark, high-contrast, membership tiers, transformation stories.",
    live: "https://fitness.workwithelico.net",
    stack: ["Next.js 15", "Framer Motion", "Tailwind"],
    palette: { bg: "#081C24", accent: "#22D3EE", ink: "#FFFFFF" },
  },
  {
    id: "lumina",
    name: "Lumina Dental",
    industry: "Dental",
    blurb:
      "Calm, clinical, unhurried. A dental studio site that lowers your heart rate instead of raising it. Eight service pages.",
    live: "https://dental.workwithelico.net",
    stack: ["Next.js 15", "React 19", "TypeScript"],
    palette: { bg: "#F8FAFC", accent: "#2563EB", ink: "#0F172A" },
  },
  {
    id: "skyline",
    name: "Skyline Estates",
    industry: "Real estate",
    blurb:
      "Editorial luxury property. Cream and gold, restrained type, six full property pages with galleries.",
    live: "https://realty.workwithelico.net",
    stack: ["Next.js 15", "TypeScript", "Framer Motion"],
    palette: { bg: "#FAF8F5", accent: "#C9A227", ink: "#111827" },
  },
  {
    id: "ember",
    name: "Ember & Oak",
    industry: "Restaurant",
    blurb:
      "Fine dining, lit like a dining room. Near-black with fire accents, an interactive menu, reservations.",
    live: "https://dine.workwithelico.net",
    stack: ["Next.js 15", "Tailwind", "Framer Motion"],
    palette: { bg: "#0B0B0B", accent: "#F59E0B", ink: "#FDE68A" },
  },
  {
    id: "purehaven",
    name: "PureHaven Cleaning",
    industry: "Home services",
    blurb:
      "Bright, calm, and built to convert. A drag comparison slider, eight service pages, and a booking flow.",
    live: "https://clean.workwithelico.net",
    stack: ["Next.js 15", "Tailwind", "shadcn/ui"],
    palette: { bg: "#F9FBFA", accent: "#0EA5A4", ink: "#0F172A" },
  },
] as const;

// ---------- 4. WHAT I DO ----------
export const SERVICES = [
  {
    id: "landing",
    title: "Landing pages",
    price: "$150 – $300",
    time: "3 – 5 days",
    body: "One page, one job: turn a visitor into an enquiry. For launches, campaigns, and businesses that need to exist online by next week.",
    includes: [
      "Custom design, no template",
      "Built for one clear action",
      "Enquiry form wired up",
      "Live on your domain",
    ],
    featured: false,
    booking:
      "https://calendly.com/projects-workwithelico/30min?a1=Landing%20Page&utm_source=website&utm_campaign=landing-page",
  },
  {
    id: "multipage",
    title: "Multi-page sites",
    price: "$400 – $700",
    time: "5 – 7 days",
    body: "A full site with room to breathe. Services, about, pricing, contact — the pages a business needs when a single page stops being enough.",
    includes: [
      "Up to six or seven pages",
      "Detail pages per service",
      "Blog or gallery if you need it",
      "Everything a landing page gets",
    ],
    featured: true,
    booking:
      "https://calendly.com/projects-workwithelico/30min?a1=Multi-Page%20Site&utm_source=website&utm_campaign=multi-page",
  },
  {
    id: "redesign",
    title: "Redesigns",
    price: "From $350",
    time: "Depends on scope",
    body: "You already have a site and it is letting you down. I rebuild it properly — same content, new foundation, dramatically faster.",
    includes: [
      "Rebuilt on Next.js",
      "Your content, kept",
      "Faster on mobile",
      "You keep the code",
    ],
    featured: false,
    booking:
      "https://calendly.com/projects-workwithelico/30min?a1=Redesign&utm_source=website&utm_campaign=redesign",
  },
] as const;

// ---------- 5. SHIPS WITH ----------
// Same five ideas any serious build should meet, written plainly.
export const SHIPS_WITH = [
  {
    key: "speed",
    title: "It loads fast on a phone",
    body: "Static pages, no page-builder bloat. It should feel instant on mobile data, not just on your office wi-fi.",
  },
  {
    key: "responsive",
    title: "It works at every size",
    body: "I check it at 375px, 768px, and full desktop. Not shrunk down — actually laid out for the screen it lands on.",
  },
  {
    key: "access",
    title: "People can actually use it",
    body: "Readable contrast, real focus states, keyboard navigation that works. Not an afterthought bolted on at the end.",
  },
  {
    key: "seo",
    title: "Search engines can read it",
    body: "Proper titles and descriptions, clean semantic structure, and schema markup so your listing looks right in results.",
  },
  {
    key: "handover",
    title: "You own all of it",
    body: "The code, the domain, the hosting account. It is yours on day one. No subscription to me, no lock-in, no hostage situation.",
  },
] as const;

// ---------- 6. HOW IT GOES ----------
export const PROCESS = [
  {
    n: "01",
    title: "Understand",
    body: "A short call. What the business does, who it is for, and what you actually need the site to make happen. No forms, no brief templates.",
  },
  {
    n: "02",
    title: "Design",
    body: "You see the design before anything is built. We change it while changing it is cheap — not after the code is written.",
  },
  {
    n: "03",
    title: "Build",
    body: "I write it. Next.js, hand-built, no page builder. You get a live preview link and watch it come together.",
  },
  {
    n: "04",
    title: "Launch",
    body: "It goes live on your domain, on your accounts, with the code handed to you. Then I stay reachable if something needs fixing.",
  },
] as const;

// ---------- 7. TOOLBOX ----------
export const STACK = [
  { name: "Next.js", role: "Framework", slug: "nextdotjs", color: "FFFFFF" },
  { name: "React", role: "UI", slug: "react", color: "61DAFB" },
  { name: "TypeScript", role: "Language", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", role: "Language", slug: "javascript", color: "F7DF1E" },
  { name: "Tailwind", role: "Styling", slug: "tailwindcss", color: "06B6D4" },
  { name: "HTML5", role: "Markup", slug: "html5", color: "E34F26" },
  { name: "CSS3", role: "Styling", slug: "css", color: "1572B6" },
  { name: "Framer Motion", role: "Animation", slug: "framer", color: "FFFFFF" },
  { name: "Vercel", role: "Hosting", slug: "vercel", color: "FFFFFF" },
  { name: "GitHub", role: "Version control", slug: "github", color: "FFFFFF" },
  { name: "Figma", role: "Design", slug: "figma", color: "F24E1E" },
] as const;

// ---------- 8. THE PERSON ----------
export const ABOUT = {
  kicker: "The person behind it",
  title: "You will be talking to me.",
  body: [
    "I am Eli. I design and build every site here myself, from the Philippines — the layout, the code, the animation, the deployment. There is no team behind me and no account manager in front of me.",
    "That is the whole pitch, really. Message me and you reach the person writing the code. If something is wrong, you tell me, and I fix it. Nothing gets lost in a handover, because there is no handover.",
    "The five builds on this page are my own — I designed and built them end to end to show what I can do. They are not client work, and I am not going to pretend otherwise. What they are is exactly the standard I would hold your project to.",
  ],
  signoff: "Book a call with me",
} as const;

// ---------- 9. THE CLOSE ----------
export const CONTACT = {
  kicker: "Start a project",
  title: "Tell me what you",
  titleAccent: "are building.",
  lead: "A landing page, a full site, or a rebuild of something that is not working. Tell me what it is and I will tell you honestly whether I am the right person for it.",
  availability: "Available for new projects",
  steps: [
    { n: "01", body: "Message me — WhatsApp, email, or book a call. I reply within one business day." },
    { n: "02", body: "A short call. No pitch deck, no pressure. Just what you need and whether I can build it." },
    { n: "03", body: "A fixed price and a timeline before you commit to anything." },
  ],
} as const;
