import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "A11y Owl - Free ADA Compliance Scanner | WCAG Accessibility Checker",
  description:
    "Scan your website for ADA compliance issues in 60 seconds. Get a free WCAG accessibility report with AI-powered vision analysis. No signup required.",
  keywords: [
    "ADA compliance",
    "WCAG scanner",
    "accessibility checker",
    "website accessibility",
    "ADA lawsuit prevention",
    "WCAG 2.2",
    "accessibility audit",
    "vision AI accessibility",
    "free accessibility scan",
    "web accessibility testing",
  ],
  metadataBase: new URL("https://a11yowl.com"),
  alternates: {
    canonical: "https://a11yowl.com",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "A11y Owl - Free ADA Compliance Scanner",
    description:
      "Find accessibility issues before a lawyer does. Free AI-powered WCAG scan in 60 seconds. No signup required.",
    url: "https://a11yowl.com",
    siteName: "A11y Owl",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "A11y Owl - Free ADA Compliance Scanner powered by Vision AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A11y Owl - Free ADA Compliance Scanner",
    description:
      "Find accessibility issues before a lawyer does. Free AI-powered WCAG scan in 60 seconds.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Logixtecs", url: "https://www.logixtecs.com/" }],
  creator: "Logixtecs",
  publisher: "Logixtecs",
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "A11y Owl",
      description:
        "AI-powered website accessibility scanner that checks ADA and WCAG 2.2 AA compliance. Uses vision AI and keyboard testing to find accessibility issues that automated DOM-only scanners miss. Provides exact code fixes for every issue found.",
      url: "https://a11yowl.com",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: [
        {
          "@type": "Offer",
          name: "Free Scan",
          price: "0",
          priceCurrency: "USD",
          description:
            "Unlimited accessibility scans with Compliance Risk Score, AIO Score, and sample issues",
        },
        {
          "@type": "Offer",
          name: "Full Report",
          price: "0",
          priceCurrency: "USD",
          description:
            "Complete accessibility report with AI-generated code fixes, DIY action items, AIO analysis, and priority roadmap — delivered free via email",
        },
      ],
      creator: {
        "@type": "Organization",
        name: "Logixtecs",
        url: "https://www.logixtecs.com/",
      },
      featureList: [
        "Vision AI accessibility scanning",
        "WCAG 2.2 AA compliance testing",
        "ADA compliance checking",
        "Keyboard interaction testing",
        "AI-generated code fixes",
        "Compliance Risk Score",
        "AIO Score (AI search visibility)",
        "PDF report generation",
        "Annotated screenshot mapping",
      ],
    },
    {
      "@type": "Organization",
      name: "A11y Owl",
      legalName: "Logixtecs",
      url: "https://a11yowl.com",
      logo: "https://a11yowl.com/assets/A11YOWL_logo.png",
      description:
        "AI-powered website accessibility scanner for ADA and WCAG 2.2 compliance. A product of Logixtecs.",
      parentOrganization: {
        "@type": "Organization",
        name: "Logixtecs",
        url: "https://www.logixtecs.com/",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "a11y-support@logixtecs.com",
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "a11y@logixtecs.com",
        },
      ],
      sameAs: [],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is A11y Owl?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A11y Owl is a free AI-powered website accessibility scanner that checks your site for ADA and WCAG 2.2 AA compliance issues. It uses vision AI and keyboard testing to find issues that traditional automated scanners miss, and provides exact code fixes for every problem found.",
          },
        },
        {
          "@type": "Question",
          name: "Is A11y Owl free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A11y Owl is completely free. Every scan includes a Compliance Risk Score, AIO Score, and sample issues on screen. The Full Report with AI-generated code fixes, DIY action items, and a priority roadmap for all issues is also free — delivered to your inbox as a PDF.",
          },
        },
        {
          "@type": "Question",
          name: "How is A11y Owl different from accessibility overlay widgets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike overlay widgets (such as accessiBe or UserWay), A11y Owl does not inject JavaScript into your website. Instead, it scans your actual source code using vision AI, identifies real accessibility issues, and provides exact code fixes. Overlay widgets were cited in 25% of 2024 ADA lawsuits as barriers to access, and the FTC fined accessiBe $1 million in January 2025 for false compliance claims.",
          },
        },
        {
          "@type": "Question",
          name: "Does my small business website need to be ADA compliant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Under Title III of the Americans with Disabilities Act, websites of businesses that serve the public must be accessible to people with disabilities. In 2024, over 4,000 ADA website lawsuits were filed, and 77% of those targeted businesses with under $25 million in revenue. The average settlement costs $25,000 or more, not including legal fees.",
          },
        },
        {
          "@type": "Question",
          name: "What does A11y Owl check for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A11y Owl checks for WCAG 2.2 Level AA compliance issues including: missing alt text, low color contrast, keyboard traps, missing focus indicators, small touch targets, broken ARIA roles, form label issues, reading order problems, and missing skip navigation. It uses vision AI to catch visual issues that DOM-only scanners miss.",
          },
        },
        {
          "@type": "Question",
          name: "How long does an A11y Owl scan take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An A11y Owl accessibility scan typically completes in under 60 seconds. Simply paste your website URL, click scan, and receive your Compliance Risk Score and issue summary. No signup or credit card required.",
          },
        },
        {
          "@type": "Question",
          name: "What is a Compliance Risk Score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Compliance Risk Score is A11y Owl's proprietary metric that measures your website's ADA and WCAG 2.2 AA lawsuit exposure on a scale of 0-100. It uses vision AI to test your page the way a screen reader user or plaintiff's attorney would. A higher score means lower lawsuit risk.",
          },
        },
        {
          "@type": "Question",
          name: "What is the AIO Score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The AIO (AI Optimization) Score measures whether AI systems like ChatGPT, Google AI Overview, and Perplexity can find, understand, and cite your website content. It checks semantic landmarks, JSON-LD structured data, heading hierarchy, and Schema.org coverage. The AIO Score is included in every scan.",
          },
        },
        {
          "@type": "Question",
          name: "How much does an ADA lawsuit cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ADA website accessibility lawsuits typically settle for $5,000 to $75,000, with the average around $25,000. However, total costs including legal fees, remediation, and ongoing monitoring can exceed $40,000 to $90,000. In the first half of 2025 alone, over 2,000 ADA website lawsuits were filed -- a 37% increase over the same period in 2024.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get professional help fixing accessibility issues?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. A11y Owl's parent company, Logixtecs, provides professional accessibility remediation services. After receiving your A11y Owl report, you can contact Logixtecs at a11y@logixtecs.com to have their team implement all recommended fixes and verify compliance.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Check Your Website for ADA Accessibility Compliance",
      description:
        "Use A11y Owl to scan your website for ADA and WCAG 2.2 compliance issues in under 60 seconds. Free, no signup required.",
      totalTime: "PT1M",
      tool: {
        "@type": "HowToTool",
        name: "A11y Owl Accessibility Scanner",
      },
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Enter your website URL",
          text: "Go to a11yowl.com and paste your website URL into the scan field. Your scan automatically includes both a Compliance Risk Score and AIO Score.",
          url: "https://a11yowl.com",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Get your Compliance Risk Score",
          text: "A11y Owl scans your site using vision AI and keyboard testing. Within 60 seconds, you receive a Compliance Risk Score (0-100) showing your lawsuit exposure level.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Review issues and get code fixes",
          text: "View your accessibility issues with severity ratings and WCAG criteria. Get the Full Report (free via email) with AI-generated code fixes, DIY action items, and a priority roadmap for every issue.",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* WCAG 2.4.1 - Skip to main content */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
