import useSWR from "swr";
import { fetchBlogs, fetchBlog } from "@/lib/api";
import type { Blog } from "@/types/blog";

export function useBlogs() {
  const { data, error, isLoading, mutate } = useSWR<Blog[]>(
    "blogs",
    fetchBlogs,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  return {
    blogs: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

export function useBlog(id: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<Blog | null>(
    id ? `blog-${id}` : null,
    () => (id ? fetchBlog(id) : null),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    blog: data ?? undefined,
    isLoading,
    isError: error,
    mutate,
  };
}
