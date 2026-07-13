import { colors } from "./colors";

export const pages = [
  { to: "/habit-tracker", label: "Habit Tracker", bg: colors.primary },
  { to: "/listings", label: "Listings", bg: colors.secondary },
  { to: "/platforms", label: "Platforms", bg: colors.tertiary },
] as const;
