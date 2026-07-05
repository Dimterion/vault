import { useState, useMemo } from "react";
import { listings } from "../assets/data/listings";
import ListingItem from "../components/ListingItem";
import Button from "../components/Button";

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
    <main className="flex flex-col items-center gap-4">
      <h2 className="mt-2 text-2xl font-bold">Listings</h2>

      {tags.length > 0 && (
        <nav
          aria-label="Tag filters"
          className="flex flex-row flex-wrap justify-center gap-2"
        >
          <Button
            onClick={() => setActiveTag(null)}
            className={`cursor-pointer rounded px-4 py-2 transition-colors ${
              activeTag === null
                ? "bg-zinc-700 font-bold"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            All
          </Button>

          {tags.map((tag) => (
            <Button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`cursor-pointer rounded px-4 py-2 transition-colors ${
                activeTag === tag
                  ? "bg-zinc-700 font-bold"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              {tag}
            </Button>
          ))}
        </nav>
      )}

      <section className="flex w-full max-w-2xl flex-col gap-4 px-4 pb-4">
        {displayedListings.length > 0 ? (
          displayedListings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))
        ) : (
          <p className="text-center">No listings yet.</p>
        )}
      </section>
    </main>
  );
}
