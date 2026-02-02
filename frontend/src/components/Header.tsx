import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenSquare, Home, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useActiveRoute } from "@/hooks/use-active-route";

type NavigationItem = {
  path: string;
  icon: LucideIcon;
  label: string;
};

const navigationItems: NavigationItem[] = [
  {
    path: "/",
    icon: Home,
    label: "Home",
  },
  {
    path: "/blogs",
    icon: BookOpen,
    label: "Blogs",
  },
  {
    path: "/create",
    icon: PenSquare,
    label: "New Post",
  },
];

function NavButton({ item }: { readonly item: NavigationItem }) {
  const isActive = useActiveRoute(item.path);
  const Icon = item.icon;

  return (
    <Button variant={isActive ? "default" : "ghost"} size="sm" asChild>
      <Link to={item.path} className="flex items-center gap-1.5">
        <Icon className="h-4 w-4" />
        <span className="hidden sm:inline">{item.label}</span>
      </Link>
    </Button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Blog App
          </h1>
        </Link>
        <nav className="flex items-center gap-2">
          {navigationItems.map((item) => (
            <NavButton key={item.path} item={item} />
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
