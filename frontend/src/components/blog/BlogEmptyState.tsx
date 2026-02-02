import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface BlogEmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
}

export function BlogEmptyState({
  title = "No articles yet",
  description = "Be the first to share your knowledge and insights with the community.",
  actionLabel = "Create Your First Post",
  actionLink = "/create",
}: Readonly<BlogEmptyStateProps>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6 px-4">
      <div className="rounded-full bg-muted p-6">
        <BookOpen className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-md">{description}</p>
      </div>
      <Button size="lg" asChild>
        <Link to={actionLink} className="flex items-center">
          {actionLabel}
        </Link>
      </Button>
    </div>
  );
}
