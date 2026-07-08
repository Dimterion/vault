import { useState } from "react";
import { Link, NavLink } from "react-router";
import Button from "./Button";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/habit-tracker", label: "Habit Tracker" },
  { to: "/listings", label: "Listings" },
];

export default function Header() {
  const [showNav, setShowNav] = useState(false);

  const active = "font-medium";
  const base = "text-gray-500 hover:text-white transition-colors";

  return (
    <header className="bg-zinc-800 p-3 sm:flex sm:items-center sm:justify-between">
      {/* Top row: logo and mobile menu toggle */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">
          <Link to="/">Vault</Link>
        </h1>

        {/* Mobile menu toggle */}
        <Button
          onClick={() => setShowNav(!showNav)}
          className="p-1 text-xl sm:hidden"
          aria-expanded={showNav}
          aria-controls="mobile-navigation"
          aria-label={showNav ? "Close main menu" : "Open main menu"}
        >
          {showNav ? "\u00D7" : "\u2630"}
        </Button>
      </div>

      {/* Navigation */}
      <nav
        id="mobile-navigation"
        className={`${
          showNav ? "flex" : "hidden"
        } mt-3 flex-col gap-2 text-center sm:mt-0 sm:flex sm:flex-row sm:gap-4`}
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? active : base)}
            onClick={() => setShowNav(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
