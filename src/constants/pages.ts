import { colors } from "./colors";

export const pages = [
  { to: "/platforms", label: "Job Search Platforms", bg: colors.primary },
  { to: "/cv-builder", label: "CV Builder", bg: colors.secondary },
  { to: "/application-tracker", label: "Application Tracker", bg: colors.tertiary },
  { to: "/activities", label: "Activities", bg: colors.quaternary },
] as const;
