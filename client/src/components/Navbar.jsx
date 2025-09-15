import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, MenuItem, HoveredLink } from "../components/ui/navbar-menu"; // adjust path if different
import { UserRound } from "lucide-react"; // new icon import
// If you have a cn utility, import it; otherwise simple join:
const cn = (...cls) => cls.filter(Boolean).join(" ");

const Brand = () => (
  <div className="flex items-center gap-2 font-semibold text-gray-200">
    <span className="text-blue-400">MERN</span> Demo
  </div>
);

const RouterLink = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        "text-sm transition",
        isActive
          ? "text-blue-500 font-medium"
          : "text-gray-300 hover:text-white"
      )
    }
  >
    {children}
  </NavLink>
);

const Navbar = ({ className }) => {
  const { user, logout } = useContext(AuthContext);
  const [active, setActive] = useState(null);

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-0 max-w-4xl mx-auto z-50 px-4",
        className
      )}
    >
      <div className="rounded-xl border border-transparent bg-[#344366] backdrop-blur shadow-lg">
        <div className="flex items-center justify-between px-4 pt-3">
          <Brand />
          <nav className="hidden sm:flex gap-6 text-sm">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
          </nav>
        </div>
        <Menu setActive={setActive} className="px-2 pb-2">
          <div className="flex gap-2">
            <MenuItem setActive={setActive} active={active} item="Links">
              <div className="flex flex-col space-y-3 text-sm">
                <HoveredLink href="https://github.com">GitHub</HoveredLink>
                <HoveredLink href="https://react.dev">React</HoveredLink>
                <HoveredLink href="https://tailwindcss.com">
                  Tailwind
                </HoveredLink>
              </div>
            </MenuItem>
          </div>
          {!user && (
            <MenuItem
              setActive={setActive}
              active={active}
              item="Auth"
              className="ml-auto"
              label={
                <span
                  className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 ring-1 ring-white/15 flex items-center justify-center text-slate-200"
                  aria-label="Authentication"
                >
                  <UserRound className="h-5 w-5" />
                </span>
              }
            >
              <div className="flex flex-col gap-2 text-sm min-w-[150px]">
                <RouterLink to="/login">
                  <span className="block rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-200 transition">
                    Login
                  </span>
                </RouterLink>
                <RouterLink to="/register">
                  <span className="block rounded-md px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 transition">
                    Register
                  </span>
                </RouterLink>
              </div>
            </MenuItem>
          )}
          {user && (
            <MenuItem
              setActive={setActive}
              active={active}
              item="App"
              className="ml-auto"
              label={
                <span
                  className="relative h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 ring-1 ring-white/20 flex items-center justify-center text-white text-sm font-semibold uppercase"
                  aria-label="User menu"
                >
                  {(user.username?.[0] || "").toUpperCase() || (
                    <UserRound className="h-5 w-5" />
                  )}
                </span>
              }
            >
              <div className="flex flex-col gap-2 text-sm min-w-[170px]">
                <div className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-slate-400">
                  Signed in as
                  <span className="block text-slate-200 font-medium text-sm mt-0.5">
                    {user.username || "User"}
                  </span>
                </div>
                <RouterLink to="/dashboard">
                  <span className="block rounded-md px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-200 transition">
                    Dashboard
                  </span>
                </RouterLink>
                <button
                  onClick={logout}
                  className="text-left rounded-md px-3 py-2 bg-red-500/15 hover:bg-red-500/25 text-red-300 transition"
                >
                  Logout
                </button>
              </div>
            </MenuItem>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
