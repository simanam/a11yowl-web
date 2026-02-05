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

const SEVERITY_BORDER: Record<string, string> = {
  critical: "border-l-4 border-l-red-500",
  high: "border-l-4 border-l-orange-500",
  medium: "border-l-4 border-l-amber-500",
  low: "border-l-4 border-l-blue-500",
};

const SEVERITY_BAR_COLORS: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-amber-500",
  low: "bg-blue-500",
};

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

function getScoreContext(score: number, type: "compliance" | "aio"): string {
  if (type === "compliance") {
    if (score < 50)
      return "Your site has significant accessibility gaps that could expose you to ADA litigation.";
    if (score < 80)
      return "Your site has moderate accessibility issues. Addressing the critical ones first will reduce your risk.";
    return "Your site meets most accessibility standards. Focus on the remaining issues to stay ahead.";
  }
  if (score < 50)
    return "AI search engines will struggle to read and cite your content.";
  if (score < 80)
    return "Your site has partial AI readability. Fixing structural issues will improve discoverability.";
  return "Your site is well-structured for AI discovery. Keep it up.";
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
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
        >
          <img src="/assest/A11YOWL_logo.png" alt="" width={32} height={32} className="w-8 h-8" aria-hidden="true" />
          A11y Owl
        </a>
        <div className="flex items-center gap-3">
          {scan?.url && (
            <span className="hidden sm:inline-block text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
              {scan.url}
            </span>
          )}
          <a href="/contact" className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Contact
          </a>
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

  // Lawsuit cost calculator — uses same formula as backend
  const criticalCount = issues.filter((i) => i.severity === "critical").length;
  const highCount = issues.filter((i) => i.severity === "high").length;
  const totalIssues = scan.issues_found;
  const hasLawsuitRisk = criticalCount > 0 || highCount > 0;
  const lawsuitEstimate = hasLawsuitRisk
    ? {
        settlement: 10000 + 5000 * criticalCount + 2000 * highCount,
        legalFees: 15000,
        remediation: 500 * totalIssues,
        total: 10000 + 5000 * criticalCount + 2000 * highCount + 15000 + 500 * totalIssues,
      }
    : null;

  // Count severities from visible issues for summary bar
  const severityCounts: Record<string, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  issues.forEach((i) => {
    if (severityCounts[i.severity] !== undefined) {
      severityCounts[i.severity]++;
    }
  });

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
            {scan.issues_found} {scan.issues_found === 1 ? "issue" : "issues"} found on{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">{scan.url}</span>
          </p>

          {/* Score Gauges */}
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mb-6">
            <ScoreGauge score={complianceScore} label="Compliance Risk" showVerdict />
            {scan.include_aio && (
              <ScoreGauge score={aioScore} label="AIO Score" showVerdict />
            )}
          </div>

          {/* Score Context */}
          <div className={`grid grid-cols-1 ${scan.include_aio ? "sm:grid-cols-2" : ""} gap-4 max-w-2xl mx-auto mb-6`}>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">
              {getScoreContext(complianceScore, "compliance")}
            </p>
            {scan.include_aio && (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                {getScoreContext(aioScore, "aio")}
              </p>
            )}
          </div>

          {/* AIO Upsell Card — shown when AIO was not included */}
          {!scan.include_aio && (
            <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-owl-accent/10 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c93a30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Want to know if AI can find your site?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Our AIO Score checks whether AI search engines like ChatGPT and Perplexity can read, understand, and cite your content. Get your score in the full report.
                  </p>
                  <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
                    Available in the Full Report — $7.99
                  </p>
                </div>
              </div>
            </div>
          )}

          {scan.include_aio && <div className="mb-6" />}

          {/* Lawsuit Risk Calculator */}
          {lawsuitEstimate && (
            <div className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
              <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-1">
                Estimated Lawsuit Exposure
              </h3>
              <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-4">
                Based on 2024 ADA lawsuit settlement data
              </p>
              <div className="text-center mb-4">
                <span className="text-4xl sm:text-5xl font-extrabold text-red-600 dark:text-red-400">
                  ${lawsuitEstimate.total.toLocaleString()}
                </span>
                <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-1">
                  estimated total exposure
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-red-200 dark:border-red-800">
                  <span className="text-red-700 dark:text-red-400">
                    Settlement risk ({criticalCount} critical + {highCount} high)
                  </span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ${lawsuitEstimate.settlement.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-red-200 dark:border-red-800">
                  <span className="text-red-700 dark:text-red-400">Legal fees (flat estimate)</span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ${lawsuitEstimate.legalFees.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-red-700 dark:text-red-400">
                    Remediation ({totalIssues} issues)
                  </span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ${lawsuitEstimate.remediation.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-red-500/60 dark:text-red-500/50">
                Actual amounts vary by jurisdiction and case specifics. This estimate is for informational purposes only.
              </p>
            </div>
          )}

          {/* Sample Issues */}
          <section aria-label="Issues found">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Issues Found
            </h2>
            <div className="space-y-4 mb-6">
              {issues.map((issue, index) => (
                <article
                  key={issue.id}
                  className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors ${SEVERITY_BORDER[issue.severity] || ""}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center" aria-label={`Issue ${index + 1}`}>
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {issue.type
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                      </h3>
                    </div>
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed ml-10">
                    {issue.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 ml-10">
                    {issue.wcag_criterion && (
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        WCAG {issue.wcag_criterion}
                      </span>
                    )}
                    {issue.element_selector && (
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono">
                        {issue.element_selector}
                      </code>
                    )}
                  </div>
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
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs mx-auto">
                    Get the full report with annotated screenshots and code fixes for every issue.
                  </p>
                  <button
                    onClick={() => {
                      console.log("[ScanPage] Get Full Report clicked, opening modal");
                      setShowEmailModal(true);
                    }}
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
                onClick={() => {
                  console.log("[ScanPage] Get Detailed PDF Report clicked, opening modal");
                  setShowEmailModal(true);
                }}
                className="inline-flex items-center justify-center h-12 px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
              >
                Get Detailed PDF Report
              </button>
            </div>
          )}

          {/* Summary + Platform selection after report sent */}
          {reportSent && (
            <>
              {/* Severity Summary Bar */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 mt-10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Your report is on the way
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Check your inbox for the full PDF with annotated screenshots, WCAG references, and code fixes for all {scan.issues_found} issues.
                </p>
                {scan.issues_found > 0 && (
                  <div>
                    <div className="flex rounded-full overflow-hidden h-3 bg-slate-100 dark:bg-slate-800" role="img" aria-label={`Severity breakdown: ${severityCounts.critical} critical, ${severityCounts.high} high, ${severityCounts.medium} medium, ${severityCounts.low} low`}>
                      {(["critical", "high", "medium", "low"] as const).map((sev) => {
                        const count = severityCounts[sev];
                        if (!count) return null;
                        const pct = (count / issues.length) * 100;
                        return (
                          <div
                            key={sev}
                            className={`${SEVERITY_BAR_COLORS[sev]}`}
                            style={{ width: `${pct}%` }}
                          />
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {(["critical", "high", "medium", "low"] as const).map((sev) => {
                        const count = severityCounts[sev];
                        if (!count) return null;
                        return (
                          <div key={sev} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <span className={`w-2.5 h-2.5 rounded-full ${SEVERITY_BAR_COLORS[sev]}`} />
                            {count} {sev}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <PlatformCTA />
            </>
          )}
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

      {/* Email Modal */}
      {console.log("[ScanPage] Rendering EmailModal, isOpen:", showEmailModal)}
      <EmailModal
        scanId={scanId}
        isOpen={showEmailModal}
        onClose={() => {
          console.log("[ScanPage] Modal onClose called");
          setShowEmailModal(false);
        }}
        onSuccess={() => {
          console.log("[ScanPage] Modal onSuccess called");
          setReportSent(true);
          setShowEmailModal(false);
        }}
      />
    </>
  );
}
