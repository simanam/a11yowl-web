"use client";

import ThemeToggle from "../components/ThemeToggle";

export default function ContactContent() {
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
            <a href="/contact" className="text-sm font-medium text-slate-900 dark:text-white transition-colors" aria-current="page">
              Contact
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main-content" className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-slate-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-center text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-10 sm:mb-16">
            A11y Owl is built and maintained by{" "}
            <a
              href="https://www.logixtecs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-owl-accent hover:underline font-medium"
            >
              Logixtecs
            </a>
            . We help businesses achieve and maintain web accessibility compliance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Professional Services */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="w-12 h-12 rounded-xl bg-owl-accent/10 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c93a30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Professional Services
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Need help remediating accessibility issues? Our team provides full ADA compliance services — from audit to implementation.
              </p>
              <a
                href="mailto:a11y@logixtecs.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-owl-accent hover:underline min-h-[44px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                a11y@logixtecs.com
              </a>
            </div>

            {/* Support */}
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Technical Support
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Questions about your scan results or report? Need help understanding an issue? We&apos;re here to help.
              </p>
              <a
                href="mailto:a11y-support@logixtecs.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-owl-accent hover:underline min-h-[44px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                a11y-support@logixtecs.com
              </a>
            </div>
          </div>

          {/* Logixtecs section */}
          <div className="mt-10 sm:mt-16 text-center p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              About Logixtecs
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto mb-4">
              Logixtecs is a technology company specializing in accessibility solutions, web development, and digital transformation for businesses of all sizes.
            </p>
            <a
              href="https://www.logixtecs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
            >
              Visit Logixtecs
            </a>
          </div>
        </div>
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
