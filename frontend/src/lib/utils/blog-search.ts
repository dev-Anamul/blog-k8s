import type { Blog } from "@/types/blog";

/**
 * Filters blogs based on search query
 * @param blogs - Array of blogs to filter
 * @param searchQuery - Search query string
 * @returns Filtered array of blogs
 */
export function filterBlogs(blogs: Blog[], searchQuery: string): Blog[] {
  if (!searchQuery.trim()) {
    return blogs;
  }

  const query = searchQuery.toLowerCase();

  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(query) ||
      blog.excerpt?.toLowerCase().includes(query) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
      blog.author.name.toLowerCase().includes(query),
  );
}
