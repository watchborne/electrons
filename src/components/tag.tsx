import { ReactNode } from "react";

export const Tag = ({ children }: { children: ReactNode }) => {
  return (
    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded">
      {children}
    </span>
  );
};
