import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface BlogNoResultsStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export function BlogNoResultsState({
  onClearSearch,
}: Readonly<BlogNoResultsStateProps>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
      <div className="rounded-full bg-muted p-6">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">
          No results found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your search terms or browse all articles.
        </p>
      </div>
      <Button variant="outline" onClick={onClearSearch}>
        Clear Search
      </Button>
    </div>
  );
}
