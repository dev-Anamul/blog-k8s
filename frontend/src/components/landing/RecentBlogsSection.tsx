import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import type { Blog } from "@/types/blog";

interface RecentBlogsSectionProps {
  blogs: Blog[];
}

export function RecentBlogsSection({ blogs }: RecentBlogsSectionProps) {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Recent Posts"
          description="Discover the latest articles from our community"
          action={
            <Button variant="outline" asChild>
              <Link to="/blogs" className="flex items-center">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          }
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/blogs" className="flex items-center">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
