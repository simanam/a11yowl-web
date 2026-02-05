"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startScan } from "./lib/api";
import ThemeToggle from "./components/ThemeToggle";
import AnimatedCounter from "./components/AnimatedCounter";
import CheckList from "./components/CheckList";

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [includeAio, setIncludeAio] = useState(false);
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
      const result = await startScan(scanUrl, includeAio);
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
          <a href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <img src="/assest/A11YOWL_logo.png" alt="" width={32} height={32} className="w-8 h-8" aria-hidden="true" />
            A11y Owl
          </a>
          <div className="flex items-center gap-3">
            <a href="#how-it-works" className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              How it works
            </a>
            <a href="#pricing" className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Pricing
            </a>
            <a href="/contact" className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
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
              <span className="text-owl-accent">before a lawyer does.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              94% of websites fail WCAG. ADA lawsuits hit 4,187 last year.
              We scan your site with vision AI and find the issues automated tools miss — in 60 seconds. Free.
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
                  className="h-14 px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[160px]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Scanning
                    </span>
                  ) : (
                    "Scan Your Site Free"
                  )}
                </button>
              </div>
              {error && (
                <p id="scan-error" className="mt-3 text-owl-danger text-sm" role="alert">
                  {error}
                </p>
              )}

              <label className="mt-4 flex items-center justify-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeAio}
                  onChange={(e) => setIncludeAio(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-owl-accent focus:ring-owl-accent focus:ring-2 bg-white dark:bg-slate-800"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  Also check AI search visibility (AIO Score)
                </span>
              </label>
            </form>

            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              No signup. No credit card. Results in 60 seconds.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-16 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50" aria-label="Industry statistics">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  <AnimatedCounter target={94} suffix="%" />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  of top 1M websites fail WCAG
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  WebAIM 2025
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  <AnimatedCounter target={4187} />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  ADA lawsuits filed in 2024
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-owl-accent">
                  <AnimatedCounter target={25} prefix="$" suffix="K" />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  average lawsuit cost
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  settlement + legal fees
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  <AnimatedCounter target={25} suffix="%" />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  of lawsuits cite overlay widgets
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  overlays don&apos;t protect you
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
              Three steps. Under 60 seconds. No installs.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Paste your URL",
                  desc: "We crawl your site with a real browser, take screenshots, and test every keyboard interaction.",
                },
                {
                  step: "2",
                  title: "Get your accessibility score",
                  desc: "Your Compliance Risk Score shows real lawsuit exposure — powered by vision AI that catches what automated scanners miss. Optionally add an AIO Score to check AI search visibility.",
                },
                {
                  step: "3",
                  title: "Get your detailed report",
                  desc: "Every issue mapped with annotated screenshots, WCAG criteria, severity ratings, and exact code fixes. Sent to your inbox as a PDF.",
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

        {/* What we check */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Deep accessibility scanning, powered by vision AI.
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              We don&apos;t just check your HTML. We see your page like a real user — and catch what automated tools miss.
            </p>

            {/* Primary: Compliance Risk Score — full width card */}
            <div className="mt-16 p-8 sm:p-10 rounded-2xl border-2 border-owl-accent bg-white dark:bg-slate-900 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-owl-accent/10 text-owl-accent rounded-full">
                    Core
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Compliance Risk Score
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
                Measures your ADA and WCAG 2.2 AA exposure. Our vision AI tests your page the way a screen reader user or a plaintiff&apos;s lawyer would — catching issues that DOM-only scanners miss. Higher score = lower lawsuit risk.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
                <CheckList
                  items={[
                    "Missing focus indicators",
                    "Low contrast text",
                    "Keyboard traps",
                  ]}
                />
                <CheckList
                  items={[
                    "Small touch targets (< 48px)",
                    "Missing alt text",
                    "Broken ARIA roles",
                  ]}
                />
                <CheckList
                  items={[
                    "Form label issues",
                    "Reading order problems",
                    "Missing skip navigation",
                  ]}
                />
              </div>
            </div>

            {/* Secondary: AIO Score — smaller, framed as add-on */}
            <div className="mt-8 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c93a30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">
                    Optional Add-on
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    AIO Score — AI Search Visibility
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Already accessible? Go further. Our AIO Score checks whether AI systems like ChatGPT and Perplexity can find and cite your content. Enable it with one click during your scan.
              </p>
              <CheckList
                items={[
                  "Semantic landmarks vs <div> soup",
                  "JSON-LD structured data",
                  "Heading hierarchy (H1\u2192H2\u2192H3)",
                  "Answer-ready content blocks",
                  "Schema.org coverage",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Why Not an Overlay */}
        <section className="py-24 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Why not an overlay?
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Overlay widgets promise one-click compliance. The data tells a different story.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Overlays don&apos;t work
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  25% of 2024 accessibility lawsuits specifically cited overlay widgets as barriers. The FTC fined accessiBe $1M in January 2025 for misleading claims.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  We scan the source
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  A11y Owl uses vision AI and keyboard testing on your actual page. No DOM injection. No fake fixes. Real issues with real code fixes.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  You need real code fixes
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Overlays mask problems — they don&apos;t fix them. We give you annotated screenshots, WCAG criteria, severity ratings, and exact code changes for every issue found.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Numbers — full-width stat strip (different stats from top bar) */}
        <section className="py-20 bg-slate-900 dark:bg-slate-800" aria-label="Why act now">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl font-extrabold text-center text-white mb-12">
              The risk is growing every year.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white">
                  <AnimatedCounter target={37} suffix="%" />
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  lawsuit surge year-over-year
                </p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-owl-accent">
                  <AnimatedCounter target={1} prefix="$" suffix="M" />
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  FTC fine against accessiBe
                </p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white">
                  <AnimatedCounter target={96} suffix="%" />
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  of issues missed by automated tools
                </p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white">
                  <AnimatedCounter target={60} suffix="s" />
                </div>
                <p className="mt-3 text-sm text-slate-400">
                  to scan your site with A11y Owl
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
              Start with a free accessibility scan. Upgrade when you need continuous monitoring.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Free Scan",
                  price: "$0",
                  period: "",
                  features: [
                    "Unlimited accessibility scans",
                    "Compliance Risk Score",
                    "3 sample issues shown",
                    "Issues-only PDF report",
                  ],
                  cta: "Scan Now",
                  highlighted: false,
                  disabled: false,
                },
                {
                  name: "Full Report",
                  price: "$7.99",
                  period: "/report",
                  features: [
                    "Everything in Free Scan",
                    "AI code fixes for every issue",
                    "AIO Score + analysis",
                    "Lawsuit risk calculator",
                  ],
                  cta: "Scan First",
                  highlighted: true,
                  disabled: false,
                },
                {
                  name: "Growth",
                  price: "$79",
                  period: "/mo",
                  features: [
                    "Scheduled monitoring",
                    "Unlimited reports",
                    "Schema injection",
                    "Up to 5 sites",
                  ],
                  cta: "Coming Soon",
                  highlighted: false,
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
                    "Unlimited sites",
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
                    onClick={() => {
                      if (!plan.disabled) {
                        document.getElementById("url-input")?.focus();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`w-full mt-6 h-10 rounded-lg text-sm font-semibold transition-colors ${
                      plan.highlighted
                        ? "bg-owl-accent hover:bg-owl-accent-hover text-white disabled:opacity-50"
                        : plan.disabled
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-50"
                          : "bg-owl-accent hover:bg-owl-accent-hover text-white"
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

        {/* Bottom CTA */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Fix it now for free, or fix it later for $25K.
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
              Every day your site stays non-compliant is another day you&apos;re exposed. Scan takes 60 seconds. The report is free.
            </p>
            <form onSubmit={handleScan} className="mt-8 max-w-xl mx-auto">
              <label htmlFor="url-input-bottom" className="sr-only">
                Website URL to scan
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="url-input-bottom"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your website URL"
                  className="flex-1 h-14 px-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-owl-accent focus:border-owl-accent"
                  required
                  autoComplete="url"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[160px]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Scanning
                    </span>
                  ) : (
                    "Scan Your Site Free"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800" role="contentinfo">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                <img src="/assest/A11YOWL_logo.png" alt="" width={28} height={28} className="w-7 h-7" aria-hidden="true" />
                A11y Owl
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Accessibility scanning powered by vision AI.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                A product of <a href="https://www.logixtecs.com/" target="_blank" rel="noopener noreferrer" className="text-owl-accent hover:underline">Logixtecs</a>
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                &copy; {new Date().getFullYear()} A11y Owl. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
