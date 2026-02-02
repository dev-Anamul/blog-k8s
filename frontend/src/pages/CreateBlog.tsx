import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/form/FormField";
import { TagInput } from "@/components/form/TagInput";
import { FormActions } from "@/components/form/FormActions";
import { BlogFormHeader } from "@/components/blog/BlogFormHeader";
import type { BlogFormData } from "@/types/blog";
import { createPost } from "@/lib/api";
import { useUsers } from "@/hooks/use-users";

const INITIAL_FORM_DATA: BlogFormData = {
  title: "",
  content: "",
  excerpt: "",
  tags: [],
  imageUrl: "",
  author: "",
};

export function CreateBlog() {
  const navigate = useNavigate();
  const { users, isLoading: isLoadingUsers } = useUsers();
  const [formData, setFormData] = useState<BlogFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API only accepts title, body, and author
      const post = await createPost({
        title: formData.title,
        body: formData.content,
        author: formData.author,
        image: formData.imageUrl,
      });
      navigate(`/blog/${post?.blog?.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
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

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <BlogFormHeader />

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl text-foreground">
              Create New Blog Post
            </CardTitle>
            <CardDescription>
              Share your thoughts and ideas with the community
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
                submitLabel="Create Post"
                isLoading={isSubmitting}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
