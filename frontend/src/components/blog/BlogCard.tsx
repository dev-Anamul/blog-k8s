import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogImage } from "./BlogImage";
import { BlogTags } from "./BlogTags";
import { BlogAuthor } from "./BlogAuthor";
import { variantStyles } from "./blog-card.config";
import type { BlogCardProps } from "./blog-card.types";

export function BlogCard(props: Readonly<BlogCardProps>) {
  const { blog, maxTags, showExcerpt, variant = "default" } = props;

  const styles = variantStyles[variant];
  const tagsToShow = maxTags ?? (variant === "compact" ? 2 : 3);

  return (
    <Card className="group flex flex-col overflow-hidden border transition-all duration-300 hover:border-primary/50 hover:shadow-xl py-0">
      <BlogImage imageUrl={blog.imageUrl} title={blog.title} styles={styles} />

      <CardHeader className={cn(styles.spacing, styles.padding)}>
        {blog.tags && blog.tags.length > 0 && (
          <BlogTags tags={blog.tags} maxTags={tagsToShow} gap={styles.gap} />
        )}

        <div className={cn(styles.titleHeight, "flex items-start")}>
          <CardTitle
            className={cn(
              "line-clamp-2 font-bold leading-tight text-foreground transition-colors group-hover:text-primary w-full",
              styles.titleSize,
            )}
          >
            {blog.title}
          </CardTitle>
        </div>

        {showExcerpt && (
          <div className={cn(styles.excerptHeight, "flex items-start")}>
            {blog.excerpt ? (
              <CardDescription
                className={cn(
                  "line-clamp-2 text-sm leading-relaxed w-full",
                  variant === "compact" && "text-muted-foreground",
                )}
              >
                {blog.excerpt}
              </CardDescription>
            ) : (
              <CardDescription
                className={cn(
                  "line-clamp-2 text-sm leading-relaxed w-full text-muted-foreground/70",
                  variant === "compact" && "text-muted-foreground",
                )}
              >
                {blog.content
                  ? blog.content.substring(0, 120).trim() + "..."
                  : "No description available."}
              </CardDescription>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className={cn("pt-0", styles.authorSectionHeight)}>
        <BlogAuthor
          author={blog.author}
          createdAt={blog.createdAt}
          styles={styles}
        />
      </CardContent>

      <CardFooter className={cn(styles.padding, "pt-0")}>
        <Button
          variant="outline"
          className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary dark:group-hover:bg-primary! dark:group-hover:text-primary-foreground! dark:group-hover:border-primary!"
          asChild
        >
          <Link
            to={`/blog/${blog.id}`}
            className="flex items-center justify-center gap-2"
          >
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
