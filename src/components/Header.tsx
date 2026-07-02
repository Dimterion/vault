import { Link, NavLink } from "react-router";

export default function Header() {
  const active = "";
  const base = "text-gray-500 hover:text-white";

  return (
    <header className="flex flex-row items-center justify-between p-2">
      <h1 className="text-lg font-bold">
        <Link to="/">Vault</Link>
      </h1>
      <nav className="inline-flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active : base)}
        >
          Home
        </NavLink>
        <NavLink
          to="/habit-tracker"
          className={({ isActive }) => (isActive ? active : base)}
        >
          Habit Tracker
        </NavLink>
        <NavLink
          to="/listings"
          className={({ isActive }) => (isActive ? active : base)}
        >
          Listings
        </NavLink>
      </nav>
    </header>
  );
}
