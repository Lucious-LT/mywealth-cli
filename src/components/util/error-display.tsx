import { type ReactNode } from "react";

export function ErrorDisplay({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-md border-1 border-error bg-red-50 p-4 text-xs text-error">
      {children}
    </div>
  );
}
