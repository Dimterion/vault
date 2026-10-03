import { Link } from "react-router";
import { colors } from "../constants/colors";

export default function HomePage() {
  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-10"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-3 text-center text-4xl font-bold text-slate-900">
          About Vault
        </h1>

        <p
          className="my-10 text-center text-lg leading-6 font-semibold"
          style={{ color: colors.textMuted }}
        >
          A simple app to organize your job search activities.
        </p>
        <ul
          className="mb-10 ml-5 list-outside list-disc space-y-2"
          style={{ color: colors.textMuted }}
        >
          <li>Check major job search platforms</li>
          <li>Explore job opportunities in various companies</li>
          <li>Create a CV</li>
          <li>Track your applications</li>
          <li>Track your job search activities</li>
        </ul>

        <p className="mb-10" style={{ color: colors.textMuted }}>
          No login or account creation. Information is saved locally on your
          curent device. CV, applications and activities lists can be exported.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="rounded-xl px-4.5 py-3.5 text-center text-base font-semibold text-white transition-opacity hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            style={{ backgroundColor: colors.primary }}
          >
            Start here
          </Link>
        </div>

        <p
          className="mt-10 mb-4 text-center"
          style={{ color: colors.textMuted }}
        >
          Work in progress. Features and functionality might change in the
          future.
        </p>
      </div>

      <a
        href="https://medium.com/@dimterion/documenting-the-process-of-making-a-mobile-app-working-on-individual-screens-cv-builder-3a2b0ceb5fb4?sharedUserId=dimterion"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
        style={{ color: colors.textMuted }}
      >
        More info
      </a>
    </div>
  );
}
