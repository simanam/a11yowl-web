import type { Metadata } from "next";
import AccessibilityContent from "./AccessibilityContent";

export const metadata: Metadata = {
  title: "Accessibility Statement - A11y Owl",
  description:
    "A11y Owl's commitment to web accessibility. Learn about the standards we follow, measures we take, and how to report accessibility issues.",
  alternates: {
    canonical: "https://a11yowl.com/accessibility",
  },
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
