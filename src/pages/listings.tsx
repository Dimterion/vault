import { useState } from "react";
import { listings } from "../assets/data/listings";

export default function ListingsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = [...new Set(listings.flatMap((listing) => listing.tags))];

  const displayedListings = activeTag
    ? listings.filter((listing) => listing.tags.includes(activeTag))
    : listings;

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Listings</h2>

      <section className="flex gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`cursor-pointer rounded px-4 py-2 ${
            activeTag === null
              ? "bg-zinc-700 font-bold"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          All
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`cursor-pointer rounded px-4 py-2 ${
              activeTag === tag
                ? "bg-zinc-700 font-bold"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </section>
      <section className="flex w-full max-w-2xl flex-col gap-4">
        {displayedListings.map((listing) => (
          <article key={listing.id} className="rounded bg-zinc-800 p-4">
            <h3 className="font-bold">{listing.name}</h3>
            <p>{listing.description}</p>
            <a
              href={listing.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Link
            </a>
            <section className="mt-2 flex flex-row gap-2">
              {listing.tags.map((tag) => (
                <pre key={tag} className="rounded bg-zinc-700 px-2 py-1">
                  {tag}
                </pre>
              ))}
            </section>
          </article>
        ))}
      </section>
    </main>
  );
}
