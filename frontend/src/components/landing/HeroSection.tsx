import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenSquare, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Join thousands of readers</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Share Your Story,
            <br />
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Inspire Others
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            A modern platform for writers and readers. Share your knowledge,
            discover new perspectives, and connect with a vibrant community.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/blogs" className="flex items-center">
                Explore Blogs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto"
            >
              <Link to="/create" className="flex items-center">
                <PenSquare className="h-4 w-4" />
                Write Your First Post
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
