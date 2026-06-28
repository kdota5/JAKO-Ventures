"use client";

import { ScoredRec, IdeaMeta } from "@/lib/types";

const GUESTS = [
  { initials: "MJ", note: "loves the same stuff as you" },
  { initials: "AL", note: "new in town" },
  { initials: "RK", note: "great storyteller" },
  { initials: "TS", note: "always asks good questions" },
];

const PROMPTS = [
  "What's something you changed your mind about this year?",
  "Best thing you've made with your hands?",
  "A place that felt like home unexpectedly?",
];

export default function TablePreview({
  rec,
  idea,
}: {
  rec: ScoredRec;
  idea: IdeaMeta;
}) {
  return (
    <div className="mt-4 space-y-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
          Who you&apos;ll be seated with
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {GUESTS.map((g) => (
            <div key={g.initials} className="flex items-center gap-2">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${idea.theme.gradientFrom} ${idea.theme.gradientTo} text-xs font-bold text-white`}
              >
                {g.initials}
              </span>
              <span className="text-xs text-white/60">{g.note}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
          Tonight&apos;s table prompts
        </p>
        <ul className="mt-2 space-y-1.5">
          {PROMPTS.map((p) => (
            <li
              key={p}
              className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-white/80"
            >
              &ldquo;{p}&rdquo;
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-white/40">
        📵 Phones go in the basket at the door — {rec.size} for {rec.when?.toLowerCase()}.
      </p>
    </div>
  );
}
