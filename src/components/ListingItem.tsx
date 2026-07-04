type Listing = {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
};

type ListingItemProps = {
  listing: Listing;
};

export default function ListingItem({ listing }: ListingItemProps) {
  return (
    <article key={listing.id} className="rounded bg-zinc-800 p-4">
      <h3 className="text-lg font-bold">{listing.name}</h3>
      <p className="text-zinc-300">{listing.description}</p>
      <a
        href={listing.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-blue-400 hover:underline"
      >
        Link
      </a>

      <ul className="mt-3 flex flex-row flex-wrap gap-2">
        {listing.tags?.map((tag) => (
          <li
            key={tag}
            className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-200"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
