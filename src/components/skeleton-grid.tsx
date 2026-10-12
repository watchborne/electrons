import { Fragment, ReactNode } from "react";

import { Skeleton } from "./skeleton";

export interface SkeletonGridProps {
  columns?: 2 | 3 | 4;
  count?: number;
  /** Tailwind height class of each default cell. */
  cellHeight?: string;
  /** Overrides the grid's own layout classes, e.g. for a responsive column count. */
  className?: string;
  /** Renders a custom placeholder in place of the default rounded block. */
  renderItem?: (index: number) => ReactNode;
}

const COLUMNS_CLASS = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
} as const;

/** A grid of loading placeholders. */
export const SkeletonGrid = ({
  columns = 4,
  count = 4,
  cellHeight = "h-24",
  className,
  renderItem,
}: SkeletonGridProps) => (
  <div className={className ?? `grid w-full gap-4 ${COLUMNS_CLASS[columns]}`}>
    {Array.from({ length: count }).map((_, index) =>
      renderItem ? (
        <Fragment key={index}>{renderItem(index)}</Fragment>
      ) : (
        <div key={index} className={`${cellHeight} rounded-lg`}>
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      ),
    )}
  </div>
);
