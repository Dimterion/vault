import { useState } from "react";
import { Link, NavLink } from "react-router";
import { pages } from "../constants/pages";
import Button from "./Button";

export default function Header() {
  const [showNav, setShowNav] = useState(false);

  const active = "font-medium";
  const base = "text-gray-500 hover:text-white transition-colors";

  return (
    <header className="bg-zinc-800 px-4 py-3 sm:flex sm:items-center sm:justify-between sm:px-6">
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
        } mt-3 flex-wrap justify-center gap-2 sm:mt-0 sm:flex sm:flex-row sm:gap-4`}
      >
        {pages.map((link) => (
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
