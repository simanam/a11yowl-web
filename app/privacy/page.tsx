import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | A11y Owl",
  description:
    "A11y Owl privacy policy. Learn how we collect, use, and protect your data when you use our accessibility scanning service.",
  alternates: {
    canonical: "https://a11yowl.ai/privacy",
  },
  openGraph: {
    title: "Privacy Policy | A11y Owl",
    description:
      "A11y Owl privacy policy. Learn how we collect, use, and protect your data.",
    url: "https://a11yowl.ai/privacy",
    type: "website",
    images: [
      {
        url: "/assets/og_image.png",
        width: 1200,
        height: 630,
        alt: "A11y Owl - Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | A11y Owl",
    description:
      "A11y Owl privacy policy. Learn how we collect, use, and protect your data.",
    images: ["/assets/og_image.png"],
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
