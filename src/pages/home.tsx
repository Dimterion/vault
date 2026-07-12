import { Link } from "react-router";
import { colors } from "../constants/colors";

const actions = [
  { to: "/habit-tracker", label: "Habit Tracker", bg: colors.primary },
  { to: "/listings", label: "Listings", bg: colors.secondary },
];

export default function HomePage() {
  return (
    <main
      className="flex flex-1 items-center justify-center px-4 py-10"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-3 text-center text-4xl font-bold text-slate-900">
          Vault
        </h1>

        <p
          className="mb-8 text-center text-base leading-6"
          style={{ color: colors.textMuted }}
        >
          A vault app.
        </p>

        <div className="flex flex-col gap-3">
          {actions.map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="rounded-xl px-4.5 py-3.5 text-center text-base font-semibold text-white transition-opacity hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              style={{ backgroundColor: action.bg }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
