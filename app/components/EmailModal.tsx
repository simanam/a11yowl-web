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
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus management: focus input on open, trap focus inside modal
  useEffect(() => {
    if (isOpen && !sent) {
      inputRef.current?.focus();
    } else if (isOpen && sent) {
      closeRef.current?.focus();
    }
  }, [isOpen, sent]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await requestReport(scanId, email);
      setSent(true);
      onSuccess();
    } catch (err) {
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
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
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
              Report Sent!
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Check your inbox for the full scan report with all issues and fix
              recommendations.
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
            <h2 id="modal-title" className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Get Full Report
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Enter your email to receive the detailed report with all issues
              and fix recommendations.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="report-email" className="sr-only">
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
                disabled={loading}
                className="w-full mt-4 h-12 bg-owl-accent hover:bg-owl-accent-hover text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    Sending...
                  </span>
                ) : (
                  "Send My Report"
                )}
              </button>
            </form>
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
