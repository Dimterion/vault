import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-2 space-y-4 bg-[#f5f7fb] text-slate-900">
      <h2 className="text-4xl font-bold">Page not found</h2>
      <p>Check your link or try refreshing the page.</p>
      <Link to="/" className="text-xl hover:underline">
        &#8592; Home page
      </Link>
    </div>
  );
}
