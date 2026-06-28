"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IdeaMeta, InterestProfile, ScoredRec } from "@/lib/types";
import { recommend } from "@/lib/matching";
import TablePreview from "./idea/TablePreview";
import ClubPlanner from "./idea/ClubPlanner";

interface Props {
  idea: IdeaMeta;
  profile: InterestProfile;
  onRestart: () => void;
}

export default function Recommendations({ idea, profile, onRestart }: Props) {
  const [mode, setMode] = useState<"work" | "personal">("personal");
  const recs = useMemo(() => recommend(idea.id, profile, 4), [idea.id, profile]);

  return (
    <div className="animate-fade-up">
      {/* profile summary */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              What Claude heard
            </p>
            <p className="mt-1 max-w-xl text-white/90">{profile.summary}</p>
          </div>
          <button
            onClick={onRestart}
            className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/5"
          >
            ↻ Redo questionnaire
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.tags.map((t) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-1 text-xs ${idea.theme.chipBg} ${idea.theme.chipText}`}
            >
              {t}
            </span>
          ))}
          {profile.vibe && (
            <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/60">
              vibe: {profile.vibe}
            </span>
          )}
        </div>
      </div>

      {/* header + idea-2 mode toggle */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-white">
            {idea.recommendationsTitle}
          </h3>
          <p className="mt-1 text-sm text-white/55">
            {idea.recommendationsSubtitle}
          </p>
        </div>
        {idea.id === "aggregator" && (
          <div className="flex rounded-full border border-white/15 p-1 text-xs">
            {(["personal", "work"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-3 py-1.5 capitalize transition ${
                  mode === m
                    ? `${idea.theme.button}`
                    : "text-white/60 hover:text-white"
                }`}
              >
                {m === "work" ? "Work connections" : "Personal interest"}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {recs.map((rec, i) => (
          <RecCard key={rec.id} rec={rec} idea={idea} index={i} mode={mode} />
        ))}
      </div>
    </div>
  );
}

function RecCard({
  rec,
  idea,
  index,
  mode,
}: {
  rec: ScoredRec;
  idea: IdeaMeta;
  index: number;
  mode: "work" | "personal";
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const matchPct = Math.min(98, 62 + rec.score * 9);

  const cta =
    idea.id === "irl"
      ? open
        ? "Seat reserved ✓"
        : "Reserve my seat"
      : idea.id === "clubs"
        ? open
          ? "Joined ✓"
          : "Join club"
        : "Get tickets";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 ${
        open ? idea.theme.glow : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl">
            {rec.emoji}
          </span>
          <div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${idea.theme.chipBg} ${idea.theme.chipText}`}
            >
              {rec.kind}
            </span>
            <h4 className="mt-1 font-semibold leading-tight text-white">
              {rec.title}
            </h4>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={`bg-gradient-to-r ${idea.theme.gradientFrom} ${idea.theme.gradientTo} bg-clip-text text-lg font-bold text-transparent`}
          >
            {matchPct}%
          </p>
          <p className="text-[10px] uppercase tracking-wide text-white/40">match</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-white/70">{rec.blurb}</p>

      {/* meta facts */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {rec.when && <Fact label="When" value={rec.when} />}
        {rec.location && <Fact label="Where" value={rec.location} />}
        {rec.meta.map((m) => (
          <Fact key={m.label} label={m.label} value={m.value} />
        ))}
        {rec.price && idea.id === "aggregator" && (
          <Fact label="Price" value={rec.price} />
        )}
      </div>

      <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-white/55">
        <span className={idea.theme.chipText}>Why this:</span> {rec.reason}
        {idea.id === "aggregator" && (
          <span className="text-white/40">
            {" "}
            · matched to your {mode === "work" ? "work" : "personal"} profile
          </span>
        )}
      </div>

      {/* actions */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${idea.theme.button}`}
        >
          {cta}
        </button>
        {idea.id === "aggregator" ? (
          <button
            onClick={() => setSaved((v) => !v)}
            className="rounded-full border border-white/15 px-3 py-2 text-sm text-white/70 transition hover:bg-white/5"
          >
            {saved ? "★ Following" : "☆ Follow"}
          </button>
        ) : null}
      </div>

      {/* idea-specific expansion */}
      {open && idea.id === "irl" && <TablePreview rec={rec} idea={idea} />}
      {open && idea.id === "clubs" && <ClubPlanner rec={rec} idea={idea} />}
      {open && idea.id === "aggregator" && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
          <p className="font-semibold text-white">🎟️ Order summary</p>
          <p className="mt-1 text-white/60">
            {rec.title} · {rec.when} · {rec.location}
          </p>
          <p className="mt-2 text-white/60">
            We&apos;ll email your pass and add it to your calendar. Marquee notifies
            you when similar {mode === "work" ? "industry" : "interest"} events open
            nearby.
          </p>
        </div>
      )}
    </motion.div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.03] px-2.5 py-1.5">
      <p className="text-[10px] uppercase tracking-wide text-white/40">{label}</p>
      <p className="text-white/80">{value}</p>
    </div>
  );
}
