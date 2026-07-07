export type Listing = {
  id: number;
  name: string;
  description: string;
  link: string;
  tags: string[];
};

type ListingDetailsProps = {
  listing: Listing;
  onClick?: () => void;
};

export default function ListingDetails({ listing }: ListingDetailsProps) {
  return (
    <article className="flex flex-col gap-2 px-2">
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
    </article>
  );
}
