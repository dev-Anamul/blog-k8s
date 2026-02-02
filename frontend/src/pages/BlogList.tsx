import { useState } from "react";
import { useBlogs } from "@/hooks/use-blogs";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogLoadingState } from "@/components/blog/BlogLoadingState";
import { BlogEmptyState } from "@/components/blog/BlogEmptyState";
import { BlogNoResultsState } from "@/components/blog/BlogNoResultsState";
import { filterBlogs } from "@/lib/utils/blog-search";

export function BlogList() {
  const { blogs, isLoading } = useBlogs();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = filterBlogs(blogs, searchQuery);
  const articlePlural = filteredBlogs.length === 1 ? "" : "s";

  if (isLoading) {
    return <BlogLoadingState />;
  }

  if (blogs.length === 0) {
    return <BlogEmptyState />;
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <BlogListHeader
          title="All Articles"
          description="Explore articles from our community"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            Found {filteredBlogs.length} article{articlePlural} matching &quot;{searchQuery}
            &quot;
          </div>
        )}

        {searchQuery && filteredBlogs.length === 0 && (
          <BlogNoResultsState
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
          />
        )}

        {(!searchQuery || filteredBlogs.length > 0) && (
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 pb-4">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  variant="compact"
                  showExcerpt={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
