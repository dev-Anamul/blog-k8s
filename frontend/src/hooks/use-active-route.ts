import { useLocation } from "react-router-dom";

/**
 * Custom hook to check if a route path is currently active.
 * 
 * @param path - The route path to check (e.g., "/", "/blogs", "/create")
 * @returns true if the current location matches the path, false otherwise
 * 
 * @example
 * ```tsx
 * const isHomeActive = useActiveRoute("/");
 * const isBlogsActive = useActiveRoute("/blogs");
 * ```
 */
export function useActiveRoute(path: string): boolean {
  const location = useLocation();

  if (path === "/") {
    return location.pathname === "/";
  }

  return location.pathname.startsWith(path);
}
