import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BlogDetailHeader() {
  return (
    <Button variant="ghost" asChild className="mb-4">
      <Link to="/blogs" className="flex items-center">
        <ArrowLeft className="h-4 w-4" />
        Back to Blogs
      </Link>
    </Button>
  );
}
