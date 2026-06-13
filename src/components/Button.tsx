import type { ComponentProps } from "react";

type ButtonProps = {} & ComponentProps<"button">;

export default function Button({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="rounded bg-violet-600 px-2 py-1 transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
    />
  );
}
