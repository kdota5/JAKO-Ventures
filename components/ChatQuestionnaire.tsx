"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RECOMMEND_TAG_CLOSE,
  RECOMMEND_TAG_OPEN,
} from "@/lib/chat-config";
import { ChatMessage, IdeaMeta, InterestProfile } from "@/lib/types";

interface Props {
  idea: IdeaMeta;
  onComplete: (profile: InterestProfile) => void;
}

function parseProfile(text: string): InterestProfile | null {
  const start = text.indexOf(RECOMMEND_TAG_OPEN);
  const end = text.indexOf(RECOMMEND_TAG_CLOSE);
  if (start === -1 || end === -1) return null;
  const json = text.slice(start + RECOMMEND_TAG_OPEN.length, end).trim();
  try {
    const parsed = JSON.parse(json) as InterestProfile;
    if (!Array.isArray(parsed.tags)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function stripProfile(text: string): string {
  const start = text.indexOf(RECOMMEND_TAG_OPEN);
  if (start === -1) return text.trim();
  return text.slice(0, start).trim();
}

export default function ChatQuestionnaire({ idea, onComplete }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const send = async (history: ChatMessage[]) => {
    setThinking(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId: idea.id, messages: history }),
      });
      const data = await res.json();
      const content: string = data.content ?? "Sorry, something went wrong.";

      const profile = parseProfile(content);
      const visible = stripProfile(content);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: visible || "Got it!" },
      ]);

      if (profile) {
        setDone(true);
        // Brief beat so the user reads the closing line before transitioning.
        setTimeout(() => onComplete(profile), 1100);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm, I had trouble connecting. Try sending that again in a moment.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  // Kick off the conversation exactly once (ref guard survives Strict Mode).
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    void send([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value || thinking || done) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setInput("");
    void send(next);
  };

  return (
    <div
      className={`flex h-[32rem] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur ${idea.theme.glow}`}
    >
      {/* header */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${idea.theme.gradientFrom} ${idea.theme.gradientTo} text-sm font-bold text-white`}
        >
          AI
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">{idea.name} concierge</p>
          <p className="flex items-center gap-1.5 text-xs text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Powered by Claude
          </p>
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={
                  m.role === "user"
                    ? `max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br ${idea.theme.gradientFrom} ${idea.theme.gradientTo} px-4 py-2.5 text-sm text-white shadow-lg`
                    : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/90"
                }
              >
                {m.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {thinking && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3 text-white/70">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        {done && (
          <div className="flex justify-center pt-2">
            <span className={`rounded-full px-3 py-1 text-xs ${idea.theme.chipBg} ${idea.theme.chipText}`}>
              Building your matches…
            </span>
          </div>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-white/10 bg-white/[0.03] px-3 py-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={thinking || done}
          placeholder={done ? "All set!" : "Type your answer…"}
          className="flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none transition focus:border-white/25"
        />
        <button
          type="submit"
          disabled={thinking || done || !input.trim()}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-40 ${idea.theme.button}`}
          aria-label="Send"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M3.4 20.4 21 12 3.4 3.6 3 10l12 2-12 2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
