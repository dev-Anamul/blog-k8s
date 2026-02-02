interface BlogDetailContentProps {
  content: string;
}

export function BlogDetailContent({
  content,
}: Readonly<BlogDetailContentProps>) {
  return (
    <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
      <div className="whitespace-pre-wrap text-foreground leading-relaxed">
        {content}
      </div>
    </div>
  );
}
