import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VariantStyles } from "./blog-card.types";

interface BlogImageProps {
  imageUrl?: string;
  title: string;
  styles: VariantStyles;
}

export function BlogImage(props: Readonly<BlogImageProps>) {
  const { imageUrl, title, styles } = props;

  if (imageUrl) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          styles.aspectRatio,
        )}
      >
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10",
        styles.aspectRatio,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <BookOpen className={cn("text-muted-foreground/30", styles.iconSize)} />
      </div>
    </div>
  );
}
