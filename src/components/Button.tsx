import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "ghost-destructive";

type ButtonProps = {
  variant?: Variant;
} & ComponentProps<"button">;

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-zinc-800 hover:zinc-700";
    case "secondary":
      return "bg-zinc-700 hover:zinc-600 text-zinc-400";
    case "ghost-destructive":
      return "hover:bg-red-700 bg-red-800";

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
        "cursor-pointer rounded bg-zinc-800 px-4 py-2 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-30",
        getVariantStyles(variant),
        className,
      )}
    />
  );
}
