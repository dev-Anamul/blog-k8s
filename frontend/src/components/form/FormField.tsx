import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  description,
  children,
  className,
}: Readonly<FormFieldProps>) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

interface FormInputProps
  extends React.ComponentProps<typeof Input> {
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
}

export function FormInput({
  label,
  error,
  description,
  required,
  id,
  className,
  ...props
}: Readonly<FormInputProps>) {
  return (
    <FormField
      label={label}
      htmlFor={id || ""}
      required={required}
      error={error}
      description={description}
    >
      <Input id={id} className={cn("w-full", className)} {...props} />
    </FormField>
  );
}

interface FormTextareaProps
  extends React.ComponentProps<typeof Textarea> {
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
}

export function FormTextarea({
  label,
  error,
  description,
  required,
  id,
  className,
  ...props
}: Readonly<FormTextareaProps>) {
  return (
    <FormField
      label={label}
      htmlFor={id || ""}
      required={required}
      error={error}
      description={description}
    >
      <Textarea id={id} className={cn("w-full", className)} {...props} />
    </FormField>
  );
}

interface FormSelectProps
  extends React.ComponentProps<"select"> {
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  error,
  description,
  required,
  id,
  className,
  children,
  ...props
}: Readonly<FormSelectProps>) {
  return (
    <FormField
      label={label}
      htmlFor={id || ""}
      required={required}
      error={error}
      description={description}
    >
      <select
        id={id}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </FormField>
  );
}
