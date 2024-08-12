import { type ReactNode } from "react";
import { TbZoomCancel } from "react-icons/tb";

export function ErrorDisplayOnConfirm({ children }: { children: ReactNode }) {
  return (
    <>
      <TbZoomCancel className="text-5xl font-bold text-error" />
      <span className="text-5xl font-bold">An error occurred</span>
      <div className="text-center text-sm leading-5 tracking-wide">
        {children}
      </div>
    </>
  );
}

export function ErrorDisplay({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <div className={`mt-4 w-full rounded-md border-1 border-error bg-red-50 p-4 text-xs text-error ${className ?? ``}`}>
      {children}
    </div>
  );
}

export function SuccessDisplay({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 w-full rounded-md border-1 border-success bg-green-50 p-4 text-sm text-success">
      {children}
    </div>
  );
}

export function InlineError({ message }: { message: string }) {
  return <span className="inline-error">{message}</span>
}

export function FormatErrorMsg(message1: string, message2?: string) {

  if (!message2)
    return `${message1
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, function(str: string) {
        return str.toUpperCase();
      })} is invalid.`;

  return `${message1
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, function(str: string) {
      return str.toUpperCase();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    })} ${message2
      .replace(/([a-z])/g, "$1")
      .replace(/^./, function(str: string) {
        return str.toLowerCase();
      })}`;
}
