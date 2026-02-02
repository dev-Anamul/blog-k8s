export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Blog App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
