# JAKO Ventures — Concept Demos

Three interactive demos exploring distinct directions for an event/community
startup. Built so the founding team can _feel_ each concept and decide which one
to pursue. Each demo opens with a **Claude-powered questionnaire**, then
generates personalized recommendations live from your answers.

| # | Name | The idea | Like |
|---|------|----------|------|
| 1 | **Tablemates** | We host our own recurring, no-phones, interest-matched dinners & happy hours. | NYU IRL × supper club × Eventbrite |
| 2 | **Marquee** | We aggregate & market existing conferences/talks, personalized to you. | Ticketmaster × TED |
| 3 | **Chapters** | City social clubs you join and use to plan recurring IRL meetups. | Discord/Slack × Facebook Groups |

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **Framer Motion**
- **Anthropic Claude** via an edge API route (`app/api/chat/route.ts`)

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## The AI chatbot

The questionnaire is driven by Claude. It works **out of the box in demo mode**
even without an API key — a deterministic, Claude-style scripted flow stands in
and produces the same `<PROFILE>` output the UI expects.

To make the conversation fully dynamic, set an API key:

1. Copy `.env.example` to `.env.local`
2. Add `ANTHROPIC_API_KEY=sk-ant-...` (get one at https://console.anthropic.com/)
3. Restart the dev server

Optionally set `ANTHROPIC_MODEL` (defaults to `claude-3-5-haiku-latest`).

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. (Optional) Add `ANTHROPIC_API_KEY` under **Settings → Environment Variables**
   for the live AI chat.
4. Deploy. Share the URL with the team.

## Structure

```
app/
  page.tsx                 # Landing: compare all 3 concepts
  ideas/{irl,aggregator,clubs}/page.tsx
  api/chat/route.ts        # Claude chatbot (+ no-key fallback)
components/
  IdeaExperience.tsx       # Per-concept hero + demo orchestration
  ChatQuestionnaire.tsx    # The AI chat UI
  Recommendations.tsx      # Matched results + idea-specific actions
  idea/TablePreview.tsx    # Concept 1 interaction
  idea/ClubPlanner.tsx     # Concept 3 interaction (poll + chat)
lib/
  ideas.ts                 # Concept metadata + theming
  data.ts                  # Curated recommendation datasets
  matching.ts              # Interest -> recommendation scoring
  chat-config.ts           # System prompts + fallback script
```
