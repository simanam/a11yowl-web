"use client";

import { useState, useEffect } from "react";

const platforms = [
  {
    id: "wordpress",
    name: "WordPress",
    icon: "W",
    desc: "Install our plugin for automated fixes",
  },
  {
    id: "shopify",
    name: "Shopify",
    icon: "S",
    desc: "Add our app for store accessibility",
  },
  {
    id: "developer",
    name: "Developer",
    icon: "</>",
    desc: "GitHub app, CLI tool, or CI/CD integration",
  },
  {
    id: "other",
    name: "Other",
    icon: "?",
    desc: "Script tag for any website",
  },
];

interface PlatformCTAProps {
  onSelect?: (platformId: string | null) => void;
}

export default function PlatformCTA({ onSelect }: PlatformCTAProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("a11yowl_platform");
    if (stored) {
      setSelected(stored);
      onSelect?.(stored);
    }
  }, [onSelect]);

  const handleSelect = (platformId: string) => {
    const newSelection = selected === platformId ? null : platformId;
    setSelected(newSelection);
    onSelect?.(newSelection);

    // Persist to localStorage
    if (newSelection) {
      localStorage.setItem("a11yowl_platform", newSelection);
    } else {
      localStorage.removeItem("a11yowl_platform");
    }

    // Show saved feedback
    if (newSelection) {
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 mt-8 sm:mt-10">
      <h3 className="text-lg sm:text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
        What platform is your website built on?
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-5 sm:mb-6">
        We&apos;ll notify you when your platform is supported.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {platforms.map((p) => {
          const isSelected = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`relative p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-xl border-2 transition-all text-center min-h-[100px] sm:min-h-[120px] flex flex-col items-center justify-center ${
                isSelected
                  ? "border-owl-accent bg-owl-accent/5 dark:bg-owl-accent/10 ring-1 ring-owl-accent/30"
                  : "border-slate-200 dark:border-slate-700 hover:border-owl-accent dark:hover:border-owl-accent"
              }`}
              aria-label={`Select ${p.name}: ${p.desc}`}
              aria-pressed={isSelected}
            >
              {/* Selected checkmark */}
              {isSelected && (
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-owl-accent flex items-center justify-center" aria-hidden="true">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                </span>
              )}
              <div className={`text-xl sm:text-2xl font-mono font-bold mb-1.5 sm:mb-2 ${
                isSelected ? "text-owl-accent" : "text-owl-accent"
              }`} aria-hidden="true">
                {p.icon}
              </div>
              <div className={`font-semibold text-xs sm:text-sm ${
                isSelected ? "text-slate-900 dark:text-white" : "text-slate-900 dark:text-white"
              }`}>
                {p.name}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 leading-snug">
                {p.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Saved confirmation */}
      <div className="mt-4 text-center min-h-[20px]">
        {showSaved ? (
          <p className="text-sm text-owl-success font-medium flex items-center justify-center gap-1.5" role="status">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
            </svg>
            Saved! We&apos;ll email you when {platforms.find((p) => p.id === selected)?.name} support is ready.
          </p>
        ) : selected ? (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {platforms.find((p) => p.id === selected)?.name} selected — we&apos;ll include this in your report.
          </p>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Coming soon — we&apos;ll email you when your platform is ready.
          </p>
        )}
      </div>
    </div>
  );
}
