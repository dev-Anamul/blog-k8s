import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface BlogDetailActionsProps {
  blogId: string;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

export function BlogDetailActions({
  blogId,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
}: Readonly<BlogDetailActionsProps>) {
  const handleDelete = () => {
    if (globalThis.confirm("Are you sure you want to delete this blog post?")) {
      onDelete();
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link to={`/edit/${blogId}`} className="flex items-center">
          <Edit className="h-4 w-4" />
          {editLabel}
        </Link>
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        className="flex items-center"
      >
        <Trash2 className="h-4 w-4" />
        {deleteLabel}
      </Button>
    </div>
  );
}
