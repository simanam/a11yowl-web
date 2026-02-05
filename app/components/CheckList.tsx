"use client";

interface CheckListProps {
  items: string[];
}

export default function CheckList({ items }: CheckListProps) {
  return (
    <ul className="mt-4 space-y-2" role="list">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
        >
          <svg
            className="w-4 h-4 mt-0.5 text-owl-success flex-shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
