"use client";

import { useState, useEffect, useRef } from "react";
import { requestReport } from "../lib/api";

interface EmailModalProps {
  scanId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EmailModal({
  scanId,
  isOpen,
  onClose,
  onSuccess,
}: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"free" | "paid" | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && !sent && selectedTier) {
      inputRef.current?.focus();
    } else if (isOpen && sent) {
      closeRef.current?.focus();
    }
  }, [isOpen, sent, selectedTier]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedTier(null);
      setError("");
      setSent(false);
      setEmail("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    setError("");
    setLoading(true);

    try {
      if (selectedTier === "paid") {
        // For now, show contact message — Stripe wired later
        setSent(true);
        onSuccess();
        return;
      }
      console.log("[EmailModal] Requesting report for scan:", scanId, "email:", email);
      const response = await requestReport(scanId, email, "free");
      console.log("[EmailModal] Report response:", response);
      setSent(true);
      onSuccess();
    } catch (err) {
      console.error("[EmailModal] Report request failed:", err);
      setError(err instanceof Error ? err.message : "Failed to send report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-owl-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedTier === "paid" ? "We'll be in touch!" : "Report Sent!"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {selectedTier === "paid"
                ? "Contact us at a11y@logixtecs.com to get your full report with AI code fixes and AIO analysis. Payment integration coming soon."
                : "Check your inbox for your accessibility issues report."}
            </p>
            <button
              ref={closeRef}
              onClick={onClose}
              className="mt-6 h-11 px-6 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <h2 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Get Your Report
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Choose your report type and enter your email.
            </p>

            {/* Tier selection */}
            <div className="space-y-3 mb-6">
              {/* Free tier */}
              <button
                type="button"
                onClick={() => setSelectedTier("free")}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedTier === "free"
                    ? "border-owl-accent bg-owl-accent/5 dark:bg-owl-accent/10"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900 dark:text-white">Free Report</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">$0</span>
                </div>
                <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    All issues listed with severity ratings
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    Compliance Risk Score
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    Annotated screenshots
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm3.78-9.78a.75.75 0 00-1.06-1.06L6 8.94 5.28 8.22a.75.75 0 00-1.06 1.06l1.25 1.25a.75.75 0 001.06 0l5.25-5.25z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-400 dark:text-slate-500">No code fixes or AIO analysis</span>
                  </li>
                </ul>
              </button>

              {/* Paid tier */}
              <button
                type="button"
                onClick={() => setSelectedTier("paid")}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all relative ${
                  selectedTier === "paid"
                    ? "border-owl-accent bg-owl-accent/5 dark:bg-owl-accent/10"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 text-[10px] font-bold bg-owl-accent text-white rounded-full uppercase tracking-wide">
                  Recommended
                </span>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900 dark:text-white">Full Report</span>
                  <span className="text-lg font-bold text-owl-accent">$7.99</span>
                </div>
                <ul className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    Everything in Free Report
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    AI-powered code fixes for every issue
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    AIO Score + AI discoverability analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-owl-success flex-shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    Lawsuit risk calculator
                  </li>
                </ul>
              </button>
            </div>

            {/* Email + submit */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="report-email" className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
                Email address
              </label>
              <input
                ref={inputRef}
                id="report-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
                aria-describedby={error ? "modal-error" : undefined}
                className="w-full h-12 px-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-owl-accent focus:border-owl-accent"
              />
              {error && (
                <p id="modal-error" className="mt-2 text-owl-danger text-sm" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !selectedTier}
                className="w-full mt-4 h-12 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    Sending...
                  </span>
                ) : selectedTier === "paid" ? (
                  "Get Full Report — $7.99"
                ) : selectedTier === "free" ? (
                  "Get Free Report"
                ) : (
                  "Select a report type"
                )}
              </button>
            </form>
            {selectedTier === "paid" && (
              <p className="mt-3 text-xs text-center text-slate-400 dark:text-slate-500">
                Payment via Stripe coming soon. For now, contact <a href="mailto:a11y@logixtecs.com" className="text-owl-accent hover:underline">a11y@logixtecs.com</a>
              </p>
            )}
            <button
              onClick={onClose}
              className="w-full mt-3 h-10 text-slate-500 dark:text-slate-400 text-sm hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
