import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us - A11y Owl",
  description:
    "Contact A11y Owl for professional accessibility remediation services, technical support, or questions about ADA and WCAG compliance.",
  alternates: {
    canonical: "https://a11yowl.ai/contact",
  },
  openGraph: {
    title: "Contact Us - A11y Owl",
    description:
      "Get help with accessibility compliance. Professional remediation services by Logixtecs.",
    url: "https://a11yowl.ai/contact",
    type: "website",
    images: [
      {
        url: "/assets/og_image.png",
        width: 1200,
        height: 630,
        alt: "A11y Owl - Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - A11y Owl",
    description:
      "Get help with accessibility compliance. Professional remediation services by Logixtecs.",
    images: ["/assets/og_image.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
