interface BlogDetailImageProps {
  imageUrl: string;
  title: string;
}

export function BlogDetailImage({
  imageUrl,
  title,
}: Readonly<BlogDetailImageProps>) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl">
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
