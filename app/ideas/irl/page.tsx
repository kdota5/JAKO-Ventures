import type { Metadata } from "next";
import IdeaExperience from "@/components/IdeaExperience";
import { IDEAS } from "@/lib/ideas";

export const metadata: Metadata = {
  title: "Tablemates — Concept #1 · JAKO Ventures",
  description: IDEAS.irl.tagline,
};

export default function Page() {
  return <IdeaExperience idea={IDEAS.irl} />;
}
