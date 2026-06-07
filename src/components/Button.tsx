import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return (
    <button className="rounded bg-violet-600 py-1 transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30">
      {children}
    </button>
  );
}
