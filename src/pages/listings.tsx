import { listings } from "../assets/data/listings";

export default function ListingsPage() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <h2 className="text-center text-2xl font-bold">Listings</h2>
      {listings.map((listing) => (
        <article key={listing.id}>
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
        </article>
      ))}
    </main>
  );
}
