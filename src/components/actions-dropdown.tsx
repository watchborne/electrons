import { MoreVertical } from "lucide-react";
import { Fragment, ReactNode } from "react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export interface ActionsDropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  /** Renders the label in the destructive (red) text tone. */
  destructive?: boolean;
  /** Draws a separator above this item (ignored on the first one). */
  divider?: boolean;
}

export interface ActionsDropdownProps {
  actions: ActionsDropdownItem[];
  onAction: (actionId: string) => void;
  disabled?: boolean;
  size?: "sm" | "lg";
  /** Replaces the default icon-only "more" button. */
  trigger?: ReactNode;
  /**
   * Accessible name of the default icon-only trigger. The package has no copy
   * of its own, so pass a translated string; unused when `trigger` is given.
   */
  triggerLabel?: string;
  align?: "start" | "end";
}

export const ActionsDropdown = ({
  actions,
  onAction,
  disabled = false,
  size = "sm",
  trigger,
  triggerLabel,
  align = "end",
}: ActionsDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      {trigger ?? (
        <Button
          variant="ghost"
          size={size}
          disabled={disabled}
          aria-label={triggerLabel}
          className="h-8 w-8 p-0"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent align={align}>
      {actions.map((action, index) => (
        <Fragment key={action.id}>
          {action.divider && index > 0 && <DropdownMenuSeparator />}
          <DropdownMenuItem
            onClick={() => onAction(action.id)}
            disabled={action.disabled}
            className={action.destructive ? "text-red-foreground" : undefined}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        </Fragment>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
