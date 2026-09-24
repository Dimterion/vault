import { useState, useMemo } from "react";
import ListingCard from "../features/listings/ListingCard";
import { colors } from "../constants/colors";
import { listings } from "../features/listings/data";

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    listings.forEach((listing) => {
      listing.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, []);

  const filteredListings = listings.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(query));

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => item.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

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

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <button
                className="flex items-center gap-2 rounded-xl border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                onClick={() => setShowTags(!showTags)}
                aria-expanded={showTags}
                aria-controls="tag-filters"
              >
                <span>
                  Filter by tags
                  {selectedTags.length > 0 && (
                    <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                      {selectedTags.length}
                    </span>
                  )}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transform transition-transform ${showTags ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {(selectedTags.length > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {showTags && (
              <div id="tag-filters" className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

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
