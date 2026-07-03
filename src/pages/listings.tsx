import { listings } from "../assets/data/listings";

export default function ListingsPage() {
  const tags = [
    ...new Set(
      listings.flatMap((listing) =>
        listing.tags.split(",").map((tag) => tag.trim()),
      ),
    ),
  ];

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Listings</h2>
      <section>
        {tags.map((tag) => (
          <button className="mx-2 cursor-pointer rounded bg-zinc-800 px-4 py-2 hover:bg-zinc-700">
            {tag}
          </button>
        ))}
      </section>
      <section className="flex w-full max-w-2xl flex-col gap-4">
        {listings.map((listing) => (
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
          </article>
        ))}
      </section>
    </main>
  );
}
