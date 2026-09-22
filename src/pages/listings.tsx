import ListingCard from "../features/listings/ListingCard";
import { colors } from "../constants/colors";
import { listings } from "../features/listings/data";
import { useState } from "react";

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = listings.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const titleMatch = item.title.toLowerCase().includes(query);
    const descriptionMatch = item.description.toLowerCase().includes(query);
    const tagsMatch = item.tags?.some((tag) =>
      tag.toLowerCase().includes(query),
    );

    return titleMatch || descriptionMatch || tagsMatch;
  });

  return (
    <div
      className="px-4 py-8 md:px-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto max-w-3xl">
        <header className="relative mb-5">
          <h1
            className="mb-2 text-3xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            Job Listings ({filteredListings.length})
          </h1>

          <p className="text-base leading-6" style={{ color: "#4b5563" }}>
            Explore different companies and their potential career options.
          </p>

          <input
            type="text"
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-4 w-full rounded-xl border px-4 py-3 pr-10 text-[15px] transition outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#e5e7eb",
              color: "#111827",
            }}
          />
          <button
            type="button"
            className={`absolute right-3 bottom-3 ${
              searchQuery
                ? "cursor-pointer text-gray-500 hover:text-gray-700"
                : "pointer-events-none text-gray-300"
            }`}
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            disabled={!searchQuery}
          >
            ✕
          </button>
        </header>

        {filteredListings.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} item={listing} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-base" style={{ color: "#6b7280" }}>
              No listings found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
