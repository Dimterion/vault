type Listing = {
  id: number;
  name: string;
  description: string;
  link: string;
  tags: string[];
};

type ListingItemProps = {
  listing: Listing;
  onClick: () => void;
};

export default function ListingItem({ listing, onClick }: ListingItemProps) {
  return (
    <article onClick={onClick} className="rounded bg-zinc-800 p-4">
      <h3 className="text-lg font-bold">{listing.name}</h3>
      <p className="text-zinc-300">{listing.description}</p>
      <a
        href={listing.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block font-bold hover:underline"
      >
        Link &#x1F5D7;
      </a>

      <ul className="mt-3 flex flex-row flex-wrap gap-2">
        {listing.tags?.map((tag) => (
          <li key={tag} className="rounded bg-zinc-700 px-2 py-1 text-xs">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
