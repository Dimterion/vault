import { useMemo, useState } from "react";
import PlatformCard from "../features/platforms/PlatformCard";
import { colors } from "../constants/colors";
import { platforms } from "../features/platforms/data";

export default function PlatformsPage() {
  const [showTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();

    platforms.forEach((platform) => {
      platform.tags?.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  }, []);

  const filteredPlatforms = platforms.filter((platform) => {
    return (
      selectedTags.length === 0 ||
      selectedTags.every((tag) => platform.tags?.includes(tag))
    );
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  };

  const handleTagClick = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      toggleTag(tag);
      setShowTags(true);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  return (
    <div
      className="px-4 py-8 md:px-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-5">
          <h1
            className="mb-2 text-3xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            Job Platforms ({filteredPlatforms.length})
          </h1>

          <p className="text-base leading-6" style={{ color: "#4b5563" }}>
            Explore different job search platforms and learn what each one can
            offer.
          </p>
        </header>

        {allTags.length > 0 && (
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                onClick={() => setShowTags(!showTags)}
                aria-expanded={showTags}
                aria-controls="platform-tag-filters"
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
                  className={`transform transition-transform ${
                    showTags ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {showTags && (
              <div id="platform-tag-filters" className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
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

        {filteredPlatforms.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredPlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                item={platform}
                selectedTags={selectedTags}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-base" style={{ color: "#6b7280" }}>
              No platforms found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
