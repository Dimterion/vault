import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
};

export default function Button({ children, disabled = false }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="rounded bg-violet-600 px-2 py-1 transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}
