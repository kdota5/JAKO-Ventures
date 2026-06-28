import { DATASETS } from "./data";
import { IdeaId, InterestProfile, RecItem, ScoredRec } from "./types";

/**
 * Maps free-text keywords a user might say into the canonical tags used by the
 * datasets. Used both by the no-key chatbot fallback and as a safety net when
 * the model returns loose tags.
 */
const KEYWORD_TO_TAGS: Record<string, string[]> = {
  // tech / work
  ai: ["ai", "tech", "machine learning", "data"],
  "machine learning": ["ai", "machine learning", "data", "tech"],
  ml: ["ai", "machine learning", "data"],
  tech: ["tech", "startups"],
  technology: ["tech", "startups"],
  coding: ["tech", "engineering"],
  programming: ["tech", "engineering"],
  software: ["tech", "engineering"],
  engineer: ["engineering", "tech", "career"],
  startup: ["startups", "business", "ambition", "career"],
  startups: ["startups", "business", "ambition", "career"],
  founder: ["startups", "business", "ambition", "career"],
  entrepreneur: ["startups", "business", "ambition"],
  business: ["business", "career", "networking"],
  finance: ["finance", "fintech", "business", "economics"],
  fintech: ["fintech", "finance", "tech"],
  crypto: ["crypto", "fintech", "tech"],
  product: ["product", "tech", "design"],
  design: ["design", "creative", "art", "ux"],
  ux: ["ux", "design", "product"],
  marketing: ["marketing", "media", "business"],
  leadership: ["leadership", "management", "career"],
  management: ["management", "leadership", "career"],
  career: ["career", "networking", "business"],
  networking: ["networking", "career", "social"],
  productivity: ["productivity", "career"],

  // science / health
  science: ["science", "ideas", "research"],
  biotech: ["biotech", "science", "health"],
  health: ["health", "wellness", "medicine"],
  medicine: ["medicine", "health", "science"],
  wellness: ["wellness", "health", "mindfulness"],
  mindfulness: ["mindfulness", "wellness", "yoga"],
  yoga: ["yoga", "wellness", "fitness"],
  meditation: ["mindfulness", "wellness"],
  climate: ["climate", "sustainability", "impact", "science"],
  sustainability: ["sustainability", "climate", "impact"],

  // creative / culture
  art: ["art", "creative", "design"],
  arts: ["art", "creative", "culture"],
  music: ["music", "concerts", "creative", "nightlife"],
  concerts: ["concerts", "music", "nightlife"],
  film: ["film", "movies", "creative", "art"],
  movies: ["movies", "film", "culture"],
  photography: ["photography", "creative", "art"],
  writing: ["writing", "creative", "books", "literature"],
  books: ["books", "reading", "literature", "ideas"],
  reading: ["reading", "books", "literature"],
  literature: ["literature", "books", "reading"],
  philosophy: ["philosophy", "ideas", "ethics", "books"],
  ideas: ["ideas", "philosophy", "science"],
  culture: ["culture", "art", "travel"],
  media: ["media", "marketing", "content"],
  content: ["content", "media", "creative"],

  // lifestyle / social
  food: ["food", "cooking", "culture"],
  cooking: ["cooking", "food"],
  foodie: ["food", "cooking", "culture", "wine"],
  wine: ["wine", "food", "social"],
  travel: ["travel", "culture", "adventure"],
  languages: ["languages", "culture", "travel"],
  outdoors: ["outdoors", "nature", "adventure", "hiking"],
  hiking: ["hiking", "outdoors", "nature", "fitness"],
  camping: ["camping", "outdoors", "adventure"],
  nature: ["nature", "outdoors"],
  fitness: ["fitness", "health", "sports", "wellness"],
  running: ["running", "fitness", "outdoors", "sports"],
  run: ["running", "fitness", "sports"],
  sports: ["sports", "fitness"],
  gym: ["fitness", "health"],
  adventure: ["adventure", "outdoors", "travel"],
  games: ["games", "gaming", "fun", "strategy"],
  gaming: ["gaming", "games", "fun"],
  boardgames: ["games", "strategy", "social"],
  nightlife: ["nightlife", "music", "social"],
  social: ["social", "networking", "fun"],
  fun: ["fun", "social", "casual"],
};

/** Pull canonical tags out of arbitrary user text. */
export function tagsFromText(text: string): string[] {
  const lower = ` ${text.toLowerCase()} `;
  const found = new Set<string>();
  for (const [keyword, tags] of Object.entries(KEYWORD_TO_TAGS)) {
    if (lower.includes(` ${keyword} `) || lower.includes(`${keyword},`) || lower.includes(`${keyword}.`)) {
      tags.forEach((t) => found.add(t));
    }
  }
  return Array.from(found);
}

/** Normalize and expand a profile's tags through the keyword map. */
function expandTags(tags: string[]): Set<string> {
  const out = new Set<string>();
  for (const raw of tags) {
    const t = raw.toLowerCase().trim();
    if (!t) continue;
    out.add(t);
    const mapped = KEYWORD_TO_TAGS[t];
    if (mapped) mapped.forEach((m) => out.add(m));
  }
  return out;
}

const REASON_TEMPLATES: Record<IdeaId, (tags: string[]) => string> = {
  irl: (tags) =>
    `Seated around your love of ${joinTags(tags)} — a small table where that's the through-line.`,
  aggregator: (tags) =>
    `Surfaced because it maps to your interest in ${joinTags(tags)}.`,
  clubs: (tags) =>
    `A strong fit for ${joinTags(tags)} — people who show up for this regularly.`,
};

function joinTags(tags: string[]): string {
  const t = tags.slice(0, 3);
  if (t.length === 0) return "what you shared";
  if (t.length === 1) return t[0];
  if (t.length === 2) return `${t[0]} & ${t[1]}`;
  return `${t[0]}, ${t[1]} & ${t[2]}`;
}

/** Score every item in an idea's dataset against the interest profile. */
export function recommend(
  ideaId: IdeaId,
  profile: InterestProfile,
  limit = 4
): ScoredRec[] {
  const userTags = expandTags(profile.tags ?? []);
  const items = DATASETS[ideaId] ?? [];

  const scored: ScoredRec[] = items.map((item: RecItem) => {
    const matched: string[] = [];
    for (const tag of item.tags) {
      if (userTags.has(tag.toLowerCase())) matched.push(tag);
    }
    const score = matched.length;
    return {
      ...item,
      score,
      matchedTags: matched,
      reason:
        matched.length > 0
          ? REASON_TEMPLATES[ideaId](matched)
          : "A popular pick to round out your options.",
    };
  });

  scored.sort((a, b) => b.score - a.score);

  // If nothing matched at all, still return a sensible default set.
  const top = scored.slice(0, limit);
  return top;
}
