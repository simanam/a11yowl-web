import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "A11y Owl - Accessibility & AI Readiness Scanner",
  description:
    "Free accessibility scanner with dual scoring: Compliance Risk + AI Discoverability. Find ADA/WCAG issues and AI readiness gaps in seconds.",
  openGraph: {
    title: "A11y Owl - Accessibility & AI Readiness Scanner",
    description:
      "Scan any URL for free. Get your Compliance Risk Score and AIO Score in under 60 seconds.",
    url: "https://a11yowl.com",
    siteName: "A11y Owl",
    type: "website",
  },
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
