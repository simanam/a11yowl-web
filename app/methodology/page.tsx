import type { Metadata } from "next";
import MethodologyContent from "./MethodologyContent";

export const metadata: Metadata = {
  title: "How We Test | A11y Owl Methodology",
  description:
    "Learn how A11y Owl scans websites for accessibility issues using vision AI, keyboard testing, and WCAG 2.2 criteria. Understand our Compliance Risk Score and AIO Score methodologies.",
  alternates: {
    canonical: "https://a11yowl.com/methodology",
  },
  openGraph: {
    title: "How We Test | A11y Owl Methodology",
    description:
      "Learn how A11y Owl uses vision AI and keyboard testing to find accessibility issues automated tools miss.",
    url: "https://a11yowl.com/methodology",
  },
};

export default function MethodologyPage() {
  return <MethodologyContent />;
}
