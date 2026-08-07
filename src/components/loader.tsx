import { Loader as LoaderIcon } from "lucide-react";

export const Loader = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-charge mx-auto mb-2" />
        <p className="text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};
