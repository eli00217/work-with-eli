import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workwithelico.net"),
  title: {
    default: "Work With Eli — Website Designer & Front-End Developer",
    template: "%s | Work With Eli",
  },
  description:
    "I design and build websites by hand — no templates. Five live demo builds across fitness, dental, real estate, restaurant and home services. Landing pages in 3–5 days.",
  keywords: [
    "freelance web designer",
    "front-end developer",
    "Next.js developer",
    "React developer",
    "small business website",
    "landing page design",
    "Philippines web developer",
  ],
  authors: [{ name: SITE.owner }],
  creator: SITE.owner,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://workwithelico.net",
    siteName: SITE.name,
    title: "Work With Eli — Website Designer & Front-End Developer",
    description:
      "Websites built by hand, not from a template. Five live demo builds you can click into right now.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work With Eli — Website Designer & Front-End Developer",
    description:
      "Websites built by hand, not from a template. Five live demo builds you can click into right now.",
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.owner,
  jobTitle: SITE.role,
  url: "https://workwithelico.net",
  email: SITE.email,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  knowsAbout: [
    "Web Design",
    "Front-End Development",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Performance Optimization",
    "SEO",
  ],
  sameAs: [SITE.github, SITE.upwork, SITE.instagram, SITE.facebook],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      id="top"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-screen bg-void font-sans text-chalk antialiased">
        {children}
      </body>
    </html>
  );
}
