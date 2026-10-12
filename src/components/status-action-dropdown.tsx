import { ReactNode } from "react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export interface StatusActionOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface StatusActionDropdownProps {
  currentStatus: string;
  options: StatusActionOption[];
  onStatusChange: (value: string) => void;
  disabled?: boolean;
  /** Replaces the default button, which shows the current status' label. */
  trigger?: ReactNode;
  align?: "start" | "end";
}

/** A menu to move something to another status; the current one is listed but not selectable. */
export const StatusActionDropdown = ({
  currentStatus,
  options,
  onStatusChange,
  disabled = false,
  trigger,
  align = "end",
}: StatusActionDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      {trigger ?? (
        <Button variant="outline" disabled={disabled}>
          {options.find((option) => option.value === currentStatus)?.label || currentStatus}
        </Button>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent align={align}>
      {options.map((option) => (
        <DropdownMenuItem
          key={option.value}
          onClick={() => onStatusChange(option.value)}
          disabled={option.disabled || option.value === currentStatus}
        >
          {option.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
