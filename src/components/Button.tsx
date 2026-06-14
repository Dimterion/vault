import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost-destructive";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost-destructive";
} & ComponentProps<"button">;

function getVariantStyles(variant: Variant) {}

export default function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="rounded bg-violet-600 px-2 py-1 transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
    />
  );
}
