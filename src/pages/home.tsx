import { Link } from "react-router";

export default function HomePage() {
  return (
    <div>
      <h1>Vault</h1>
      <Link to="/habit-tracker">Habit Tracker</Link>
    </div>
  );
}
