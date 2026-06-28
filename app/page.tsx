import Link from "next/link";
import { IDEAS, IDEA_ORDER } from "@/lib/ideas";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-radial-fade" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-amber-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5">
        {/* nav */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-black text-black">
              J
            </span>
            <span className="font-bold tracking-tight text-white">JAKO Ventures</span>
          </div>
          <span className="text-xs font-medium text-white/40">
            Internal concept review
          </span>
        </nav>

        {/* hero */}
        <section className="py-16 text-center sm:py-24">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            3 directions · 1 mission: get people together IRL
          </div>
          <h1 className="animate-fade-up mx-auto mt-6 max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl">
            We&apos;re building the future of{" "}
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
              meeting people in real life
            </span>
            .
          </h1>
          <div className="animate-fade-up mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#compare"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Compare all three
            </a>
          </div>
        </section>

        {/* idea cards */}
        <section className="grid gap-5 pb-16 md:grid-cols-3">
          {IDEA_ORDER.map((id, i) => {
            const idea = IDEAS[id];
            return (
              <Link
                key={id}
                href={idea.href}
                style={{ animationDelay: `${i * 0.08}s` }}
                className={`group animate-fade-up relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-white/25 ${idea.theme.glow}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${idea.theme.gradientFrom} ${idea.theme.gradientTo}`}
                />
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${idea.theme.chipBg} ${idea.theme.chipText}`}
                  >
                    Concept #{idea.number}
                  </span>
                  <span className="text-white/30 transition group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-white">{idea.name}</h2>
                <p className="mt-2 flex-1 text-sm text-white/60">{idea.tagline}</p>
                <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                  <Row label="Model" value={idea.model} />
                  <Row label="Like" value={idea.analogy} />
                </div>
                <span
                  className={`mt-5 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${idea.theme.button}`}
                >
                  Try the demo
                </span>
              </Link>
            );
          })}
        </section>

        {/* comparison */}
        <section id="compare" className="scroll-mt-6 pb-16">
          <h2 className="text-center text-3xl font-bold text-white">
            How the three concepts differ
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-white/55">
            Same AI-personalized entry point, three very different businesses.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-white/50">
                <tr>
                  <th className="p-4 font-medium">Dimension</th>
                  <th className="p-4 font-medium text-amber-200">#1 Tablemates</th>
                  <th className="p-4 font-medium text-indigo-200">#2 Marquee</th>
                  <th className="p-4 font-medium text-violet-200">#3 Chapters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {COMPARISON.map((row) => (
                  <tr key={row.dim} className="align-top">
                    <td className="p-4 font-medium text-white/50">{row.dim}</td>
                    <td className="p-4">{row.irl}</td>
                    <td className="p-4">{row.agg}</td>
                    <td className="p-4">{row.clubs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* team note */}
        <section className="pb-20">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">📋 For the team</h3>
            <p className="mt-2 text-sm text-white/60">
              Each demo runs a real Claude-powered questionnaire, then generates
              recommendations live from your answers. The goal isn&apos;t polish —
              it&apos;s to <em>feel</em> the difference between the three directions
              so we can pick one to pursue. Click through all three, then drop your
              vote in our thread.
            </p>
            <p className="mt-3 text-xs text-white/40">
              Note: the AI chat works out of the box in demo mode. To make the
              conversation fully dynamic, add an <code>ANTHROPIC_API_KEY</code> env
              var in Vercel (see <code>.env.example</code>).
            </p>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-center text-xs text-white/30">
          JAKO Ventures — internal concept demo · built for the founding team
        </footer>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="w-12 shrink-0 text-white/40">{label}</span>
      <span className="text-white/70">{value}</span>
    </div>
  );
}

const COMPARISON: { dim: string; irl: string; agg: string; clubs: string }[] = [
  {
    dim: "Who owns supply",
    irl: "We create & host the events ourselves",
    agg: "3rd-party organizers; we aggregate & market them",
    clubs: "We host the community layer; members create meetups",
  },
  {
    dim: "Core unit",
    irl: "A single recurring dinner / happy hour",
    agg: "A conference, summit, or talk",
    clubs: "A recurring interest club",
  },
  {
    dim: "Primary value",
    irl: "Make real friends, phones away",
    agg: "Discover events worth your time",
    clubs: "Belong to a group that meets IRL",
  },
  {
    dim: "How money's made",
    irl: "Tickets / membership for our events",
    agg: "Marketplace fees + targeted event promotion",
    clubs: "Membership + premium club tools",
  },
  {
    dim: "Closest analogy",
    irl: "NYU IRL × supper club",
    agg: "Ticketmaster × TED",
    clubs: "Discord/Slack × Facebook Groups",
  },
  {
    dim: "Biggest risk",
    irl: "Ops-heavy; we run every event",
    agg: "Two-sided marketplace cold-start",
    clubs: "Keeping clubs active & meeting offline",
  },
];
