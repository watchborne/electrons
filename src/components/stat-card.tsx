import { PropsWithChildren, ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  subtitle?: string;
} & PropsWithChildren;

export const StatCard = ({ title, value, icon, subtitle, children }: StatCardProps) => {
  return (
    <div className="bg-card rounded-lg border p-4 flex flex-col content-stretch">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      {children}
    </div>
  );
};
