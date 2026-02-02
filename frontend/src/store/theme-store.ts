import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  theme: (() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) return stored;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  })(),
  setTheme: (theme) => {
    set({ theme });
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
      }
      return { theme: newTheme };
    });
  },
}));

// Initialize theme on mount
if (typeof window !== "undefined") {
  const store = useThemeStore.getState();
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(store.theme);
}
