import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <Link to="/" className="hover:underline">
        Home page
      </Link>
    </section>
  );
}
