import ListingCard from "../features/listings/ListingCard";
import { colors } from "../constants/colors";
import { listings } from "../features/listings/data";

export default function ListingsPage() {
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
            Job Listings
          </h1>

          <p className="text-base leading-6" style={{ color: "#4b5563" }}>
            Explore different job search listings and learn what each one can
            offer.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} item={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
