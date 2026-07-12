import type { JobPlatform } from "../assets/data/platforms";
import { colors } from "../constants/colors";

type PlatformCardProps = {
  item: JobPlatform;
};

export default function PlatformCard({ item }: PlatformCardProps) {
  return (
    <article
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
      }}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="mb-4 h-37.5 w-full rounded-xl object-cover"
          loading="lazy"
        />
      ) : null}

      <h2
        className="mb-2 text-xl font-bold"
        style={{ color: colors.textPrimary }}
      >
        {item.title}
      </h2>

      <p
        className="mb-3 text-[15px] leading-5.5"
        style={{ color: colors.textSecondary }}
      >
        {item.description}
      </p>

      {item.tags && item.tags.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1.5 text-[13px] font-semibold"
              style={{
                backgroundColor: "#e8f0fe",
                color: "#1d4ed8",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <a
        href={item.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 block rounded-xl px-4 py-3 text-center text-[15px] font-semibold text-white transition-opacity hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        style={{ backgroundColor: colors.primary }}
      >
        Visit platform
      </a>

      {item.extraLinks && item.extraLinks.length > 0 ? (
        <div className="mt-1">
          {item.extraLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-sm font-medium hover:underline"
              style={{ color: colors.primary }}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
