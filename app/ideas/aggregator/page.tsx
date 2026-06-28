import type { Metadata } from "next";
import IdeaExperience from "@/components/IdeaExperience";
import { IDEAS } from "@/lib/ideas";

export const metadata: Metadata = {
  title: "Marquee — Concept #2 · JAKO Ventures",
  description: IDEAS.aggregator.tagline,
};

export default function Page() {
  return <IdeaExperience idea={IDEAS.aggregator} />;
}
