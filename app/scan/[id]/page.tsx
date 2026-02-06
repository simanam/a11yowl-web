"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { getScanStatus, ScanStatusResponse } from "../../lib/api";
import ScoreGauge from "../../components/ScoreGauge";
import EmailModal from "../../components/EmailModal";
import PlatformCTA from "../../components/PlatformCTA";
import ThemeToggle from "../../components/ThemeToggle";

const PROGRESS_STAGES = [
  { key: "queued", label: "Preparing scan environment", estimate: "~5s" },
  { key: "crawling", label: "Capturing screenshots & testing navigation", estimate: "~20s" },
  { key: "analyzing", label: "AI agents analyzing your site", estimate: "~30s" },
];

const TIMEOUT_MS = 120_000; // 2 minutes

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
  const [timedOut, setTimedOut] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const [statusAnnouncement, setStatusAnnouncement] = useState("");

  // Memoize platform handler to avoid re-renders
  const handlePlatformSelect = useCallback((platformId: string | null) => {
    setSelectedPlatform(platformId);
  }, []);

  // Exponential backoff: 2s for first 10s, 4s for 10-30s, 6s for 30-60s, 10s for 60s+
  function getPollInterval(elapsedMs: number): number {
    if (elapsedMs < 10_000) return 2000;
    if (elapsedMs < 30_000) return 4000;
    if (elapsedMs < 60_000) return 6000;
    return 10_000;
  }

  useEffect(() => {
    if (!scanId) return;

    let pollTimeoutId: NodeJS.Timeout;
    let timerIntervalId: NodeJS.Timeout;
    let globalTimeoutId: NodeJS.Timeout;
    let cancelled = false;
    startTimeRef.current = Date.now();

    // Elapsed time tracker (always 1s for smooth UX)
    timerIntervalId = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    // Timeout after 2 minutes
    globalTimeoutId = setTimeout(() => {
      setTimedOut(true);
      cancelled = true;
      clearInterval(timerIntervalId);
    }, TIMEOUT_MS);

    const poll = async () => {
      if (cancelled) return;

      try {
        const data = await getScanStatus(scanId);
        if (cancelled) return;
        setScan(data);

        // Announce status change to screen readers
        if (data.status === "crawling") {
          setStatusAnnouncement("Crawling your website and capturing screenshots.");
        } else if (data.status === "analyzing") {
          setStatusAnnouncement("AI agents are now analyzing your site for accessibility issues.");
        }

        if (data.status === "completed" || data.status === "failed") {
          cancelled = true;
          clearInterval(timerIntervalId);
          clearTimeout(globalTimeoutId);

          if (data.status === "completed") {
            setStatusAnnouncement(
              `Scan complete. ${data.issues_found} ${data.issues_found === 1 ? "issue" : "issues"} found.`
            );
          } else {
            setStatusAnnouncement("Scan failed. Please try again.");
          }
          return;
        }

        // Schedule next poll with backoff
        const elapsed = Date.now() - startTimeRef.current;
        pollTimeoutId = setTimeout(poll, getPollInterval(elapsed));
      } catch {
        if (cancelled) return;
        setError("Failed to load scan status. Please try again.");
        cancelled = true;
        clearInterval(timerIntervalId);
        clearTimeout(globalTimeoutId);
      }
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(pollTimeoutId);
      clearInterval(timerIntervalId);
      clearTimeout(globalTimeoutId);
    };
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

  // Live region for screen reader announcements
  const liveRegion = (
    <div className="sr-only" aria-live="polite" aria-atomic="true" role="status">
      {statusAnnouncement}
    </div>
  );

  // Timeout state
  if (timedOut && scan?.status !== "completed" && scan?.status !== "failed") {
    return (
      <>
        {header}
        {liveRegion}
        <main id="main-content" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center p-6 sm:p-8 max-w-lg mx-auto" role="alert">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-owl-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              Taking Longer Than Expected
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Your scan is still processing. This can happen with larger sites or sites with complex JavaScript rendering.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              You can bookmark this page and check back, or try scanning again with a specific page URL instead of the full site.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setTimedOut(false);
                  setElapsedSeconds(0);
                  startTimeRef.current = Date.now();
                  window.location.reload();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Keep Waiting
              </button>
              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
              >
                Scan Another URL
              </a>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Network error state
  if (error) {
    return (
      <>
        {header}
        {liveRegion}
        <main id="main-content" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center p-6 sm:p-8 max-w-lg mx-auto" role="alert">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-owl-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
              Connection Error
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{error}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Retry
              </button>
              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
              >
                Scan Another URL
              </a>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Loading / in-progress state
  if (!scan || (scan.status !== "completed" && scan.status !== "failed")) {
    const currentStage = scan?.status || "queued";
    const stageOrder = ["queued", "crawling", "analyzing"];
    const currentIndex = stageOrder.indexOf(currentStage);
    const progressPercent = Math.min(
      ((currentIndex + 1) / (stageOrder.length + 1)) * 100 +
        (elapsedSeconds % 20) * 1.5,
      95
    );

    return (
      <>
        {header}
        {liveRegion}
        <main id="main-content" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center p-6 sm:p-8 max-w-md mx-auto w-full">
            {/* Progress ring */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <svg className="w-20 h-20" viewBox="0 0 80 80" role="progressbar" aria-valuenow={Math.round(progressPercent)} aria-valuemin={0} aria-valuemax={100} aria-label={`Scan progress: ${Math.round(progressPercent)}%`}>
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  strokeWidth="6"
                  className="stroke-slate-200 dark:stroke-slate-700"
                />
                <circle
                  cx="40" cy="40" r="34"
                  fill="none"
                  strokeWidth="6"
                  className="stroke-owl-accent"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progressPercent / 100)}`}
                  transform="rotate(-90 40 40)"
                  style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white">
                {Math.round(progressPercent)}%
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Scanning your site
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-6">
              {elapsedSeconds}s elapsed — usually under 60s
            </p>

            <ol className="space-y-2 sm:space-y-3 text-left" aria-label="Scan progress">
              {PROGRESS_STAGES.map((stage) => {
                const stageIndex = stageOrder.indexOf(stage.key);
                const isActive = stage.key === currentStage;
                const isDone = stageIndex < currentIndex;

                return (
                  <li
                    key={stage.key}
                    className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-sm transition-all ${
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
                    <span className="flex-1">{stage.label}</span>
                    {isActive && (
                      <span className="text-xs text-slate-400 dark:text-slate-500">{stage.estimate}</span>
                    )}
                  </li>
                );
              })}
            </ol>
            {scan?.url && (
              <p className="mt-6 sm:mt-8 text-sm text-slate-400 dark:text-slate-500 truncate px-2">
                {scan.url}
              </p>
            )}
          </div>
        </main>
      </>
    );
  }

  // Error state (scan failed)
  if (scan.status === "failed") {
    const errorMessages: Record<string, string> = {
      dns_failure:
        "We couldn't reach this website. Please check the URL and try again.",
      timeout:
        "The scan timed out. The website may be too slow to respond or have complex JavaScript rendering.",
      bot_protection_detected:
        "This site has bot protection that prevented our scanner from accessing it.",
      login_wall_detected:
        "This site requires login. We can only scan publicly accessible pages.",
    };
    const message = scan.error_message
      ? errorMessages[scan.error_message] || scan.error_message
      : "Something went wrong during the scan.";

    const tips = [
      "Check that the URL is correct and the site is publicly accessible.",
      "Try scanning a specific page URL instead of the homepage.",
      "The site may be blocking automated requests — contact us if you need help.",
    ];

    return (
      <>
        {header}
        {liveRegion}
        <main id="main-content" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-center p-6 sm:p-8 max-w-lg mx-auto" role="alert">
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
              className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3 outline-none"
            >
              Scan Failed
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{message}</p>

            {/* Troubleshooting tips */}
            <div className="text-left mb-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                Troubleshooting tips
              </p>
              <ul className="space-y-2">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <svg className="w-4 h-4 mt-0.5 text-slate-400 dark:text-slate-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
              >
                Scan Another URL
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-6 sm:px-8 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Contact Support
              </a>
            </div>
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
  const zeroIssues = scan.issues_found === 0;

  // Lawsuit cost calculator — only counts compliance issues (visual + navigation), NOT AIO
  const complianceIssues = issues.filter((i) => i.category !== "aio");
  const totalIssues = scan.issues_found;
  const sampleCritical = complianceIssues.filter((i) => i.severity === "critical").length;
  const sampleHigh = complianceIssues.filter((i) => i.severity === "high").length;
  const complianceSampleSize = complianceIssues.length;

  // Extrapolate severity counts from compliance sample to total compliance issues
  const totalComplianceIssues = totalIssues - issues.filter((i) => i.category === "aio").length;
  const scaleFactor = complianceSampleSize > 0 && totalComplianceIssues > 0
    ? totalComplianceIssues / complianceSampleSize
    : 1;
  const estCriticalCount = Math.round(sampleCritical * scaleFactor);
  const estHighCount = Math.round(sampleHigh * scaleFactor);

  const hasLawsuitRisk = estCriticalCount > 0 || estHighCount > 0;
  const lawsuitEstimate = hasLawsuitRisk
    ? {
        settlement: 10000 + 5000 * estCriticalCount + 2000 * estHighCount,
        legalFees: 15000,
        remediation: 500 * totalComplianceIssues,
        total: 10000 + 5000 * estCriticalCount + 2000 * estHighCount + 15000 + 500 * totalComplianceIssues,
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
      {liveRegion}
      <main id="main-content">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {/* Results heading */}
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-2 outline-none"
          >
            {zeroIssues ? "No Issues Detected" : "Scan Results"}
          </h1>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm sm:text-base mb-8 sm:mb-10">
            {zeroIssues ? (
              <>No accessibility issues found on{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">{scan.url}</span>
              </>
            ) : (
              <>{scan.issues_found} {scan.issues_found === 1 ? "issue" : "issues"} found on{" "}
                <span className="font-medium text-slate-700 dark:text-slate-300">{scan.url}</span>
              </>
            )}
          </p>

          {/* Zero Issues Celebration */}
          {zeroIssues && (
            <div className="max-w-2xl mx-auto mb-10 sm:mb-12 text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-owl-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-owl-success mb-2">
                Great news! Your site looks accessible.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto mb-6">
                Our scan didn&apos;t detect any WCAG 2.2 AA issues on this page. However, a full report can reveal additional opportunities for improvement, including AI search optimization.
              </p>
              <button
                onClick={() => setShowEmailModal(true)}
                className="inline-flex items-center justify-center h-12 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
              >
                Get Your Free Report
              </button>
            </div>
          )}

          {/* Score Gauges */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-16 mb-6">
            <ScoreGauge score={complianceScore} label="Compliance Risk" showVerdict size={140} />
            {scan.aio_score !== null && (
              <ScoreGauge score={aioScore} label="AIO Score" showVerdict size={140} />
            )}
          </div>

          {/* Score Context */}
          <div className={`grid grid-cols-1 ${scan.aio_score !== null ? "sm:grid-cols-2" : ""} gap-4 max-w-2xl mx-auto mb-6`}>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">
              {getScoreContext(complianceScore, "compliance")}
            </p>
            {scan.aio_score !== null && (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                {getScoreContext(aioScore, "aio")}
              </p>
            )}
          </div>

          {/* Lawsuit Risk Calculator — only for compliance issues, placed right after compliance context */}
          {lawsuitEstimate && (
            <div className="max-w-2xl mx-auto mb-10 sm:mb-12 p-5 sm:p-6 rounded-2xl border-2 border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base sm:text-lg font-bold text-red-700 dark:text-red-400">
                  Estimated ADA Lawsuit Exposure
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-red-600/70 dark:text-red-400/70 mb-4">
                Based on {totalComplianceIssues} accessibility {totalComplianceIssues === 1 ? "issue" : "issues"} (WCAG violations) and 2024 ADA lawsuit settlement data
              </p>
              <div className="text-center mb-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-600 dark:text-red-400">
                  ${lawsuitEstimate.total.toLocaleString()}
                </span>
                <p className="text-xs sm:text-sm text-red-600/70 dark:text-red-400/70 mt-1">
                  estimated total exposure
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-red-200 dark:border-red-800">
                  <span className="text-red-700 dark:text-red-400 text-xs sm:text-sm">
                    Settlement risk (~{estCriticalCount} critical + ~{estHighCount} high)
                  </span>
                  <span className="font-bold text-red-600 dark:text-red-400 text-xs sm:text-sm">
                    ${lawsuitEstimate.settlement.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-red-200 dark:border-red-800">
                  <span className="text-red-700 dark:text-red-400 text-xs sm:text-sm">Legal fees (flat estimate)</span>
                  <span className="font-bold text-red-600 dark:text-red-400 text-xs sm:text-sm">
                    ${lawsuitEstimate.legalFees.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-red-700 dark:text-red-400 text-xs sm:text-sm">
                    Remediation ({totalComplianceIssues} {totalComplianceIssues === 1 ? "issue" : "issues"})
                  </span>
                  <span className="font-bold text-red-600 dark:text-red-400 text-xs sm:text-sm">
                    ${lawsuitEstimate.remediation.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-red-500/60 dark:text-red-500/50">
                Actual amounts vary by jurisdiction and case specifics. This estimate is for informational purposes only.
              </p>
            </div>
          )}

          {/* AIO Business Impact — only shown for low AIO scores, separate from lawsuit risk */}
          {scan.aio_score !== null && aioScore < 60 && (
            <div className="max-w-2xl mx-auto mb-10 sm:mb-12 p-5 sm:p-6 rounded-2xl border-2 border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3 className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-400">
                  You May Be Losing Business Visibility
                </h3>
              </div>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80 mb-3 leading-relaxed">
                With an AIO Score of {aioScore}, AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews are likely struggling to read, understand, and recommend your content.
              </p>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                This means potential customers asking AI for recommendations in your industry may never see your business — even if you rank well in traditional search.
              </p>
              <div className="mt-4 pt-4 border-t border-amber-200 dark:border-amber-800">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600/70 dark:text-amber-400/70 mb-2">
                  What you can improve
                </p>
                <ul className="space-y-1.5 text-sm text-amber-700/80 dark:text-amber-400/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" aria-hidden="true" />
                    Add structured data (Schema.org) so AI can extract key business info
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" aria-hidden="true" />
                    Fix heading hierarchy so AI understands your content structure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" aria-hidden="true" />
                    Use semantic HTML landmarks for better content parsing
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Sample Issues */}
          {!zeroIssues && (
            <section aria-label="Issues found">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
                Issues Found
              </h2>
              <div className="space-y-3 sm:space-y-4 mb-6">
                {issues.map((issue, index) => (
                  <article
                    key={issue.id}
                    className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors ${SEVERITY_BORDER[issue.severity] || ""}`}
                  >
                    <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center" aria-label={`Issue ${index + 1}`}>
                          {index + 1}
                        </span>
                        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                          {issue.type
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                        </h3>
                      </div>
                      <SeverityBadge severity={issue.severity} />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed ml-8 sm:ml-10">
                      {issue.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 ml-8 sm:ml-10">
                      {issue.wcag_criterion && (
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          WCAG {issue.wcag_criterion}
                        </span>
                      )}
                      {issue.element_selector && (
                        <code className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono break-all">
                          {issue.element_selector}
                        </code>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

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
                <div className="text-center px-4">
                  <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-1">
                    {hiddenCount} more {hiddenCount === 1 ? "issue" : "issues"} found
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs mx-auto">
                    Get the full report with AI code fixes, DIY action items, and your AIO Score.
                  </p>
                  <button
                    onClick={() => setShowEmailModal(true)}
                    className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
                  >
                    Get Your Free Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CTA if no hidden issues and issues exist */}
          {hiddenCount === 0 && !zeroIssues && !reportSent && (
            <div className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => setShowEmailModal(true)}
                className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
              >
                Get Your Free Report
              </button>
            </div>
          )}

          {/* Summary + Platform selection after report sent */}
          {reportSent && (
            <>
              {/* Severity Summary Bar */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 mt-8 sm:mt-10">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
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
                    <div className="flex flex-wrap gap-3 sm:gap-4 mt-3">
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

              <PlatformCTA onSelect={handlePlatformSelect} />
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800"
        role="contentinfo"
      >
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

      {/* Email Modal */}
      <EmailModal
        scanId={scanId}
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        onSuccess={() => {
          setReportSent(true);
          setShowEmailModal(false);
        }}
        platform={selectedPlatform}
      />
    </>
  );
}
