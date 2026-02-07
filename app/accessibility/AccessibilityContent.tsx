"use client";

import ThemeToggle from "../components/ThemeToggle";

export default function AccessibilityContent() {
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Accessibility Statement
          </h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 mb-10">
            Last updated: February 6, 2026
          </p>

          <div className="prose-section space-y-10">
            {/* Commitment */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Our Commitment
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                A11y Owl is committed to ensuring digital accessibility for people with disabilities. As a product dedicated to helping others achieve web accessibility, we hold ourselves to the same high standards we encourage in our users. We are continually improving the user experience of a11yowl.ai and applying the relevant accessibility standards to ensure we provide equal access to all users.
              </p>
            </section>

            {/* Standards */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Standards We Follow
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                A11y Owl aims to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.2 Level AA</strong>. These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {[
                  "Visual impairments (blindness, low vision, color blindness)",
                  "Hearing impairments (deafness, hard of hearing)",
                  "Motor impairments (limited fine motor control, inability to use a mouse)",
                  "Cognitive impairments (learning disabilities, memory limitations)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-owl-accent mt-0.5 flex-shrink-0" aria-hidden="true">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Measures Taken */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Measures We Take
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We take the following measures to ensure accessibility of a11yowl.ai:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    title: "Skip Navigation",
                    desc: "A skip-to-main-content link is provided as the first focusable element on every page.",
                  },
                  {
                    title: "Semantic HTML",
                    desc: "We use proper semantic HTML elements (header, nav, main, footer, article, section) throughout the site.",
                  },
                  {
                    title: "Keyboard Navigation",
                    desc: "All interactive elements are fully operable via keyboard. No keyboard traps exist on the site.",
                  },
                  {
                    title: "ARIA Attributes",
                    desc: "ARIA roles, labels, and live regions are used where native HTML semantics are insufficient.",
                  },
                  {
                    title: "Color Contrast",
                    desc: "Text and interactive elements meet WCAG 2.2 AA contrast ratio requirements (4.5:1 for normal text, 3:1 for large text).",
                  },
                  {
                    title: "Focus Indicators",
                    desc: "Visible focus indicators are provided for all interactive elements to support keyboard navigation.",
                  },
                  {
                    title: "Responsive Design",
                    desc: "The site is fully responsive and supports text resizing up to 200% without loss of content or functionality.",
                  },
                  {
                    title: "Dark Mode Support",
                    desc: "A system-aware dark mode with manual toggle is provided to reduce visual strain.",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Known Limitations */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Known Limitations
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Despite our best efforts, some areas of the site may not yet be fully accessible:
              </p>
              <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
                <ul className="space-y-2 text-sm text-amber-700/80 dark:text-amber-400/80">
                  {[
                    "PDF reports generated by our service may have limited screen reader compatibility depending on the complexity of visual elements and code snippets.",
                    "Some interactive data visualizations (score gauges, progress rings) provide text alternatives but may not convey all visual nuances to screen reader users.",
                    "Third-party embedded content (if any) may not meet our accessibility standards.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We are actively working to address these limitations. If you encounter any accessibility barriers, please contact us.
              </p>
            </section>

            {/* Feedback */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Feedback and Contact
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We welcome your feedback on the accessibility of a11yowl.ai. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-white">Accessibility Support</strong>
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Email:{" "}
                  <a href="mailto:a11y-support@logixtecs.com" className="text-owl-accent hover:underline font-medium">
                    a11y-support@logixtecs.com
                  </a>
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Website:{" "}
                  <a href="https://a11yowl.ai" className="text-owl-accent hover:underline font-medium">
                    a11yowl.ai
                  </a>
                </p>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  We aim to respond to accessibility feedback within 2 business days.
                </p>
              </div>
            </section>

            {/* Third-Party Content */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Third-Party Content
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                A11y Owl may link to or display content from third-party websites and services. We are not responsible for the accessibility practices of these external sites. However, we make every effort to link only to sites that follow accessibility best practices.
              </p>
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
