import type { VariantStyles } from "./blog-card.types";

export const variantStyles: Record<"default" | "compact", VariantStyles> = {
  default: {
    padding: "p-4",
    spacing: "space-y-1.5",
    gap: "gap-1.5",
    aspectRatio: "aspect-video",
    iconSize: "h-12 w-12",
    avatarSize: "h-8 w-8",
    avatarBorder: "border-2",
    titleSize: "text-lg",
    borderTopPadding: "pt-3",
    authorMinHeight: "h-full",
    authorSectionHeight: "h-[4.5rem]",
    titleHeight: "min-h-[3.5rem]",
    excerptHeight: "min-h-[2.75rem]",
  },
  compact: {
    padding: "p-2.5",
    spacing: "space-y-1",
    gap: "gap-1",
    aspectRatio: "aspect-[16/10]",
    iconSize: "h-8 w-8",
    avatarSize: "h-7 w-7",
    avatarBorder: "",
    titleSize: "text-base",
    borderTopPadding: "pt-2",
    authorMinHeight: "h-full",
    authorSectionHeight: "h-[3.75rem]",
    titleHeight: "min-h-[2.75rem]",
    excerptHeight: "min-h-[2.25rem]",
  },
};
