import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useBlog } from "@/hooks/use-blogs";
import { BlogFormLoadingState } from "@/components/blog/BlogFormLoadingState";
import { BlogNotFoundState } from "@/components/blog/BlogNotFoundState";
import { BlogDetailHeader } from "@/components/blog/BlogDetailHeader";
import { BlogDetailImage } from "@/components/blog/BlogDetailImage";
import { BlogDetailTitle } from "@/components/blog/BlogDetailTitle";
import { BlogDetailMeta } from "@/components/blog/BlogDetailMeta";
import { BlogDetailActions } from "@/components/blog/BlogDetailActions";
import { BlogDetailContent } from "@/components/blog/BlogDetailContent";

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blog, isLoading } = useBlog(id);

  const handleDelete = async () => {
    try {
      // TODO: Replace with actual API call
      console.log("Deleting blog:", id);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  if (isLoading) {
    return <BlogFormLoadingState />;
  }

  if (!blog) {
    return <BlogNotFoundState />;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl space-y-8">
        <BlogDetailHeader />

        {blog.imageUrl && (
          <BlogDetailImage imageUrl={blog.imageUrl} title={blog.title} />
        )}

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <BlogDetailTitle title={blog.title} tags={blog.tags} />
              <BlogDetailActions blogId={blog.id} onDelete={handleDelete} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <BlogDetailMeta author={blog.author} createdAt={blog.createdAt} />
            <BlogDetailContent content={blog.content} />
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
