"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startScan } from "./lib/api";
import ThemeToggle from "./components/ThemeToggle";

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let scanUrl = url.trim();
    if (!scanUrl.startsWith("http://") && !scanUrl.startsWith("https://")) {
      scanUrl = "https://" + scanUrl;
    }

    try {
      const result = await startScan(scanUrl);
      router.push(`/scan/${result.scan_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header / Nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          <a href="/" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            A11y Owl
          </a>
          <div className="flex items-center gap-3">
            <a href="#how-it-works" className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              How it works
            </a>
            <a href="#pricing" className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Pricing
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="py-24 sm:py-32">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              Find accessibility issues
              <br />
              <span className="text-owl-accent">before your users do.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Dual-score scanner that checks ADA/WCAG compliance and AI discoverability in under 60 seconds. Free. No signup.
            </p>

            {/* URL Input */}
            <form onSubmit={handleScan} className="mt-10 max-w-xl mx-auto">
              <label htmlFor="url-input" className="sr-only">
                Website URL to scan
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL"
                  className="flex-1 h-14 px-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-owl-accent focus:border-owl-accent"
                  required
                  aria-describedby={error ? "scan-error" : undefined}
                  autoComplete="url"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[140px]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Scanning
                    </span>
                  ) : (
                    "Scan Now"
                  )}
                </button>
              </div>
              {error && (
                <p id="scan-error" className="mt-3 text-owl-danger text-sm" role="alert">
                  {error}
                </p>
              )}
            </form>

            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              No credit card required. Results in under 60 seconds.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50" aria-label="Industry statistics">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white">3,500+</div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  ADA lawsuits filed annually against US websites
                </p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white">96.3%</div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  of top 1M websites have detectable WCAG failures
                </p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white">15-25%</div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  of discovery traffic now comes from AI search
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Three steps to a fully audited website.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Enter your URL",
                  desc: "Paste any website URL. Our scanner crawls your page, captures screenshots, and tests keyboard navigation.",
                },
                {
                  step: "2",
                  title: "Get dual scores",
                  desc: "Compliance Risk Score for lawsuit protection. AIO Score for AI discoverability. Results in under 60 seconds.",
                },
                {
                  step: "3",
                  title: "Get your report",
                  desc: "Detailed PDF with every issue, severity ratings, WCAG criteria, and actionable fix recommendations.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-owl-accent/10 text-owl-accent font-bold text-lg flex items-center justify-center" aria-hidden="true">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two-score explanation */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Two scores. Full picture.
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Most tools only check compliance. We also check if AI can find and understand your content.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                  Compliance Risk Score
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Measures your ADA/WCAG exposure. Vision AI detects missing focus indicators, low contrast, small touch targets, and keyboard traps. Higher score means lower lawsuit risk.
                </p>
              </div>
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c93a30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                  AIO Score
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Measures how well AI systems can find and cite your content. Checks semantic landmarks, structured data, heading hierarchy, and answer-ready content blocks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Pricing
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400">
              Start free. Upgrade when you need automated fixes.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Free",
                  price: "$0",
                  period: "",
                  features: [
                    "1 URL scan",
                    "Dual scores",
                    "3 sample issues",
                    "PDF report via email",
                  ],
                  cta: "Current Plan",
                  highlighted: false,
                  disabled: true,
                },
                {
                  name: "Basic",
                  price: "$49",
                  period: "/mo",
                  features: [
                    "Automated scans",
                    "AI-powered fixes",
                    "Audit trail",
                    "Accessibility statement",
                    "1 site",
                  ],
                  cta: "Coming Soon",
                  highlighted: false,
                  disabled: true,
                },
                {
                  name: "Growth",
                  price: "$79",
                  period: "/mo",
                  features: [
                    "Everything in Basic",
                    "AIO Engine",
                    "Schema injection",
                    "Heading optimization",
                    "AIO Score dashboard",
                  ],
                  cta: "Coming Soon",
                  highlighted: true,
                  disabled: true,
                },
                {
                  name: "Shield",
                  price: "$99",
                  period: "/mo",
                  features: [
                    "Everything in Growth",
                    "Priority scanning",
                    "Evidence packets",
                    "Legal compliance docs",
                    "1 site",
                  ],
                  cta: "Coming Soon",
                  highlighted: false,
                  disabled: true,
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  className={`p-6 rounded-2xl border-2 transition-colors ${
                    plan.highlighted
                      ? "border-owl-accent bg-white dark:bg-slate-900 shadow-lg"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-owl-accent/10 text-owl-accent rounded-full">
                      Popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-slate-500">{plan.period}</span>
                    )}
                  </div>
                  <ul className="mt-6 space-y-3" role="list">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                        <svg className="w-4 h-4 mt-0.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    disabled={plan.disabled}
                    className={`w-full mt-6 h-10 rounded-lg text-sm font-semibold transition-colors ${
                      plan.highlighted
                        ? "bg-owl-accent hover:bg-owl-accent-hover text-white disabled:opacity-50"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50"
                    }`}
                    aria-label={`${plan.cta} - ${plan.name} plan`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800" role="contentinfo">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">
                A11y Owl
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Source-first accessibility for small businesses.
              </p>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              &copy; {new Date().getFullYear()} A11y Owl. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
