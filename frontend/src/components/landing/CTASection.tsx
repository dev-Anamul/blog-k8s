import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenSquare } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-2 bg-linear-to-br from-primary/5 to-secondary/5">
          <CardContent className="py-12 sm:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Share Your Story?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join our community of writers and start sharing your knowledge
                today. It&apos;s free and easy to get started.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link to="/create" className="flex items-center">
                    <PenSquare className="h-4 w-4" />
                    Create Your First Post
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/blogs" className="flex items-center">
                    Browse All Posts
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
