import { BookOpen, PenSquare, Users, Sparkles, type LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Read & Learn",
    description:
      "Discover insightful articles from our community of writers and developers.",
  },
  {
    icon: PenSquare,
    title: "Share Your Ideas",
    description:
      "Write and publish your thoughts, tutorials, and experiences with ease.",
  },
  {
    icon: Users,
    title: "Join Community",
    description: "Connect with like-minded individuals and grow together.",
  },
  {
    icon: Sparkles,
    title: "Stay Updated",
    description:
      "Get the latest trends, tips, and best practices in technology.",
  },
];
