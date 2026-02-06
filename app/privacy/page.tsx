import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | A11y Owl",
  description:
    "A11y Owl privacy policy. Learn how we collect, use, and protect your data when you use our accessibility scanning service.",
  alternates: {
    canonical: "https://a11yowl.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | A11y Owl",
    description:
      "A11y Owl privacy policy. Learn how we collect, use, and protect your data.",
    url: "https://a11yowl.com/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
