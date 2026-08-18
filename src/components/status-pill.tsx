import { cva } from "class-variance-authority";
import classNames from "classnames";
import * as React from "react";

/**
 * The finite set of visual "tones" a charge-point status can collapse onto —
 * backed by the `--status-*` tokens in `styles/tokens.css` and the
 * `status.<tone>` Tailwind colour family in `tailwind-preset.js`. Consumers
 * map their own domain status enums onto one of these; this component never
 * sees the domain enum itself.
 */
export const STATUS_TONES = [
  "available",
  "charging",
  "pending",
  "warning",
  "error",
  "offline",
  "reserved",
] as const;

export type StatusTone = (typeof STATUS_TONES)[number];

const statusPillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        available: "bg-status-available-soft text-status-available-foreground",
        charging: "bg-status-charging-soft text-status-charging-foreground",
        pending: "bg-status-pending-soft text-status-pending-foreground",
        warning: "bg-status-warning-soft text-status-warning-foreground",
        error: "bg-status-error-soft text-status-error-foreground",
        offline: "bg-status-offline-soft text-status-offline-foreground",
        reserved: "bg-status-reserved-soft text-status-reserved-foreground",
      },
    },
  },
);

const statusDotVariants = cva("h-2 w-2 rounded-full", {
  variants: {
    tone: {
      available: "bg-status-available",
      charging: "bg-status-charging",
      pending: "bg-status-pending",
      warning: "bg-status-warning",
      error: "bg-status-error",
      offline: "bg-status-offline",
      reserved: "bg-status-reserved",
    },
  },
});

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone: StatusTone;
}

/**
 * The tinted-pill-with-a-dot pattern shared by every charge-point-status
 * badge in `charge-points-frontend` (`StatusBadge`, `SiteHealthBadge`,
 * `AlertStatusBadge`) — promoted here since only the domain-to-tone mapping
 * and label text ever differed between them (issue #7). Consumers own that
 * mapping (e.g. a `connectionStatusTone`-style function) and pass the
 * resulting tone plus whatever label/content they want as `children`.
 */
export const StatusPill = ({ tone, className, children, ...props }: StatusPillProps) => (
  <span className={classNames(statusPillVariants({ tone }), className)} {...props}>
    <span className={statusDotVariants({ tone })} />
    {children}
  </span>
);
