import type { Blog } from "@/types/blog";

// API types
interface TypicodePost {
  id: string;
  title: string;
  body: string;
  author: string;
  image?: string;
}

export interface TypicodeUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string;
}

// API Base URL
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// create posts
export async function createPost(
  post: Omit<TypicodePost, "id">,
): Promise<{ blog: TypicodePost }> {
  const headers = { "Content-Type": "application/json" };
  const options = { method: "POST", body: JSON.stringify(post), headers };
  const response = await fetch(`${API_BASE}/blogs`, options);
  if (!response.ok) throw new Error("Failed to create post");
  const res = await response.json();
  return res.data;
}

// update posts
export async function updatePost(data: TypicodePost): Promise<TypicodePost> {
  const { id, ...post } = data;
  const headers = { "Content-Type": "application/json" };
  const options = { method: "PUT", body: JSON.stringify(post), headers };
  const response = await fetch(`${API_BASE}/blogs/${id}`, options);
  if (!response.ok) throw new Error("Failed to update post");
  const res = await response.json();
  return res.data;
}

// delete posts
export async function deletePost(id: string): Promise<void> {
  const options = { method: "DELETE" };
  const response = await fetch(`${API_BASE}/blogs/${id}`, options);
  if (!response.ok) throw new Error("Failed to delete post");
}

// Fetch posts
export async function fetchPosts(): Promise<TypicodePost[]> {
  const response = await fetch(`${API_BASE}/blogs`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  const res = await response.json();
  return res.data;
}

// Fetch single post
export async function fetchPost(id: string): Promise<TypicodePost> {
  const response = await fetch(`${API_BASE}/blogs/${id}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  const res = await response.json();
  return res.data;
}

// Fetch users
export async function fetchUsers(): Promise<TypicodeUser[]> {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  const res = await response.json();
  return res.data;
}

// Fetch single user
export async function fetchUser(userId: number): Promise<TypicodeUser> {
  const response = await fetch(`${API_BASE}/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  const res = await response.json();
  return res.data;
}

// Transform Typicode data to Blog format
export function transformToBlog(post: TypicodePost, user: TypicodeUser): Blog {
  // Extract excerpt from body (first 150 characters)
  const excerpt =
    post.body.length > 150
      ? post.body.substring(0, 150).trim() + "..."
      : post.body;

  // Generate tags from title/content (mock tags for now)
  const words = post.title.toLowerCase().split(/\s+/);
  const tags = words
    .filter((word) => word.length > 4)
    .slice(0, 3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return {
    id: post.id.toString(),
    title: post.title,
    content: post.body,
    excerpt,
    author: {
      name: user.fullName,
      avatar: user.avatar,
    },
    createdAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    ).toISOString(), // Random date within last 30 days
    tags: tags.length > 0 ? tags : ["General", "Blog"],
  };
}

// Fetch all blogs with user data
export async function fetchBlogs(): Promise<Blog[]> {
  const [posts, users] = await Promise.all([fetchPosts(), fetchUsers()]);
  const userMap = new Map(users.map((user) => [user.id, user]));
  return posts.map((post) => {
    const user = userMap.get(post.author) || users[0];
    return transformToBlog(post, user);
  });
}

// Fetch single blog with user data
export async function fetchBlog(id: string): Promise<Blog> {
  const [post, users] = await Promise.all([fetchPost(id), fetchUsers()]);
  const user = users.find((u) => u.id === post.author) || users[0];
  return transformToBlog(post, user);
}
