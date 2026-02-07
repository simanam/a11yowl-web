import type { Metadata } from "next";
import MethodologyContent from "./MethodologyContent";

export const metadata: Metadata = {
  title: "How We Test | A11y Owl Methodology",
  description:
    "Learn how A11y Owl scans websites for accessibility issues using vision AI, keyboard testing, and WCAG 2.2 criteria. Understand our Compliance Risk Score and AIO Score methodologies.",
  alternates: {
    canonical: "https://a11yowl.ai/methodology",
  },
  openGraph: {
    title: "How We Test | A11y Owl Methodology",
    description:
      "Learn how A11y Owl uses vision AI and keyboard testing to find accessibility issues automated tools miss.",
    url: "https://a11yowl.ai/methodology",
    type: "website",
    images: [
      {
        url: "/assets/og_image.png",
        width: 1200,
        height: 630,
        alt: "A11y Owl - How We Test",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Test | A11y Owl Methodology",
    description:
      "Learn how A11y Owl uses vision AI and keyboard testing to find accessibility issues automated tools miss.",
    images: ["/assets/og_image.png"],
  },
};

export default function MethodologyPage() {
  return <MethodologyContent />;
}
