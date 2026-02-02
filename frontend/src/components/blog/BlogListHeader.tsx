import { BlogSearchBar } from "./BlogSearchBar";

interface BlogListHeaderProps {
  title: string;
  description?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function BlogListHeader({
  title,
  description,
  searchQuery,
  onSearchChange,
}: Readonly<BlogListHeaderProps>) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <BlogSearchBar value={searchQuery} onChange={onSearchChange} />
    </div>
  );
}
