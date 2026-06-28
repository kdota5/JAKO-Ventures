import { IdeaId, RecItem } from "./types";

/**
 * Curated demo datasets. These are intentionally hand-written so the demo looks
 * great with or without a live API key. Matching is done by tag overlap against
 * the interest profile produced by the chatbot.
 */
export const DATASETS: Record<IdeaId, RecItem[]> = {
  // ---------------------------------------------------------------------------
  // IDEA 1 — Tablemates: owned, recurring, interest-matched dinners & happy hours
  // ---------------------------------------------------------------------------
  irl: [
    {
      id: "irl-founders-supper",
      title: "Founders' Supper Club",
      kind: "Dinner · Weekly",
      emoji: "🍷",
      blurb:
        "A no-phones dinner for early-stage builders to swap war stories over family-style plates.",
      tags: ["startups", "business", "tech", "ambition", "networking", "career"],
      meta: [
        { label: "Table", value: "6 seats" },
        { label: "Vibe", value: "Driven & candid" },
      ],
      host: "Hosted by Priya",
      location: "Williamsburg, Brooklyn",
      when: "Thursdays · 7:00 PM",
      size: "6 people",
    },
    {
      id: "irl-bookworms-happy-hour",
      title: "Bookworms Happy Hour",
      kind: "Happy Hour · Weekly",
      emoji: "📚",
      blurb:
        "Wine, small plates, and one big question about the book everyone's been meaning to finish.",
      tags: ["books", "reading", "literature", "writing", "ideas", "art", "creative"],
      meta: [
        { label: "Table", value: "7 seats" },
        { label: "Vibe", value: "Curious & cozy" },
      ],
      host: "Hosted by Marcus",
      location: "Capitol Hill, Seattle",
      when: "Tuesdays · 6:30 PM",
      size: "7 people",
    },
    {
      id: "irl-trail-and-ale",
      title: "Trail & Ale",
      kind: "Activity + Drinks · Biweekly",
      emoji: "🥾",
      blurb:
        "A golden-hour hike that ends at a brewery. Move your body, then meet your people.",
      tags: ["outdoors", "hiking", "fitness", "nature", "adventure", "wellness", "sports"],
      meta: [
        { label: "Group", value: "8 spots" },
        { label: "Vibe", value: "Active & easygoing" },
      ],
      host: "Hosted by Dani",
      location: "Boulder, Colorado",
      when: "Saturdays · 5:00 PM",
      size: "8 people",
    },
    {
      id: "irl-board-game-bistro",
      title: "Board Game Bistro Night",
      kind: "Dinner + Games · Weekly",
      emoji: "🎲",
      blurb:
        "Shared dinner, then strategy games that make strangers laugh like old friends.",
      tags: ["games", "gaming", "fun", "casual", "social", "strategy", "puzzles"],
      meta: [
        { label: "Table", value: "6 seats" },
        { label: "Vibe", value: "Playful & warm" },
      ],
      host: "Hosted by Theo",
      location: "Wicker Park, Chicago",
      when: "Fridays · 7:30 PM",
      size: "6 people",
    },
    {
      id: "irl-creatives-table",
      title: "The Creatives' Table",
      kind: "Dinner · Weekly",
      emoji: "🎨",
      blurb:
        "Designers, musicians, and makers trade what they're working on between courses.",
      tags: ["art", "design", "music", "creative", "film", "photography", "writing"],
      meta: [
        { label: "Table", value: "7 seats" },
        { label: "Vibe", value: "Expressive & open" },
      ],
      host: "Hosted by Lena",
      location: "Mission District, San Francisco",
      when: "Wednesdays · 7:00 PM",
      size: "7 people",
    },
    {
      id: "irl-global-kitchen",
      title: "Global Kitchen Happy Hour",
      kind: "Happy Hour · Weekly",
      emoji: "🌍",
      blurb:
        "A rotating menu from a different country each week, for the endlessly curious traveler.",
      tags: ["food", "travel", "culture", "cooking", "languages", "adventure"],
      meta: [
        { label: "Table", value: "8 seats" },
        { label: "Vibe", value: "Worldly & warm" },
      ],
      host: "Hosted by Sofia",
      location: "East Austin, Texas",
      when: "Mondays · 6:30 PM",
      size: "8 people",
    },
    {
      id: "irl-wellness-supper",
      title: "Slow Sunday Supper",
      kind: "Dinner · Weekly",
      emoji: "🧘",
      blurb:
        "A grounding, intentional dinner for people into wellness, mindfulness, and reset rituals.",
      tags: ["wellness", "mindfulness", "health", "yoga", "fitness", "nature"],
      meta: [
        { label: "Table", value: "6 seats" },
        { label: "Vibe", value: "Calm & intentional" },
      ],
      host: "Hosted by Ravi",
      location: "Santa Monica, LA",
      when: "Sundays · 6:00 PM",
      size: "6 people",
    },
    {
      id: "irl-night-owls",
      title: "Night Owls Music & Bites",
      kind: "Happy Hour · Weekly",
      emoji: "🎶",
      blurb:
        "Live vinyl, late small plates, and conversation for music lovers and night people.",
      tags: ["music", "nightlife", "art", "concerts", "social", "creative"],
      meta: [
        { label: "Table", value: "8 seats" },
        { label: "Vibe", value: "Lively & loose" },
      ],
      host: "Hosted by Jules",
      location: "Nashville, Tennessee",
      when: "Fridays · 9:00 PM",
      size: "8 people",
    },
  ],

  // ---------------------------------------------------------------------------
  // IDEA 2 — Marquee: aggregated conferences, summits & talks (marketplace)
  // ---------------------------------------------------------------------------
  aggregator: [
    {
      id: "agg-ai-frontiers",
      title: "AI Frontiers Summit",
      kind: "Conference",
      emoji: "🤖",
      blurb:
        "Two days on the frontier of applied AI — agents, evals, and shipping models to production.",
      tags: ["ai", "tech", "machine learning", "engineering", "startups", "data", "career"],
      meta: [
        { label: "Speaker", value: "A. Karpathy-style keynote" },
        { label: "For", value: "Engineers & founders" },
      ],
      location: "San Francisco, CA",
      when: "Sep 18–19",
      price: "From $349",
    },
    {
      id: "agg-design-systems",
      title: "Design Systems Conf",
      kind: "Conference",
      emoji: "🎨",
      blurb:
        "How the best product teams scale design — tokens, components, and craft at velocity.",
      tags: ["design", "product", "ux", "creative", "tech", "career"],
      meta: [
        { label: "Track", value: "Product & design" },
        { label: "For", value: "Designers & PMs" },
      ],
      location: "New York, NY",
      when: "Oct 7",
      price: "From $199",
    },
    {
      id: "agg-climate-ted",
      title: "Climate Tech TED Salon",
      kind: "Talk · Evening",
      emoji: "🌱",
      blurb:
        "An intimate evening of TED-style talks from founders decarbonizing hard industries.",
      tags: ["climate", "sustainability", "tech", "science", "impact", "energy", "startups"],
      meta: [
        { label: "Format", value: "6 talks + Q&A" },
        { label: "For", value: "The mission-driven" },
      ],
      location: "Boston, MA",
      when: "Nov 2",
      price: "From $59",
    },
    {
      id: "agg-fintech-forward",
      title: "Fintech Forward",
      kind: "Summit",
      emoji: "💳",
      blurb:
        "Where payments, banking infra, and policy leaders map the next decade of money.",
      tags: ["finance", "fintech", "business", "tech", "career", "economics", "crypto"],
      meta: [
        { label: "Track", value: "Payments & infra" },
        { label: "For", value: "Operators & investors" },
      ],
      location: "Miami, FL",
      when: "Dec 4–5",
      price: "From $499",
    },
    {
      id: "agg-health-innovation",
      title: "Future of Health Innovation",
      kind: "Conference",
      emoji: "🧬",
      blurb:
        "Clinicians, biotech founders, and researchers on longevity, devices, and care delivery.",
      tags: ["health", "biotech", "science", "medicine", "wellness", "research", "career"],
      meta: [
        { label: "Track", value: "Biotech & care" },
        { label: "For", value: "Health professionals" },
      ],
      location: "San Diego, CA",
      when: "Oct 22–23",
      price: "From $279",
    },
    {
      id: "agg-creator-economy",
      title: "Creator Economy Live",
      kind: "Summit",
      emoji: "📹",
      blurb:
        "Top creators and platform leaders on building media businesses that last.",
      tags: ["media", "marketing", "creative", "content", "business", "social", "startups"],
      meta: [
        { label: "Format", value: "Keynotes + workshops" },
        { label: "For", value: "Creators & marketers" },
      ],
      location: "Los Angeles, CA",
      when: "Nov 14",
      price: "From $149",
    },
    {
      id: "agg-philosophy-night",
      title: "Big Ideas: A Philosophy Night",
      kind: "Talk · Evening",
      emoji: "🧠",
      blurb:
        "Thinkers debate meaning, ethics, and technology over a single provocative question.",
      tags: ["philosophy", "ideas", "science", "ethics", "writing", "culture", "books"],
      meta: [
        { label: "Format", value: "Debate + mingle" },
        { label: "For", value: "The intellectually curious" },
      ],
      location: "Chicago, IL",
      when: "Sep 30",
      price: "From $39",
    },
    {
      id: "agg-leadership-summit",
      title: "Modern Leadership Summit",
      kind: "Conference",
      emoji: "🚀",
      blurb:
        "Practical playbooks on managing teams, scaling culture, and leading through change.",
      tags: ["leadership", "management", "business", "career", "startups", "productivity"],
      meta: [
        { label: "Track", value: "People & ops" },
        { label: "For", value: "Managers & execs" },
      ],
      location: "Austin, TX",
      when: "Oct 15",
      price: "From $329",
    },
  ],

  // ---------------------------------------------------------------------------
  // IDEA 3 — Chapters: city social clubs + in-app planning -> IRL meetups
  // ---------------------------------------------------------------------------
  clubs: [
    {
      id: "club-sunrise-run",
      title: "Sunrise Run Club",
      kind: "Fitness Club",
      emoji: "🏃",
      blurb:
        "An easygoing 5K crew that meets at dawn and grabs coffee after. All paces welcome.",
      tags: ["fitness", "running", "outdoors", "health", "wellness", "sports", "social"],
      meta: [
        { label: "Members", value: "214" },
        { label: "Cadence", value: "Tue & Sat AM" },
      ],
      location: "Your city · Riverside Park",
      when: "Next meetup: Sat 7:00 AM",
    },
    {
      id: "club-indie-film",
      title: "Indie Film Society",
      kind: "Arts Club",
      emoji: "🎬",
      blurb:
        "Monthly screenings of under-the-radar films followed by spirited debate at a nearby bar.",
      tags: ["film", "movies", "art", "creative", "culture", "writing"],
      meta: [
        { label: "Members", value: "98" },
        { label: "Cadence", value: "Monthly" },
      ],
      location: "Your city · The Roxie",
      when: "Next meetup: Fri 7:30 PM",
    },
    {
      id: "club-startup-builders",
      title: "Startup Builders Guild",
      kind: "Professional Club",
      emoji: "🛠️",
      blurb:
        "Founders and early employees who demo progress, trade intros, and co-work weekly.",
      tags: ["startups", "tech", "business", "career", "networking", "product", "ambition"],
      meta: [
        { label: "Members", value: "176" },
        { label: "Cadence", value: "Weekly co-work" },
      ],
      location: "Your city · WeWork SoMa",
      when: "Next meetup: Wed 6:00 PM",
    },
    {
      id: "club-supper-society",
      title: "The Supper Society",
      kind: "Food & Drink Club",
      emoji: "🍳",
      blurb:
        "Home cooks and restaurant hunters who host potlucks and chase the city's best bites.",
      tags: ["food", "cooking", "social", "culture", "travel", "wine"],
      meta: [
        { label: "Members", value: "142" },
        { label: "Cadence", value: "Biweekly" },
      ],
      location: "Your city · rotating homes",
      when: "Next meetup: Sun 5:00 PM",
    },
    {
      id: "club-trailblazers",
      title: "Weekend Trailblazers",
      kind: "Outdoors Club",
      emoji: "⛰️",
      blurb:
        "Day hikes, camping trips, and climbing days planned together for every skill level.",
      tags: ["outdoors", "hiking", "adventure", "nature", "fitness", "camping", "travel"],
      meta: [
        { label: "Members", value: "263" },
        { label: "Cadence", value: "Weekends" },
      ],
      location: "Your city · trailheads nearby",
      when: "Next meetup: Sat 8:00 AM",
    },
    {
      id: "club-board-and-brews",
      title: "Board & Brews",
      kind: "Games Club",
      emoji: "🎲",
      blurb:
        "A friendly tabletop crew — strategy nights, casual party games, and the occasional tournament.",
      tags: ["games", "gaming", "social", "fun", "strategy", "casual"],
      meta: [
        { label: "Members", value: "121" },
        { label: "Cadence", value: "Weekly" },
      ],
      location: "Your city · Meeple Café",
      when: "Next meetup: Thu 7:00 PM",
    },
    {
      id: "club-page-turners",
      title: "Page Turners Book Club",
      kind: "Reading Club",
      emoji: "📖",
      blurb:
        "One book a month, big discussions, and a members' shelf of what to read next.",
      tags: ["books", "reading", "literature", "writing", "ideas", "culture"],
      meta: [
        { label: "Members", value: "189" },
        { label: "Cadence", value: "Monthly" },
      ],
      location: "Your city · Cafe Mercato",
      when: "Next meetup: Tue 6:30 PM",
    },
    {
      id: "club-synths-and-strings",
      title: "Synths & Strings",
      kind: "Music Club",
      emoji: "🎸",
      blurb:
        "Musicians and listeners who jam, swap gear tips, and hit shows around town together.",
      tags: ["music", "creative", "art", "concerts", "nightlife", "social"],
      meta: [
        { label: "Members", value: "134" },
        { label: "Cadence", value: "Biweekly" },
      ],
      location: "Your city · Sound Lab",
      when: "Next meetup: Fri 8:00 PM",
    },
  ],
};
