import { CardTitle } from "@/components/ui/card";
import { BlogTags } from "./BlogTags";

interface BlogDetailTitleProps {
  title: string;
  tags?: string[];
}

export function BlogDetailTitle({
  title,
  tags,
}: Readonly<BlogDetailTitleProps>) {
  return (
    <div className="space-y-4 flex-1">
      <CardTitle className="text-3xl sm:text-4xl text-foreground">
        {title}
      </CardTitle>
      {tags && tags.length > 0 && (
        <BlogTags tags={tags} maxTags={tags.length} gap="gap-2" />
      )}
    </div>
  );
}
