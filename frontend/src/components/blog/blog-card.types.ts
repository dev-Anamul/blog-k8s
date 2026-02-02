import type { Blog } from "@/types/blog";

export interface BlogCardProps {
  blog: Blog;
  variant?: "default" | "compact";
  showExcerpt?: boolean;
  maxTags?: number;
}

export type VariantStyles = {
  padding: string;
  spacing: string;
  gap: string;
  aspectRatio: string;
  iconSize: string;
  avatarSize: string;
  avatarBorder: string;
  titleSize: string;
  borderTopPadding: string;
  authorMinHeight: string;
  authorSectionHeight: string;
  titleHeight: string;
  excerptHeight: string;
};
