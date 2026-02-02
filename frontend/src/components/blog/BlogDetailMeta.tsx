import { Calendar, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatLongDate } from "@/lib/utils/date";
import { getInitials } from "@/lib/utils/avatar";
import type { Blog } from "@/types/blog";

interface BlogDetailMetaProps {
  author: Blog["author"];
  createdAt: string;
}

export function BlogDetailMeta({
  author,
  createdAt,
}: Readonly<BlogDetailMetaProps>) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
        </Avatar>
        <span className="flex items-center gap-1">
          <User className="h-4 w-4" />
          {author.name}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="h-4 w-4" />
        {formatLongDate(createdAt)}
      </div>
    </div>
  );
}
