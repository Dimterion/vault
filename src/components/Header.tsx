import { Link } from "react-router";

export default function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/habit-tracker">Habit Tracker</Link>
    </nav>
  );
}
