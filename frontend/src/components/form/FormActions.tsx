import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  className?: string;
}

export function FormActions({
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isLoading = false,
  className,
}: Readonly<FormActionsProps>) {
  return (
    <div className={cn("flex gap-4 pt-4", className)}>
      <Button type="submit" disabled={isLoading} className="flex-1 sm:flex-none">
        {submitLabel}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        {cancelLabel}
      </Button>
    </div>
  );
}
