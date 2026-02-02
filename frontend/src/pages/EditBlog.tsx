import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput, FormTextarea, FormSelect } from "@/components/form/FormField";
import { TagInput } from "@/components/form/TagInput";
import { FormActions } from "@/components/form/FormActions";
import { BlogFormHeader } from "@/components/blog/BlogFormHeader";
import { BlogFormLoadingState } from "@/components/blog/BlogFormLoadingState";
import { useBlog } from "@/hooks/use-blogs";
import { useUsers } from "@/hooks/use-users";
import type { BlogFormData } from "@/types/blog";
import { updatePost, fetchPost } from "@/lib/api";

const INITIAL_FORM_DATA: BlogFormData = {
  title: "",
  content: "",
  excerpt: "",
  tags: [],
  imageUrl: "",
  author: "",
};

export function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blog, isLoading } = useBlog(id);
  const { users, isLoading: isLoadingUsers } = useUsers();
  const [formData, setFormData] = useState<BlogFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadBlogData = async () => {
      if (blog && id) {
        try {
          // Fetch the raw post to get the author ID
          const post = await fetchPost(id);
          setFormData({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt || "",
            tags: blog.tags || [],
            imageUrl: blog.imageUrl || "",
            author: post.author, // Use the author ID from the post
          });
        } catch (error) {
          console.error("Error loading blog data:", error);
          // Fallback to using blog data if fetchPost fails
          const user = users.find((u) => u.fullName === blog.author.name);
          setFormData({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt || "",
            tags: blog.tags || [],
            imageUrl: blog.imageUrl || "",
            author: user?.id || "",
          });
        }
      }
    };

    loadBlogData();
  }, [blog, id, users]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API only accepts id, title, body, and author
      const post = await updatePost({
        id: blog?.id || "",
        title: formData.title,
        body: formData.content,
        author: formData.author,
      });
      navigate(`/blog/${post.id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/blogs");
  };

  const updateFormField = <K extends keyof BlogFormData>(
    field: K,
    value: BlogFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading || isLoadingUsers) {
    return <BlogFormLoadingState />;
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Blog post not found.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <BlogFormHeader />

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl text-foreground">
              Edit Blog Post
            </CardTitle>
            <CardDescription>
              Update your blog post information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormSelect
                id="author"
                label="Author"
                value={formData.author}
                onChange={(e) => updateFormField("author", e.target.value)}
                required
                description="Select the author for this blog post"
                disabled={isLoadingUsers}
              >
                <option value="">Select an author</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName} ({user.username})
                  </option>
                ))}
              </FormSelect>

              <FormInput
                id="title"
                label="Title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={(e) => updateFormField("title", e.target.value)}
                required
              />

              <FormTextarea
                id="excerpt"
                label="Excerpt"
                placeholder="Brief description of your blog post"
                value={formData.excerpt || ""}
                onChange={(e) => updateFormField("excerpt", e.target.value)}
                rows={3}
                description="A short summary that will appear in blog listings (not sent to API)"
              />

              <FormTextarea
                id="content"
                label="Content"
                placeholder="Write your blog post content here..."
                value={formData.content}
                onChange={(e) => updateFormField("content", e.target.value)}
                required
                rows={15}
                className="font-mono text-sm"
                description="The main content of your blog post"
              />

              <FormInput
                id="imageUrl"
                label="Image URL"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl || ""}
                onChange={(e) => updateFormField("imageUrl", e.target.value)}
                description="URL to the featured image for your blog post (not sent to API)"
              />

              <TagInput
                tags={formData.tags || []}
                onTagsChange={(tags) => updateFormField("tags", tags)}
                maxTags={10}
              />

              <FormActions
                onCancel={handleCancel}
                submitLabel="Update Post"
                isLoading={isSubmitting}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
