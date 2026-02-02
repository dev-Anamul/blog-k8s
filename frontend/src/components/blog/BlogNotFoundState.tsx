import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BlogNotFoundStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
}

export function BlogNotFoundState({
  title = "Blog not found",
  description = "The blog post you're looking for doesn't exist.",
  actionLabel = "Go Back Home",
  actionLink = "/",
}: Readonly<BlogNotFoundStateProps>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h2 className="text-2xl font-semibold mb-2 text-foreground">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button asChild>
        <Link to={actionLink} className="flex items-center">
          {actionLabel}
        </Link>
      </Button>
    </div>
  );
}
