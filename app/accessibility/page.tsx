import type { Metadata } from "next";
import AccessibilityContent from "./AccessibilityContent";

export const metadata: Metadata = {
  title: "Accessibility Statement - A11y Owl",
  description:
    "A11y Owl's commitment to web accessibility. Learn about the WCAG 2.2 AA standards we follow, measures we take, and how to report accessibility issues.",
  alternates: {
    canonical: "https://a11yowl.ai/accessibility",
  },
  openGraph: {
    title: "Accessibility Statement - A11y Owl",
    description:
      "A11y Owl's commitment to web accessibility and WCAG 2.2 AA compliance.",
    url: "https://a11yowl.ai/accessibility",
    type: "website",
    images: [
      {
        url: "/assets/og_image.png",
        width: 1200,
        height: 630,
        alt: "A11y Owl - Accessibility Statement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessibility Statement - A11y Owl",
    description:
      "A11y Owl's commitment to web accessibility and WCAG 2.2 AA compliance.",
    images: ["/assets/og_image.png"],
  },
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
