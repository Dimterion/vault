import PlatformCard from "../components/PlatformCard";
import { colors } from "../constants/colors";
import { platforms } from "../assets/data/platforms";

export default function PlatformsPage() {
  return (
    <section
      className="px-4 py-8 md:px-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-5">
          <h1
            className="mb-2 text-3xl font-bold"
            style={{ color: colors.textPrimary }}
          >
            Job Platforms
          </h1>

          <p className="text-base leading-6" style={{ color: "#4b5563" }}>
            Explore different job search platforms and learn what each one can
            offer.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {platforms.map((platform) => (
            <PlatformCard key={platform.id} item={platform} />
          ))}
        </div>
      </div>
    </section>
  );
}
