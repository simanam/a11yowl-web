"use client";

interface ScoreGaugeProps {
  score: number;
  label: string;
  size?: number;
}

export default function ScoreGauge({
  score,
  label,
  size = 160,
}: ScoreGaugeProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 50) return "#DC2626";
    if (s < 80) return "#D97706";
    return "#059669";
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${label}: ${Math.round(score)} out of 100`}
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Score arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          className="gauge-circle"
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
        {/* Score text */}
        <text
          x="50"
          y="45"
          textAnchor="middle"
          fill={color}
          fontSize="22"
          fontWeight="bold"
        >
          {Math.round(score)}
        </text>
        <text
          x="50"
          y="60"
          textAnchor="middle"
          fontSize="8"
          className="fill-slate-400 dark:fill-slate-500"
        >
          / 100
        </text>
      </svg>
      <div className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
        {label}
      </div>
    </div>
  );
}
