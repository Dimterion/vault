import { useState } from "react";
import { Link, NavLink } from "react-router";
import Button from "./Button";

export default function Header() {
  const [showNav, setShowNav] = useState(false);

  const active = "";
  const base = "text-gray-500 hover:text-white";

  return (
    <header className="relative flex flex-col justify-between bg-zinc-800 p-2 sm:flex-row sm:items-center">
      <h1 className="text-lg font-bold">
        <Link to="/">Vault</Link>
      </h1>
      <Button
        onClick={() => setShowNav(!showNav)}
        className="absolute top-0.5 right-0 sm:hidden"
      >
        {showNav ? "\u00D7" : "\u2630"}
      </Button>
      {showNav && (
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
      )}
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
