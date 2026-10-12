import { ReactNode } from "react";

import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

export interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  form: ReactNode;
  submitLabel: string;
  cancelLabel: string;
  /** Screen-reader text of the corner close button (see `DialogContent`). */
  closeLabel?: string;
  onSubmit: () => void | Promise<void>;
  /** Puts the submit button in its loading state (spinner, disabled, `aria-busy`). */
  isLoading?: boolean;
  isSubmitDisabled?: boolean;
  /** Overrides DialogContent's own width classes, e.g. `sm:max-w-[520px]`. */
  className?: string;
}

/**
 * A dialog around a caller-owned form: title row, the form, then cancel and
 * submit buttons. Submission is the caller's (`onSubmit`), the dialog only
 * lays it out.
 */
export const FormDialog = ({
  open,
  onOpenChange,
  title,
  description,
  icon,
  form,
  submitLabel,
  cancelLabel,
  closeLabel,
  onSubmit,
  isLoading = false,
  isSubmitDisabled = false,
  className,
}: FormDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className={className} closeLabel={closeLabel}>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {icon}
          {title}
        </DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      {form}

      <DialogFooter className="pt-2">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          {cancelLabel}
        </Button>
        <Button type="button" onClick={onSubmit} disabled={isSubmitDisabled} loading={isLoading}>
          {submitLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
