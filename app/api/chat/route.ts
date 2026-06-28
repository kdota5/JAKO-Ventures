import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  FALLBACK_INTROS,
  FALLBACK_QUESTIONS,
  RECOMMEND_TAG_CLOSE,
  RECOMMEND_TAG_OPEN,
  SYSTEM_PROMPTS,
} from "@/lib/chat-config";
import { tagsFromText } from "@/lib/matching";
import { ChatMessage, IdeaId } from "@/lib/types";

export const runtime = "edge";

const VALID_IDEAS: IdeaId[] = ["irl", "aggregator", "clubs"];

interface ChatRequestBody {
  ideaId: IdeaId;
  messages: ChatMessage[];
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { ideaId, messages } = body;
  if (!ideaId || !VALID_IDEAS.includes(ideaId)) {
    return NextResponse.json({ error: "Unknown ideaId" }, { status: 400 });
  }
  const safeMessages: ChatMessage[] = Array.isArray(messages) ? messages : [];

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ---- No key? Use the deterministic, Claude-style scripted flow. ----------
  if (!apiKey) {
    return NextResponse.json(scriptedReply(ideaId, safeMessages));
  }

  // ---- Live Claude conversation -------------------------------------------
  try {
    const client = new Anthropic({ apiKey });
    const model = process.env.ANTHROPIC_MODEL || "claude-3-5-haiku-latest";

    const apiMessages: Anthropic.MessageParam[] =
      safeMessages.length === 0
        ? [{ role: "user", content: "Please start the questionnaire." }]
        : safeMessages.map((m) => ({ role: m.role, content: m.content }));

    const completion = await client.messages.create({
      model,
      max_tokens: 400,
      system: SYSTEM_PROMPTS[ideaId],
      messages: apiMessages,
    });

    const text = completion.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ content: text, source: "claude" });
  } catch (err) {
    // If the live call fails for any reason, degrade gracefully.
    console.error("Anthropic call failed, using fallback:", err);
    return NextResponse.json(scriptedReply(ideaId, safeMessages));
  }
}

/**
 * Deterministic stand-in for Claude when no API key is configured. Mirrors the
 * same 3-question flow and emits the same <PROFILE>{...}</PROFILE> block.
 */
function scriptedReply(ideaId: IdeaId, messages: ChatMessage[]) {
  const questions = FALLBACK_QUESTIONS[ideaId];
  const userTurns = messages.filter((m) => m.role === "user");
  const answered = userTurns.length;

  if (answered === 0) {
    return {
      content: `${FALLBACK_INTROS[ideaId]}\n\n${questions[0]}`,
      source: "fallback",
    };
  }

  const acks = ["Love it.", "Great — noted.", "Perfect."];

  if (answered < questions.length) {
    return {
      content: `${acks[answered - 1] ?? "Got it."} ${questions[answered]}`,
      source: "fallback",
    };
  }

  // Enough answers — build a profile from everything they told us.
  const allText = userTurns.map((m) => m.content).join(" . ");
  let tags = tagsFromText(allText);
  if (tags.length === 0) tags = ["social", "fun", "ideas"];

  const summary = `You're into ${tags.slice(0, 3).join(", ")} and looking to connect over them.`;
  const vibe = tags.includes("startups") || tags.includes("career")
    ? "driven & curious"
    : tags.includes("outdoors") || tags.includes("fitness")
      ? "active & social"
      : "warm & curious";

  const profile = { summary, tags: tags.slice(0, 6), vibe };
  const content = `Amazing — that gives me a clear picture. Here's what I'm matching you on:\n${RECOMMEND_TAG_OPEN}${JSON.stringify(profile)}${RECOMMEND_TAG_CLOSE}`;

  return { content, source: "fallback" };
}
