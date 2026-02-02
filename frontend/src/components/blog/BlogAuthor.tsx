import { Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Blog } from "@/types/blog";
import type { VariantStyles } from "./blog-card.types";
import { formatDate } from "@/lib/utils/date";
import { getInitials } from "@/lib/utils/avatar";

interface BlogAuthorProps {
  author: Blog["author"];
  createdAt: string;
  styles: VariantStyles;
}

export function BlogAuthor({
  author,
  createdAt,
  styles,
}: Readonly<BlogAuthorProps>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t",
        styles.borderTopPadding,
        styles.authorMinHeight,
        "box-border",
      )}
    >
      <Avatar
        className={cn(
          "border-background shrink-0",
          styles.avatarSize,
          styles.avatarBorder,
        )}
      >
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback className="text-xs font-semibold">
          {getInitials(author.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-sm font-medium text-foreground truncate">
          {author.name}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 shrink-0" />
          <span className="truncate">{formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
