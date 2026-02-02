import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogTagsProps {
  tags: string[];
  maxTags: number;
  gap: string;
}

export function BlogTags(props: Readonly<BlogTagsProps>) {
  const { tags, maxTags, gap } = props;

  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap", gap)}>
      {tags.slice(0, maxTags).map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs font-medium">
          {tag}
        </Badge>
      ))}
      {tags.length > maxTags && (
        <Badge variant="outline" className="text-xs">
          +{tags.length - maxTags}
        </Badge>
      )}
    </div>
  );
}
