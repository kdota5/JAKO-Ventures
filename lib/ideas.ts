import { IdeaMeta, IdeaId } from "./types";

export const IDEAS: Record<IdeaId, IdeaMeta> = {
  irl: {
    id: "irl",
    number: 1,
    name: "Tablemates",
    tagline: "Eventbrite for making real friends — phones away, fully present.",
    oneLiner:
      "We host our own recurring, interest-matched dinners and happy hours. Answer a few questions and we seat you with people you'll actually click with.",
    model: "We create & operate the events (owned supply)",
    analogy: "NYU IRL × a supper club × Eventbrite",
    theme: {
      accent: "amber",
      gradientFrom: "from-amber-500",
      gradientTo: "to-rose-500",
      ring: "ring-amber-400/40",
      chipBg: "bg-amber-500/15",
      chipText: "text-amber-200",
      button: "bg-amber-500 hover:bg-amber-400 text-amber-950",
      glow: "shadow-[0_0_60px_-15px_rgba(245,158,11,0.5)]",
    },
    valueProps: [
      {
        emoji: "📵",
        title: "Phones in the basket",
        body: "Every table is device-free. No scrolling, no half-attention — just real conversation for a couple of hours.",
      },
      {
        emoji: "🍝",
        title: "Recurring by design",
        body: "Weekly happy-hour and dinner formats you can build a routine around, not a one-off you forget about.",
      },
      {
        emoji: "🎯",
        title: "Matched, not random",
        body: "A short questionnaire seats you with 5–7 strangers who share your interests and conversation energy.",
      },
      {
        emoji: "🤝",
        title: "Designed for friendship",
        body: "Curated prompts and a host break the ice so you leave with new friends, not just business cards.",
      },
    ],
    questionnaireIntro:
      "Hey! I'm your Tablemates host. Tell me a bit about you and I'll seat you at a dinner or happy hour with people you'll genuinely vibe with. First up —",
    recommendationsTitle: "Your reserved seats",
    recommendationsSubtitle:
      "Small interest-matched tables near you. Pick one and we'll handle the rest.",
    href: "/ideas/irl",
  },
  aggregator: {
    id: "aggregator",
    number: 2,
    name: "Marquee",
    tagline:
      "A personalized, interest-based Ticketmaster for conferences & talks.",
    oneLiner:
      "We aggregate existing events and partner with organizers to market them. Tell us your profession and passions; we surface the conferences, summits, and speakers worth your time.",
    model: "We aggregate 3rd-party events (marketplace + ads)",
    analogy: "Ticketmaster × TED × targeted discovery",
    theme: {
      accent: "indigo",
      gradientFrom: "from-indigo-500",
      gradientTo: "to-cyan-400",
      ring: "ring-indigo-400/40",
      chipBg: "bg-indigo-500/15",
      chipText: "text-indigo-200",
      button: "bg-indigo-500 hover:bg-indigo-400 text-white",
      glow: "shadow-[0_0_60px_-15px_rgba(99,102,241,0.55)]",
    },
    valueProps: [
      {
        emoji: "🧭",
        title: "Signal over noise",
        body: "Thousands of conferences exist. We rank the handful that match your field, seniority, and curiosity.",
      },
      {
        emoji: "🎤",
        title: "Follow speakers, not just events",
        body: "Get alerts when a thinker you admire is presenting near you or streaming online.",
      },
      {
        emoji: "💼",
        title: "Work or personal mode",
        body: "Switch between recommendations for career connections and ones purely for your interests.",
      },
      {
        emoji: "📣",
        title: "Organizers reach the right people",
        body: "Our revenue is targeted, opt-in promotion — relevant events in front of relevant attendees.",
      },
    ],
    questionnaireIntro:
      "Welcome to Marquee. I'll find conferences, summits, and talks actually worth your calendar. To tune your feed —",
    recommendationsTitle: "Curated for your calendar",
    recommendationsSubtitle:
      "Conferences, summits, and talks ranked by fit. Save them or grab tickets.",
    href: "/ideas/aggregator",
  },
  clubs: {
    id: "clubs",
    number: 3,
    name: "Chapters",
    tagline:
      "University-style social clubs for your city — join, plan together, meet IRL.",
    oneLiner:
      "Browse interest clubs in your city, join the ones that fit, and use the in-app space to plan recurring in-person meetups with your members.",
    model: "We host the community layer (clubs + planning tools)",
    analogy: "Discord/Slack × Facebook Groups × campus clubs",
    theme: {
      accent: "violet",
      gradientFrom: "from-violet-500",
      gradientTo: "to-fuchsia-500",
      ring: "ring-violet-400/40",
      chipBg: "bg-violet-500/15",
      chipText: "text-violet-200",
      button: "bg-violet-500 hover:bg-violet-400 text-white",
      glow: "shadow-[0_0_60px_-15px_rgba(139,92,246,0.55)]",
    },
    valueProps: [
      {
        emoji: "🏛️",
        title: "Clubs, not feeds",
        body: "Intimate, interest-based groups with real membership — the campus club experience for adults in your city.",
      },
      {
        emoji: "🗓️",
        title: "Plan to meet IRL",
        body: "Built-in polls, threads, and event tools turn online chatter into recurring in-person hangouts.",
      },
      {
        emoji: "🔁",
        title: "Recurring & accountable",
        body: "Clubs meet on a cadence, so momentum and friendships actually compound over time.",
      },
      {
        emoji: "🌆",
        title: "Local by default",
        body: "Everything is scoped to your city, so the people you meet online are people you can grab coffee with.",
      },
    ],
    questionnaireIntro:
      "Hi! I'm your Chapters concierge. I'll match you with social clubs in your city that you'll want to show up for. To get started —",
    recommendationsTitle: "Clubs for you to join",
    recommendationsSubtitle:
      "Interest-based clubs in your city. Join one to start planning meetups inside the app.",
    href: "/ideas/clubs",
  },
};

export const IDEA_ORDER: IdeaId[] = ["irl", "aggregator", "clubs"];

export function getIdea(id: string): IdeaMeta | undefined {
  return (IDEAS as Record<string, IdeaMeta>)[id];
}
