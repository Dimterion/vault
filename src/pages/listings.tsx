import { useState, useMemo } from "react";
import { listings } from "../assets/data/listings";

export default function ListingsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    return [...new Set(listings.flatMap((listing) => listing.tags || []))];
  }, []);

  const displayedListings = useMemo(() => {
    if (!activeTag) return listings;

    return listings.filter((listing) => listing.tags?.includes(activeTag));
  }, [activeTag]);

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Listings</h2>

      <nav aria-label="Tag filters" className="flex gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`cursor-pointer rounded px-4 py-2 transition-colors ${
            activeTag === null
              ? "bg-zinc-700 font-bold text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          All
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`cursor-pointer rounded px-4 py-2 transition-colors ${
              activeTag === tag
                ? "bg-zinc-700 font-bold text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </nav>

      <section className="flex w-full max-w-2xl flex-col gap-4">
        {displayedListings.map((listing) => (
          <article key={listing.id} className="rounded bg-zinc-800 p-4">
            <h3 className="text-lg font-bold">{listing.name}</h3>
            <p className="text-zinc-300">{listing.description}</p>
            <a
              href={listing.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-blue-400 hover:underline"
            >
              Link
            </a>

            <ul className="mt-3 flex flex-row flex-wrap gap-2">
              {listing.tags?.map((tag) => (
                <li
                  key={tag}
                  className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-200"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
