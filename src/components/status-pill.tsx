import { cva } from "class-variance-authority";
import classNames from "classnames";
import * as React from "react";

/**
 * The finite set of generic colors used throughout the watchborne platform.
 * Consumers map their own domain status enums onto one of these colors;
 * this component never sees the domain enum itself.
 * Backed by the `--<color>*` tokens in `styles/tokens.css` and the
 * `<color>` Tailwind colour family in `tailwind-preset.js`.
 */
export const COLOR_NAMES = ["green", "blue", "amber", "orange", "red", "gray", "purple"] as const;

export type ColorName = (typeof COLOR_NAMES)[number];

const colorPillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      color: {
        green: "bg-green-soft text-green-foreground",
        blue: "bg-blue-soft text-blue-foreground",
        amber: "bg-amber-soft text-amber-foreground",
        orange: "bg-orange-soft text-orange-foreground",
        red: "bg-red-soft text-red-foreground",
        gray: "bg-gray-soft text-gray-foreground",
        purple: "bg-purple-soft text-purple-foreground",
      },
    },
  },
);

const colorDotVariants = cva("h-2 w-2 rounded-full", {
  variants: {
    color: {
      green: "bg-green",
      blue: "bg-blue",
      amber: "bg-amber",
      orange: "bg-orange",
      red: "bg-red",
      gray: "bg-gray",
      purple: "bg-purple",
    },
  },
});

export interface ColorPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  color: ColorName;
}

/**
 * The tinted-pill-with-a-dot pattern used by status badges throughout
 * the platform. Consumers own the mapping from their domain status
 * onto a color and pass the resulting color plus whatever label/content
 * they want as `children`.
 */
export const ColorPill = ({ color, className, children, ...props }: ColorPillProps) => (
  <span className={classNames(colorPillVariants({ color }), className)} {...props}>
    <span className={colorDotVariants({ color })} />
    {children}
  </span>
);

/**
 * Backward compatibility: StatusPill remains available for gradual migration.
 * Consumers should use ColorPill with ColorName instead.
 */
export const STATUS_TONES = COLOR_NAMES;
export type StatusTone = ColorName;

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone: ColorName;
}

export const StatusPill = ({ tone, className, children, ...props }: StatusPillProps) => (
  <ColorPill color={tone} className={className} {...props}>
    {children}
  </ColorPill>
);
