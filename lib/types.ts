export type IdeaId = "irl" | "aggregator" | "clubs";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** Structured interest profile the chatbot emits once it has enough info. */
export interface InterestProfile {
  summary: string;
  tags: string[];
  vibe?: string;
}

/** A generic recommendable item. Shape is shared across ideas; fields are
 *  optional so each concept can use the ones that make sense for it. */
export interface RecItem {
  id: string;
  title: string;
  /** Short category / format label shown as a pill. */
  kind: string;
  blurb: string;
  tags: string[];
  /** Theme-specific metadata rendered as key facts. */
  meta: { label: string; value: string }[];
  host?: string;
  location?: string;
  when?: string;
  size?: string;
  price?: string;
  emoji?: string;
}

export interface ScoredRec extends RecItem {
  score: number;
  matchedTags: string[];
  reason: string;
}

export interface IdeaMeta {
  id: IdeaId;
  number: number;
  name: string;
  tagline: string;
  oneLiner: string;
  /** Comparison-table description. */
  model: string;
  analogy: string;
  /** Tailwind color tokens for theming. */
  theme: {
    accent: string; // e.g. "amber"
    gradientFrom: string;
    gradientTo: string;
    ring: string;
    chipBg: string;
    chipText: string;
    button: string;
    glow: string;
  };
  valueProps: { title: string; body: string; emoji: string }[];
  questionnaireIntro: string;
  recommendationsTitle: string;
  recommendationsSubtitle: string;
  href: string;
}
