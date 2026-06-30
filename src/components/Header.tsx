import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between p-2">
      <h1 className="text-lg font-bold">Vault</h1>
      <nav className="inline-flex gap-2">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/habit-tracker">Habit Tracker</NavLink>
      </nav>
    </header>
  );
}
