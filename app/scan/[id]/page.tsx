"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getScanStatus, ScanStatusResponse } from "../../lib/api";
import ScoreGauge from "../../components/ScoreGauge";
import EmailModal from "../../components/EmailModal";
import PlatformCTA from "../../components/PlatformCTA";
import ThemeToggle from "../../components/ThemeToggle";

const PROGRESS_STAGES = [
  { key: "queued", label: "Preparing scan environment" },
  { key: "crawling", label: "Capturing screenshots & testing navigation" },
  { key: "analyzing", label: "AI agents analyzing your site" },
];

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    critical:
      "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800",
    high:
      "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800",
    medium:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
    low:
      "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${styles[severity] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"}`}
    >
      {severity}
    </span>
  );
}

export default function ScanPage() {
  const params = useParams();
  const scanId = params.id as string;

  const [scan, setScan] = useState<ScanStatusResponse | null>(null);
  const [error, setError] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!scanId) return;

    let intervalId: NodeJS.Timeout;

    const poll = async () => {
      try {
        const data = await getScanStatus(scanId);
        setScan(data);

        if (data.status === "completed" || data.status === "failed") {
          clearInterval(intervalId);
        }
      } catch {
        setError("Failed to load scan status. Please try again.");
        clearInterval(intervalId);
      }
    };

    poll();
    intervalId = setInterval(poll, 2000);

    return () => clearInterval(intervalId);
  }, [scanId]);

  // Focus heading when results load for screen reader announcement
  useEffect(() => {
    if (scan?.status === "completed" || scan?.status === "failed") {
      headingRef.current?.focus();
    }
  }, [scan?.status]);

  // Header shared across all states
  const header = (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <nav
        className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          A11y Owl
        </a>
        <div className="flex items-center gap-3">
          {scan?.url && (
            <span className="hidden sm:inline-block text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
              {scan.url}
            </span>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );

  // Loading / in-progress state
  if (!scan || (scan.status !== "completed" && scan.status !== "failed")) {
    const currentStage = scan?.status || "queued";
    const stageOrder = ["queued", "crawling", "analyzing"];
    const currentIndex = stageOrder.indexOf(currentStage);

    return (
      <>
        {header}
        <main id="main-content" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center p-8 max-w-md mx-auto">
            <div
              className="w-14 h-14 border-[3px] border-slate-200 dark:border-slate-700 border-t-owl-accent rounded-full animate-spin mx-auto mb-8"
              role="status"
              aria-label="Scanning in progress"
            />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
              Scanning your site
            </h1>
            <ol className="space-y-3 text-left" aria-label="Scan progress">
              {PROGRESS_STAGES.map((stage) => {
                const stageIndex = stageOrder.indexOf(stage.key);
                const isActive = stage.key === currentStage;
                const isDone = stageIndex < currentIndex;

                return (
                  <li
                    key={stage.key}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                      isActive
                        ? "bg-owl-accent/5 dark:bg-owl-accent/10 text-slate-900 dark:text-white font-medium"
                        : isDone
                          ? "text-slate-400 dark:text-slate-500"
                          : "text-slate-300 dark:text-slate-600"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center" aria-hidden="true">
                      {isDone ? (
                        <svg className="w-5 h-5 text-owl-success" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : isActive ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-owl-accent animate-pulse" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                      )}
                    </span>
                    <span>{stage.label}</span>
                  </li>
                );
              })}
            </ol>
            {scan?.url && (
              <p className="mt-8 text-sm text-slate-400 dark:text-slate-500 truncate">
                {scan.url}
              </p>
            )}
          </div>
        </main>
      </>
    );
  }

  // Error state
  if (scan.status === "failed") {
    const errorMessages: Record<string, string> = {
      dns_failure:
        "We couldn't reach this website. Please check the URL and try again.",
      timeout:
        "The scan timed out. The website may be too slow to respond.",
      bot_protection_detected:
        "This site has bot protection that prevented our scanner from accessing it.",
      login_wall_detected:
        "This site requires login. We can only scan publicly accessible pages.",
    };
    const message = scan.error_message
      ? errorMessages[scan.error_message] || scan.error_message
      : "Something went wrong during the scan.";

    return (
      <>
        {header}
        <main id="main-content" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center p-8 max-w-lg mx-auto" role="alert">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-owl-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 outline-none"
            >
              Scan Failed
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">{message}</p>
            <a
              href="/"
              className="inline-flex items-center justify-center h-12 px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
            >
              Try Another URL
            </a>
          </div>
        </main>
      </>
    );
  }

  // Results page
  const complianceScore = scan.compliance_score ?? 0;
  const aioScore = scan.aio_score ?? 0;
  const issues = scan.sample_issues || [];
  const hiddenCount = Math.max(0, scan.issues_found - issues.length);

  return (
    <>
      {header}
      <main id="main-content">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Results heading */}
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl sm:text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-2 outline-none"
          >
            Scan Results
          </h1>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-10">
            {scan.issues_found} {scan.issues_found === 1 ? "issue" : "issues"} found on your site
          </p>

          {/* Dual Score Gauges */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mb-12">
            <ScoreGauge score={complianceScore} label="Compliance Risk" />
            <ScoreGauge score={aioScore} label="AIO Score" />
          </div>

          {/* Sample Issues */}
          <section aria-label="Issues found">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Issues Found
            </h2>
            <div className="space-y-4 mb-6">
              {issues.map((issue) => (
                <article
                  key={issue.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {issue.type
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                    </h3>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {issue.description}
                  </p>
                  {issue.wcag_criterion && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                      WCAG {issue.wcag_criterion}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Blurred hidden issues overlay */}
          {hiddenCount > 0 && (
            <div className="relative mt-4">
              <div
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 blur-sm opacity-50"
                aria-hidden="true"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Additional Issue
                  </h3>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-400">
                    ---
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  This issue requires email verification to view...
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 rounded-2xl">
                <div className="text-center">
                  <p className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                    {hiddenCount} more {hiddenCount === 1 ? "issue" : "issues"} found
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Get the full report with all issues and fixes.
                  </p>
                  <button
                    onClick={() => setShowEmailModal(true)}
                    className="inline-flex items-center justify-center h-12 px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
                  >
                    Get Full Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CTA if no hidden issues */}
          {hiddenCount === 0 && !reportSent && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowEmailModal(true)}
                className="inline-flex items-center justify-center h-12 px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
              >
                Get Detailed PDF Report
              </button>
            </div>
          )}

          {/* Platform selection after report sent */}
          {reportSent && <PlatformCTA />}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-12 border-t border-slate-200 dark:border-slate-800"
        role="contentinfo"
      >
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

      {/* Email Modal */}
      <EmailModal
        scanId={scanId}
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSuccess={() => {
          setReportSent(true);
          setShowEmailModal(false);
        }}
      />
    </>
  );
}
