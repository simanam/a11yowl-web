"use client";

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

export default function PlatformCTA() {
  const handleSelect = (platformId: string) => {
    // TODO: Track with PostHog in 1.22
    console.log(`Platform selected: ${platformId}`);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 mt-10">
      <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
        What platform is your website built on?
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-6">
        We&apos;ll notify you when your platform is supported.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p.id)}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-owl-accent dark:hover:border-owl-accent transition-colors text-center min-h-[120px] flex flex-col items-center justify-center"
            aria-label={`Select ${p.name}: ${p.desc}`}
          >
            <div className="text-2xl font-mono font-bold text-owl-accent mb-2" aria-hidden="true">
              {p.icon}
            </div>
            <div className="font-semibold text-sm text-slate-900 dark:text-white">
              {p.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {p.desc}
            </div>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
        Coming soon — we&apos;ll email you when your platform is ready.
      </p>
    </div>
  );
}
