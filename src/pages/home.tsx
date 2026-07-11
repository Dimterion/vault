import { Link } from "react-router";
import Hero from "../components/Hero";
import placeholder from "../assets/images/placeholder.jpg";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">Vault</h2>
      <Hero
        title="Vault Items"
        text="See the list below."
        image={placeholder}
      />
      <Link to="/habit-tracker" className="hover:underline">
        Habit Tracker
      </Link>
      <Link to="/listings" className="hover:underline">
        Listings
      </Link>
    </main>
  );
}
