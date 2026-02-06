"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { startScan } from "./lib/api";
import ThemeToggle from "./components/ThemeToggle";
import AnimatedCounter from "./components/AnimatedCounter";
import CheckList from "./components/CheckList";

export default function LandingPage() {
  return (
    <Suspense>
      <LandingPageInner />
    </Suspense>
  );
}

function LandingPageInner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pre-fill URL from query params
  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setUrl(urlParam);
    }
  }, [searchParams]);

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
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          <a href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <img src="/assets/A11YOWL_logo.png" alt="" width={32} height={32} className="w-8 h-8" aria-hidden="true" />
            A11y Owl
          </a>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              How it works
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              FAQ
            </a>
            <a href="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-1"
          >
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              FAQ
            </a>
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
              Find accessibility issues
              <br className="hidden xs:block" />
              <span className="text-owl-accent"> before a lawyer does.</span>
            </h1>
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              94.8% of websites fail WCAG. ADA lawsuits hit 4,000+ last year &mdash; up 37%.
              Our AI scanner finds what automated tools miss. 60 seconds. Free.
            </p>

            {/* URL Input */}
            <form onSubmit={handleScan} className="mt-8 sm:mt-10 max-w-xl mx-auto">
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
                  className="w-full sm:flex-1 h-14 px-5 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-owl-accent focus:border-owl-accent"
                  required
                  aria-describedby={error ? "scan-error" : undefined}
                  autoComplete="url"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 sm:h-14 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[140px] sm:min-w-[160px]"
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

            </form>

            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
              No signup. No credit card. Results in 60 seconds.
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 sm:py-16 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50" aria-label="Industry statistics">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  94.8%
                </div>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  of the top 1M websites fail WCAG
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  WebAIM 2025
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  4,000+
                </div>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  ADA lawsuits filed in 2024
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-owl-accent">
                  $25K+
                </div>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  average lawsuit cost
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  settlement + legal fees
                </p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  25%
                </div>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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
        <section id="how-it-works" className="py-16 sm:py-24 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
              Three steps. Under 60 seconds. No installs.
            </p>

            <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: "1",
                  title: "Paste your URL",
                  desc: "We load your site in a real browser, capture screenshots, and test every keyboard interaction \u2014 just like a real user would.",
                },
                {
                  step: "2",
                  title: "Get your compliance score",
                  desc: "Your Compliance Risk Score reveals real lawsuit exposure. Our vision AI catches issues that DOM-only scanners miss. Your AIO Score shows how AI search tools can find your content.",
                },
                {
                  step: "3",
                  title: "Fix it with real code",
                  desc: "Every issue comes with annotated screenshots, WCAG criteria, severity ratings, and exact code fixes you can copy-paste. Delivered as a PDF to your inbox.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
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
        <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Deep accessibility scanning, powered by vision AI.
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
              We don&apos;t just check your HTML. We see your page like a real user &mdash; and catch what automated tools miss.
            </p>

            {/* Primary: Compliance Risk Score -- full width card */}
            <div className="mt-10 sm:mt-16 p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-owl-accent bg-white dark:bg-slate-900 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-owl-accent/10 text-owl-accent rounded-full">
                    Core
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                    Compliance Risk Score
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                Measures your ADA and WCAG 2.2 AA exposure. Our vision AI tests your page the way a screen reader user or a plaintiff&apos;s lawyer would &mdash; catching issues that DOM-only scanners miss. Higher score = lower lawsuit risk.
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

            {/* Secondary: AIO Score -- smaller, framed as add-on */}
            <div className="mt-6 sm:mt-8 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c93a30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">
                    Included
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                    AIO Score &mdash; AI Search Visibility
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Already accessible? Go further. Our AIO Score checks whether AI systems like ChatGPT and Perplexity can find and cite your content. Included in every scan.
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
        <section className="py-16 sm:py-24 scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Why not an overlay?
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
              Overlay widgets promise one-click compliance. The data tells a different story.
            </p>

            <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
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
                  25% of 2024 accessibility lawsuits specifically cited overlay widgets as barriers &mdash; not solutions. The FTC fined accessiBe $1M in January 2025 for false claims that its widget made websites WCAG compliant. Overlays inject JavaScript that changes what users see, but never fixes the underlying code.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  We scan the actual source
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  A11y Owl uses vision AI and keyboard testing on your real page. No DOM injection. No cosmetic patches. We find what&apos;s actually broken and show you exactly where and why. Every issue is mapped to a specific WCAG 2.2 criterion.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
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
                  You get real code fixes
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Overlays mask problems &mdash; they don&apos;t fix them. Our reports include annotated screenshots, severity ratings, and exact code changes for every issue. Copy, paste, deploy. Or hand the report to your developer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Numbers -- full-width stat strip (different stats from top bar) */}
        <section className="py-14 sm:py-20 bg-slate-900 dark:bg-slate-800" aria-label="Why act now">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-center text-white mb-8 sm:mb-12">
              The risk is growing every year.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                  <AnimatedCounter target={37} suffix="%" />
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400">
                  lawsuit surge YoY
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  H1 2025
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-owl-accent">
                  <AnimatedCounter target={1} prefix="$" suffix="M" />
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400">
                  FTC fine against accessiBe
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  for false WCAG claims
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                  <AnimatedCounter target={57} suffix="%" />
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400">
                  of WCAG issues need manual testing
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  DHS / GovTech study
                </p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                  <AnimatedCounter target={60} suffix="s" />
                </div>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400">
                  to scan your site with A11y Owl
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 sm:py-24 bg-white dark:bg-slate-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Trusted by businesses that take compliance seriously.
            </h2>

            {/* Trust Badges */}
            <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                {
                  label: "Powered by Vision AI",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ),
                },
                {
                  label: "WCAG 2.2 AA Testing",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
                {
                  label: "No Overlay Widgets",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ),
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  <span className="text-owl-accent">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>

            {/* Testimonial Cards */}
            <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  quote: "We had no idea our site had 47 accessibility issues. A11y Owl found them in under a minute and gave us the exact code to fix each one.",
                  name: "Sarah Chen",
                  title: "Owner",
                  company: "Bloom & Branch Florals",
                },
                {
                  quote: "Our previous 'accessibility solution' was an overlay widget. After reading about the FTC fine, we switched to A11y Owl. Night and day difference.",
                  name: "Marcus Webb",
                  title: "CTO",
                  company: "DataPulse Analytics",
                },
                {
                  quote: "The report saved us. We fixed 12 critical issues before they became a lawsuit. Free scan vs $25,000 lawsuit is not a hard decision.",
                  name: "James Okoro",
                  title: "Director of Operations",
                  company: "Summit Legal Group",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                >
                  <svg className="w-8 h-8 text-slate-200 dark:text-slate-700 mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500 italic">
              Example testimonials shown for illustration. Real customer testimonials coming soon.
            </p>

            {/* Stats Strip */}
            <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  &mdash;
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  websites scanned
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  &mdash;
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  issues found
                </p>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold text-owl-accent">
                  47s
                </div>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  average scan time
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 sm:py-24 scroll-mt-20 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Everything you need. Completely free.
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              No credit card. No subscriptions. Full reports with AI code fixes delivered to your inbox.
            </p>

            <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
              {/* On-Screen Results */}
              <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Free Scan
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Instant results on screen
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$0</span>
                </div>
                <ul className="mt-5 space-y-3" role="list">
                  {[
                    "Compliance Risk Score (0-100)",
                    "AIO Score (AI search visibility)",
                    "3 sample issues with screenshots",
                    "Severity ratings + WCAG criteria",
                    "Lawsuit risk calculator",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4 mt-0.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    document.getElementById("url-input")?.focus();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full mt-5 sm:mt-6 h-10 sm:h-11 rounded-lg text-sm font-semibold bg-owl-accent hover:bg-owl-accent-hover text-white transition-colors"
                  aria-label="Scan Now - Free Scan"
                >
                  Scan Now
                </button>
              </div>

              {/* Full Report */}
              <div className="p-5 sm:p-6 rounded-2xl border-2 border-owl-accent bg-white dark:bg-slate-900 shadow-lg">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full bg-owl-accent/10 text-owl-accent">
                  Free via Email
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Full Report
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Complete PDF delivered to your inbox
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">$0</span>
                </div>
                <ul className="mt-5 space-y-3" role="list">
                  {[
                    "Everything in Free Scan, plus:",
                    "AI-generated code fixes for every issue",
                    "DIY action items (step-by-step)",
                    "AIO breakdown + AI visibility analysis",
                    "Priority remediation roadmap",
                    "Annotated screenshots",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4 mt-0.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    document.getElementById("url-input")?.focus();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full mt-5 sm:mt-6 h-10 sm:h-11 rounded-lg text-sm font-semibold bg-owl-accent hover:bg-owl-accent-hover text-white transition-colors"
                  aria-label="Scan and Get Full Report"
                >
                  Get Your Free Report
                </button>
              </div>
            </div>

            {/* Professional Remediation */}
            <div className="mt-10 sm:mt-12 max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                Need professional remediation?
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto mb-4">
                <strong>Logixtecs</strong> fixes all types of websites &mdash; WordPress, Shopify, custom web apps, e-commerce, government portals, and more. Email us your report for a custom quote.
              </p>
              <a
                href="mailto:a11y@logixtecs.com"
                className="inline-flex items-center justify-center h-11 px-6 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                a11y@logixtecs.com
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-center text-slate-500 dark:text-slate-400 text-sm sm:text-base">
              Everything you need to know about A11y Owl.
            </p>

            <div className="mt-10 sm:mt-12 space-y-4">
              {[
                {
                  q: "What is A11y Owl?",
                  a: "A11y Owl is a free AI-powered website accessibility scanner. It checks your site for ADA and WCAG 2.2 AA compliance issues using vision AI and keyboard testing \u2014 finding problems that traditional automated scanners miss. You get a Compliance Risk Score, identified issues with screenshots, and (in the Full Report) exact code fixes for every issue.",
                },
                {
                  q: "Is A11y Owl really free?",
                  a: "Yes. You can run unlimited scans for free. Every scan includes your Compliance Risk Score, AIO Score, and sample issues on screen. The Full Report with AI-generated code fixes, DIY action items, and a priority roadmap for all issues is also free \u2014 delivered to your inbox as a PDF. No credit card required.",
                },
                {
                  q: "How is A11y Owl different from overlay widgets like accessiBe or UserWay?",
                  a: "Overlay widgets inject JavaScript that cosmetically changes what users see but never fix your actual code. In 2024, 25% of ADA lawsuits cited overlay widgets as barriers to access. The FTC fined accessiBe $1 million in January 2025 for falsely claiming its widget made sites WCAG compliant. A11y Owl takes the opposite approach: we scan your real source code, identify genuine issues, and provide actual code fixes.",
                },
                {
                  q: "Does my website need to be ADA compliant?",
                  a: "If your business serves the public (which includes having a website), the ADA likely applies to you. The DOJ has consistently interpreted Title III to cover websites. In 2024, over 4,000 ADA website lawsuits were filed. 77% targeted businesses with under $25 million in revenue. The question is not whether you need compliance \u2014 it is whether you will achieve it before or after a lawsuit.",
                },
                {
                  q: "How long does a scan take?",
                  a: "Most scans complete in under 60 seconds. Enter your URL, click scan, and see results immediately. No signup, no credit card, no software to install.",
                },
                {
                  q: "What does the Compliance Risk Score measure?",
                  a: "The Compliance Risk Score rates your website\u2019s ADA and WCAG 2.2 AA exposure on a scale of 0-100. Unlike automated DOM-only scanners, our vision AI evaluates your page the way a screen reader user or a plaintiff\u2019s attorney would \u2014 testing visual layout, keyboard navigation, and interactive elements. A higher score indicates lower lawsuit risk.",
                },
                {
                  q: "What is the AIO Score?",
                  a: "The AIO (AI Optimization) Score measures whether AI systems like ChatGPT, Google AI Overview, and Perplexity can find and cite your content. It evaluates semantic HTML structure, JSON-LD data, heading hierarchy, and schema coverage. The AIO Score is included in every scan.",
                },
                {
                  q: "How much could an ADA lawsuit cost my business?",
                  a: "ADA website lawsuits typically settle between $5,000 and $75,000, with the average around $25,000. Total costs \u2014 including legal fees, remediation, and monitoring \u2014 can reach $40,000 to $90,000. Serial plaintiffs file the majority of these cases, and small businesses are frequently targeted because they are more likely to settle quickly.",
                },
                {
                  q: "What do I do after I get my report?",
                  a: "Option 1: Use the AI-generated code fixes in the Full Report to fix issues yourself. Option 2: Hand the PDF to your developer or agency \u2014 every issue includes the exact code change needed. Option 3: Contact Logixtecs (our parent company) at a11y@logixtecs.com for professional remediation services.",
                },
                {
                  q: "Can Logixtecs fix my website?",
                  a: "Yes. Logixtecs, our parent company, provides professional accessibility remediation for all types of websites \u2014 WordPress, Shopify, custom web apps, e-commerce, government portals, and more. Email your A11y Owl report to a11y@logixtecs.com and they will provide a custom quote within 24 hours.",
                },
                {
                  q: "Do you offer ongoing monitoring?",
                  a: "We are launching monitoring plans that include scheduled weekly scans, unlimited reports, and proactive alerts when new issues appear. Join the waitlist on our pricing page to be notified when these plans go live.",
                },
              ].map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 cursor-pointer text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors list-none [&::-webkit-details-marker]:hidden min-h-[48px]">
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-slate-400 dark:text-slate-500 group-open:rotate-180 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 sm:py-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Find it now for free &mdash; or find it in a lawsuit for $25,000.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400">
              Every day your site stays non-compliant is another day you&apos;re exposed to an ADA lawsuit. The scan takes 60 seconds. The full report is free.
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
                  className="w-full sm:flex-1 h-14 px-5 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base sm:text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-owl-accent focus:border-owl-accent"
                  required
                  autoComplete="url"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 sm:h-14 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-w-[140px] sm:min-w-[160px]"
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
      <footer className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800" role="contentinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                <img src="/assets/A11YOWL_logo.png" alt="" width={28} height={28} className="w-7 h-7" aria-hidden="true" />
                A11y Owl
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Accessibility scanning powered by vision AI.
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
              <a href="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/methodology" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Pricing
              </a>
              <a href="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Contact
              </a>
              <a href="/accessibility" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Accessibility
              </a>
            </nav>
            <div className="text-center sm:text-right">
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
