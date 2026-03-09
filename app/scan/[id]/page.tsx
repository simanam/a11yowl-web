"use client";

import ThemeToggle from "../../components/ThemeToggle";

export default function ScanPage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <nav
          className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          <a
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            <img src="/assets/A11YOWL_logo.png" alt="" width={32} height={32} className="w-8 h-8" aria-hidden="true" />
            A11y Owl
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/contact" className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="main-content" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center p-6 sm:p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
            Web Scanner Coming Soon
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Our web scanner is being upgraded with even more powerful AI analysis. In the meantime, try our browser extension for instant accessibility scanning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
            >
              Go Home
            </a>
            <a
              href="https://github.com/simanam/a11yowl-extension"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Get Extension
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
