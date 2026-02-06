"use client";

import ThemeToggle from "../components/ThemeToggle";

export default function MethodologyContent() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          <a href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <img src="/assets/A11YOWL_logo.png" alt="" width={32} height={32} className="w-8 h-8" aria-hidden="true" />
            A11y Owl
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </a>
            <a href="/contact" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main-content" className="py-12 sm:py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            How A11y Owl Tests Your Website
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl">
            A11y Owl combines real browser testing, vision AI analysis, and keyboard interaction checks to find accessibility issues that automated DOM-only scanners miss. Here is how it works.
          </p>

          <div className="space-y-12">
            {/* How A11y Owl Works */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                1. How the Scan Works
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                When you submit a URL, A11y Owl performs a multi-step analysis of your page:
              </p>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Real Browser Rendering",
                    desc: "We load your page in a real Chromium browser using Playwright. This means we render JavaScript, execute dynamic content, and interact with your page exactly as a real visitor would. No static HTML parsing \u2014 we test the live page.",
                  },
                  {
                    step: "2",
                    title: "Screenshot Capture",
                    desc: "We capture full-page screenshots of your site as rendered in the browser. These screenshots are analyzed by our vision AI to detect visual accessibility issues that cannot be found through DOM inspection alone, such as low-contrast text rendered on background images, small or unclear interactive elements, and visually confusing layouts.",
                  },
                  {
                    step: "3",
                    title: "Keyboard Interaction Testing",
                    desc: "We simulate keyboard-only navigation through your page, testing tab order, focus indicators, keyboard traps, and interactive element accessibility. This replicates the experience of users who rely on keyboard navigation instead of a mouse.",
                  },
                  {
                    step: "4",
                    title: "Vision AI Analysis",
                    desc: "Screenshots and page data are analyzed by Google Gemini vision AI, which evaluates the page from a visual and structural perspective. The AI identifies issues based on WCAG 2.2 criteria, maps each issue to specific elements, and generates actionable code fixes.",
                  },
                  {
                    step: "5",
                    title: "Report Generation",
                    desc: "Results are compiled into a structured report with annotated screenshots, WCAG criterion references, severity ratings, and (in the Full Report) AI-generated code fixes for every issue found.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-owl-accent/10 text-owl-accent font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* WCAG Criteria Checked */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                2. WCAG 2.2 Criteria We Check
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                A11y Owl tests against WCAG 2.2 Level AA success criteria. The following are the primary areas we evaluate:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    category: "Perceivable",
                    criteria: [
                      "1.1.1 Non-text Content (alt text)",
                      "1.3.1 Info and Relationships",
                      "1.3.2 Meaningful Sequence",
                      "1.4.1 Use of Color",
                      "1.4.3 Contrast (Minimum)",
                      "1.4.4 Resize Text",
                      "1.4.11 Non-text Contrast",
                      "1.4.12 Text Spacing",
                    ],
                  },
                  {
                    category: "Operable",
                    criteria: [
                      "2.1.1 Keyboard",
                      "2.1.2 No Keyboard Trap",
                      "2.4.1 Bypass Blocks (skip nav)",
                      "2.4.3 Focus Order",
                      "2.4.6 Headings and Labels",
                      "2.4.7 Focus Visible",
                      "2.5.5 Target Size",
                      "2.5.8 Target Size (Minimum)",
                    ],
                  },
                  {
                    category: "Understandable",
                    criteria: [
                      "3.1.1 Language of Page",
                      "3.2.1 On Focus",
                      "3.2.2 On Input",
                      "3.3.1 Error Identification",
                      "3.3.2 Labels or Instructions",
                    ],
                  },
                  {
                    category: "Robust",
                    criteria: [
                      "4.1.1 Parsing",
                      "4.1.2 Name, Role, Value",
                      "4.1.3 Status Messages",
                    ],
                  },
                ].map((group) => (
                  <div key={group.category} className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">
                      {group.category}
                    </h3>
                    <ul className="space-y-1.5">
                      {group.criteria.map((criterion) => (
                        <li key={criterion} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          <svg className="w-3.5 h-3.5 mt-0.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                          </svg>
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Compliance Risk Score */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                3. Compliance Risk Score
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The Compliance Risk Score is a proprietary metric that rates your website&apos;s ADA and WCAG 2.2 AA lawsuit exposure on a scale of 0 to 100.
              </p>
              <div className="p-5 sm:p-6 rounded-xl border-2 border-owl-accent bg-white dark:bg-slate-900">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base mb-3">
                  How the score is calculated
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  The Compliance Risk Score considers multiple weighted factors, including:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {[
                    "Number and severity of issues found (critical issues have a higher impact than low-severity issues)",
                    "Types of issues detected (keyboard traps and missing focus indicators are weighted more heavily because they disproportionately affect assistive technology users)",
                    "Coverage of key WCAG criteria tested",
                    "Presence or absence of essential accessibility features such as skip navigation, proper heading hierarchy, and form labels",
                    "Visual accessibility signals detected by vision AI, including contrast and touch target sizing",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-owl-accent mt-0.5 flex-shrink-0" aria-hidden="true">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  A higher score indicates lower lawsuit risk and better accessibility compliance. A score of 0 means significant accessibility barriers were detected; a score of 100 means no issues were found during the scan.
                </p>
              </div>
            </section>

            {/* AIO Score */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                4. AIO Score (AI Search Visibility)
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                The AIO (AI Optimization) Score measures whether AI systems like ChatGPT, Google AI Overview, and Perplexity can find, understand, and cite your website content. It uses a 5-factor evaluation model:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    factor: "Semantic Structure",
                    desc: "Evaluates whether your page uses proper semantic HTML elements (header, nav, main, article, section, footer) instead of generic div elements.",
                  },
                  {
                    factor: "JSON-LD Structured Data",
                    desc: "Checks for the presence and quality of JSON-LD markup that helps AI systems understand your page content and relationships.",
                  },
                  {
                    factor: "Heading Hierarchy",
                    desc: "Analyzes whether your headings follow a logical H1, H2, H3 hierarchy that enables AI systems to parse content structure.",
                  },
                  {
                    factor: "Answer-Ready Content",
                    desc: "Evaluates whether your content is structured in a way that AI systems can extract direct answers from (clear definitions, lists, tables).",
                  },
                  {
                    factor: "Schema.org Coverage",
                    desc: "Checks for Schema.org markup that provides structured data about your business, products, services, and FAQs.",
                  },
                ].map((item) => (
                  <div key={item.factor} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                      {item.factor}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Each factor is scored individually and combined into an overall AIO Score from 0 to 100. A higher score means your content is more likely to be discovered and cited by AI systems.
              </p>
            </section>

            {/* Confidence Scoring */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                5. Confidence Scoring
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Because A11y Owl uses AI analysis, each identified issue includes a confidence indicator. This reflects how certain our system is that the issue is a genuine accessibility barrier.
              </p>
              <div className="space-y-3">
                {[
                  {
                    level: "High Confidence",
                    desc: "The issue is clearly identifiable and well-defined. Examples: missing alt text on images, missing form labels, absence of skip navigation links.",
                    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                  },
                  {
                    level: "Medium Confidence",
                    desc: "The issue is likely present but may depend on context. Examples: color contrast that is close to the threshold, heading hierarchy that may be intentional.",
                    color: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
                  },
                  {
                    level: "Lower Confidence",
                    desc: "The issue requires human review to confirm. Examples: reading order concerns based on visual layout, potential keyboard interaction issues that depend on custom JavaScript behavior.",
                    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                  },
                ].map((item) => (
                  <div key={item.level} className={`p-4 rounded-xl border ${item.color}`}>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                      {item.level}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                6. Limitations
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                No automated tool can catch every accessibility issue. A11y Owl has the following known limitations:
              </p>
              <div className="p-5 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-3">
                  What A11y Owl does not check
                </h3>
                <ul className="space-y-2 text-sm text-red-600/80 dark:text-red-400/80">
                  {[
                    "Multi-page user flows (we scan one page at a time)",
                    "Content behind authentication walls or login screens",
                    "Video captions and audio descriptions (WCAG 1.2.x)",
                    "Complex interactive widgets that require specific user input sequences to trigger",
                    "Cognitive accessibility issues that depend on subjective user experience assessment",
                    "Mobile-native app accessibility (we test web pages only)",
                    "Third-party embedded content (iframes, embedded widgets) may have limited analysis",
                    "Real assistive technology compatibility (we simulate, not test with actual screen readers)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                According to the DHS/GovTech study, approximately 57% of WCAG issues require some form of manual testing. No automated scanner catches everything. A11y Owl catches more than DOM-only scanners because of vision AI, but a complete accessibility audit still benefits from manual expert review.
              </p>
            </section>

            {/* Comparison to Manual Audits */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                7. A11y Owl vs. Manual Audits
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                A11y Owl is designed as your first line of defense, not a replacement for manual audits. Here is how we compare:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                      <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-white"></th>
                      <th className="py-3 pr-4 font-semibold text-owl-accent">A11y Owl</th>
                      <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-white">Manual Audit</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 dark:text-slate-400">
                    {[
                      { aspect: "Speed", owl: "Under 60 seconds", manual: "1-4 weeks" },
                      { aspect: "Cost", owl: "Free (scan + full report)", manual: "$5,000 - $25,000+" },
                      { aspect: "Code fixes included", owl: "Yes (AI-generated)", manual: "Recommendations only" },
                      { aspect: "Vision-based testing", owl: "Yes", manual: "Yes" },
                      { aspect: "Keyboard testing", owl: "Yes (automated)", manual: "Yes (manual)" },
                      { aspect: "Multi-page flows", owl: "Single page per scan", manual: "Full site" },
                      { aspect: "Screen reader testing", owl: "Simulated", manual: "Real devices" },
                      { aspect: "Best for", owl: "Quick scan, ongoing checks", manual: "Full certification" },
                    ].map((row) => (
                      <tr key={row.aspect} className="border-b border-slate-100 dark:border-slate-800">
                        <td className="py-3 pr-4 font-medium text-slate-900 dark:text-white text-xs sm:text-sm">{row.aspect}</td>
                        <td className="py-3 pr-4 text-xs sm:text-sm">{row.owl}</td>
                        <td className="py-3 pr-4 text-xs sm:text-sm">{row.manual}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We recommend using A11y Owl as your first step: scan your site, fix the issues found, and then pursue a manual audit if you need full certification or are responding to a legal demand. For ongoing compliance, regular A11y Owl scans help catch regressions before they become problems.
              </p>
            </section>

            {/* Professional Help */}
            <section>
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Need a full manual audit?
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto mb-4">
                  Our parent company, Logixtecs, provides professional accessibility audits and remediation services. Start with A11y Owl, then let our team handle the rest.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center h-11 px-6 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
                  >
                    Scan Your Site Free
                  </a>
                  <a
                    href="mailto:a11y@logixtecs.com"
                    className="inline-flex items-center justify-center h-11 px-6 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Contact Logixtecs
                  </a>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800" role="contentinfo">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                <img src="/assets/A11YOWL_logo.png" alt="" width={28} height={28} className="w-7 h-7" aria-hidden="true" />
                A11y Owl
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Accessibility scanning powered by vision AI.
              </p>
            </div>
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
