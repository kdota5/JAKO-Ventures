"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { IdeaMeta, InterestProfile } from "@/lib/types";
import ChatQuestionnaire from "./ChatQuestionnaire";
import Recommendations from "./Recommendations";

const HOW_IT_WORKS: Record<string, { step: string; title: string; body: string }[]> = {
  irl: [
    { step: "01", title: "Quick vibe check", body: "Claude asks a few questions about your interests and energy." },
    { step: "02", title: "We seat you", body: "You're matched to a small recurring dinner or happy hour." },
    { step: "03", title: "Phones away, connect", body: "Show up, drop your phone in the basket, leave with friends." },
  ],
  aggregator: [
    { step: "01", title: "Tell us your world", body: "Claude learns your profession and what you're curious about." },
    { step: "02", title: "We rank the noise", body: "Thousands of events filtered to the few worth your time." },
    { step: "03", title: "Book & follow", body: "Grab tickets and follow speakers — we alert you to what's next." },
  ],
  clubs: [
    { step: "01", title: "Find your interests", body: "Claude maps what you'd actually join a club for." },
    { step: "02", title: "Match to clubs", body: "See interest-based clubs in your city and join in a tap." },
    { step: "03", title: "Plan & meet IRL", body: "Use in-app polls and chat to lock recurring meetups." },
  ],
};

export default function IdeaExperience({ idea }: { idea: IdeaMeta }) {
  const [profile, setProfile] = useState<InterestProfile | null>(null);
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () =>
    demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ambient theme glow */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b ${idea.theme.gradientFrom} ${idea.theme.gradientTo} opacity-[0.12] blur-3xl`}
      />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 py-6">
        {/* nav */}
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <span className="text-lg">←</span> All concepts
          </Link>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
            JAKO Ventures · Concept {idea.number} of 3
          </span>
        </nav>

        {/* hero */}
        <section className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${idea.theme.chipBg} ${idea.theme.chipText}`}
            >
              Concept #{idea.number} · {idea.analogy}
            </span>
            <h1 className="mt-5 text-5xl font-black leading-[1.05] tracking-tight text-white">
              {idea.name}
            </h1>
            <p
              className={`mt-3 bg-gradient-to-r ${idea.theme.gradientFrom} ${idea.theme.gradientTo} bg-clip-text text-xl font-semibold text-transparent`}
            >
              {idea.tagline}
            </p>
            <p className="mt-4 max-w-xl text-white/65">{idea.oneLiner}</p>
            <button
              onClick={scrollToDemo}
              className={`mt-7 rounded-full px-6 py-3 text-sm font-semibold transition ${idea.theme.button}`}
            >
              Try the live demo ↓
            </button>
          </div>

          {/* value props grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {idea.valueProps.map((vp, i) => (
              <motion.div
                key={vp.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="text-2xl">{vp.emoji}</div>
                <h3 className="mt-2 font-semibold text-white">{vp.title}</h3>
                <p className="mt-1 text-sm text-white/60">{vp.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* how it works */}
        <section className="border-y border-white/10 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            {HOW_IT_WORKS[idea.id].map((s) => (
              <div key={s.step} className="flex gap-4">
                <span
                  className={`bg-gradient-to-br ${idea.theme.gradientFrom} ${idea.theme.gradientTo} bg-clip-text text-3xl font-black text-transparent`}
                >
                  {s.step}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* demo */}
        <section ref={demoRef} className="scroll-mt-6 py-12">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Interactive demo
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white">
              {profile
                ? "Here's what we'd recommend"
                : "Start with a quick AI questionnaire"}
            </h2>
            <p className="mt-2 text-white/55">
              {profile
                ? "These are generated live from your answers. Tap a card to see the experience."
                : "Chat with our Claude-powered concierge. It only takes about three questions."}
            </p>
          </div>

          {profile ? (
            <Recommendations
              idea={idea}
              profile={profile}
              onRestart={() => setProfile(null)}
            />
          ) : (
            <div className="mx-auto max-w-2xl">
              <ChatQuestionnaire idea={idea} onComplete={setProfile} />
              <p className="mt-3 text-center text-xs text-white/35">
                Demo flow · no account needed · interests are not stored
              </p>
            </div>
          )}
        </section>

        {/* footer nav to other ideas */}
        <footer className="border-t border-white/10 py-8 text-center">
          <p className="text-sm text-white/50">
            Comparing concepts?{" "}
            <Link href="/" className="text-white underline-offset-4 hover:underline">
              Back to all three →
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
