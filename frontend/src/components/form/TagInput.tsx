import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

export function TagInput({
  label = "Tags",
  tags,
  onTagsChange,
  placeholder = "Add a tag",
  maxTags,
  className,
}: Readonly<TagInputProps>) {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (
      trimmedTag &&
      !tags.includes(trimmedTag) &&
      (!maxTags || tags.length < maxTags)
    ) {
      onTagsChange([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={className}>
      <Label htmlFor="tags">{label}</Label>
      <div className="flex gap-2 mt-2">
        <Input
          id="tags"
          placeholder={placeholder}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          disabled={maxTags !== undefined && tags.length >= maxTags}
        />
        <Button type="button" onClick={handleAddTag} variant="outline">
          Add Tag
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {maxTags && tags.length >= maxTags && (
        <p className="text-sm text-muted-foreground mt-2">
          Maximum {maxTags} tags allowed
        </p>
      )}
    </div>
  );
}
