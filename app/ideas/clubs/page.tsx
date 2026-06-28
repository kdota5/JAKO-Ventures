import type { Metadata } from "next";
import IdeaExperience from "@/components/IdeaExperience";
import { IDEAS } from "@/lib/ideas";

export const metadata: Metadata = {
  title: "Chapters — Concept #3 · JAKO Ventures",
  description: IDEAS.clubs.tagline,
};

export default function Page() {
  return <IdeaExperience idea={IDEAS.clubs} />;
}
