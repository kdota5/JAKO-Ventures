"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScoredRec, IdeaMeta } from "@/lib/types";

const INITIAL_CHAT = [
  { who: "Maya", initials: "MA", text: "Down for a meetup this week! 🙌" },
  { who: "Devin", initials: "DE", text: "Same. Should we do a weeknight?" },
];

const OPTIONS = [
  { id: "tue", label: "Tue 7:00 PM", votes: 6 },
  { id: "thu", label: "Thu 6:30 PM", votes: 4 },
  { id: "sat", label: "Sat 11:00 AM", votes: 9 },
];

export default function ClubPlanner({
  rec,
  idea,
}: {
  rec: ScoredRec;
  idea: IdeaMeta;
}) {
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(OPTIONS.map((o) => [o.id, o.votes]))
  );
  const [voted, setVoted] = useState<string | null>(null);

  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const leader = Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];

  const castVote = (id: string) => {
    if (voted) return;
    setVotes((v) => ({ ...v, [id]: v[id] + 1 }));
    setVoted(id);
  };

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <p className="text-sm font-semibold text-white">
          # {rec.title.toLowerCase().replace(/[^a-z]+/g, "-")}
        </p>
        <span className="text-xs text-white/40">{rec.meta[0]?.value} members</span>
      </div>

      {/* mock chat */}
      <div className="space-y-3 px-4 py-4">
        {INITIAL_CHAT.map((m) => (
          <div key={m.who} className="flex gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/80">
              {m.initials}
            </span>
            <div>
              <p className="text-xs text-white/50">{m.who}</p>
              <p className="text-sm text-white/85">{m.text}</p>
            </div>
          </div>
        ))}

        {/* poll card */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/50">
            📊 Poll · Pick our next meetup
          </p>
          <div className="space-y-2">
            {OPTIONS.map((o) => {
              const pct = Math.round((votes[o.id] / total) * 100);
              const isLeader = o.id === leader;
              return (
                <button
                  key={o.id}
                  onClick={() => castVote(o.id)}
                  disabled={!!voted}
                  className="relative w-full overflow-hidden rounded-lg border border-white/10 px-3 py-2 text-left text-sm transition disabled:cursor-default"
                >
                  <motion.div
                    initial={false}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className={`absolute inset-y-0 left-0 ${idea.theme.chipBg} ${
                      isLeader ? "opacity-100" : "opacity-60"
                    }`}
                  />
                  <span className="relative flex items-center justify-between text-white/90">
                    <span>
                      {o.label}
                      {voted === o.id && " ✓"}
                    </span>
                    <span className="text-white/60">{pct}%</span>
                  </span>
                </button>
              );
            })}
          </div>
          {voted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-xs text-emerald-300"
            >
              🎉 You&apos;re in! Locking the room for{" "}
              {OPTIONS.find((o) => o.id === leader)?.label}. A calendar invite + the
              spot will drop here.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
