import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/habit-tracker">Habit Tracker</Link>
    </header>
  );
}
