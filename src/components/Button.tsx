import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost-destructive";

type ButtonProps = {
  variant?: Variant;
} & ComponentProps<"button">;

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-violet-600 hover:violet-500";
    case "secondary":
      return "bg-zinc-700 hover:zinc-600 text-zinc-400";
    case "ghost-destructive":
      return "hover:bg-red-800 hover:text-red-200 text-red-800";

    default:
      throw new Error(`Invalid variant: ${variant satisfies never}`);
  }
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "rounded bg-violet-600 px-2 py-1 transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-30",
        getVariantStyles(variant),
        className,
      )}
    />
  );
}
