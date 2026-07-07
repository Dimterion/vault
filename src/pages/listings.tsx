import { useState, useMemo } from "react";
import { listings } from "../assets/data/listings";
import ListingItem, { type Listing } from "../components/ListingItem";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ListingDetails from "../components/ListingDetails";

export default function ListingsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [numberOfListings, setNumberOfListings] = useState(3);
  const [modal, setModal] = useState<Listing | null>(null);

  const tags = useMemo(() => {
    return [...new Set(listings.flatMap((listing) => listing.tags || []))];
  }, []);

  const filteredListings = useMemo(() => {
    if (!activeTag) return listings;

    return listings.filter((listing) => listing.tags?.includes(activeTag));
  }, [activeTag]);

  const displayedListings = useMemo(() => {
    return filteredListings.slice(0, numberOfListings);
  }, [filteredListings, numberOfListings]);

  const handleTagChange = (tag: string | null) => {
    setActiveTag(tag);
    setNumberOfListings(3);
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="my-4 text-2xl font-bold">Listings</h2>

      {tags.length > 0 && (
        <nav
          aria-label="Tag filters"
          className="mb-4 flex flex-row flex-wrap justify-center gap-2"
        >
          <Button
            onClick={() => handleTagChange(null)}
            className={` ${
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
              onClick={() => handleTagChange(tag)}
              className={`${
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
            <ListingItem
              key={listing.id}
              listing={listing}
              onClick={() => setModal(listing)}
            />
          ))
        ) : (
          <p className="text-center">No listings yet.</p>
        )}
      </section>

      {numberOfListings < filteredListings.length && (
        <Button
          onClick={() => setNumberOfListings((prev) => prev + 3)}
          className="mb-4"
        >
          Show more listings
        </Button>
      )}

      {modal && (
        <Modal onClose={() => setModal(null)}>
          <ListingDetails key={modal.id} listing={modal} />
        </Modal>
      )}
    </main>
  );
}
