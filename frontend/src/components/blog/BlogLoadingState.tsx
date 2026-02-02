export function BlogLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-muted-foreground">Loading articles...</p>
    </div>
  );
}
