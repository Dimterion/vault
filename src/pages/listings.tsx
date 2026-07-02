import { listings } from "../assets/data/listings";

export default function ListingsPage() {
  return (
    <main>
      {listings.map((listing) => (
        <article key={listing.id}>{listing.name}</article>
      ))}
    </main>
  );
}
