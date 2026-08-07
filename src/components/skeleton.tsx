import classNames from "classnames";

export const Skeleton = ({ className }: { className?: string }) => {
  return <div className={classNames("animate-pulse bg-muted rounded", className)} />;
};
