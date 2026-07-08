import { useState } from "react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const [showNav, setShowNav] = useState(false);

  const active = "";
  const base = "text-gray-500 hover:text-white";

  return (
    <header className="flex flex-col sm:items-center justify-between bg-zinc-800 p-2 sm:flex-row">
      <h1 className="text-lg font-bold">
        <Link to="/">Vault</Link>
      </h1>
      <nav className="flex flex-row flex-wrap justify-center gap-2 sm:hidden">
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
      <nav className="hidden gap-2 sm:inline-flex">
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
