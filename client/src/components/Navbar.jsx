import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, MenuItem, HoveredLink } from "../components/ui/navbar-menu"; // adjust path if different
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
      <div className="rounded-xl border border-gray-800/60 bg-gray-900/70 backdrop-blur shadow-lg">
        <div className="flex items-center justify-between px-4 pt-3">
          <Brand />
        </div>
        <Menu setActive={setActive} className="px-2 pb-2">
          {!user && (
            <MenuItem setActive={setActive} active={active} item="Auth">
              <div className="flex flex-col space-y-3 text-sm">
                <RouterLink to="/register">Register</RouterLink>
                <RouterLink to="/login">Login</RouterLink>
              </div>
            </MenuItem>
          )}
          {user && (
            <MenuItem setActive={setActive} active={active} item="App">
              <div className="flex flex-col space-y-3 text-sm">
                <RouterLink to="/dashboard">Dashboard</RouterLink>
                <button
                  onClick={logout}
                  className="text-left text-red-400 hover:text-red-300 text-sm"
                >
                  Logout
                </button>
              </div>
            </MenuItem>
          )}
          <MenuItem setActive={setActive} active={active} item="Links">
            <div className="flex flex-col space-y-3 text-sm">
              <HoveredLink href="https://github.com">GitHub</HoveredLink>
              <HoveredLink href="https://react.dev">React</HoveredLink>
              <HoveredLink href="https://tailwindcss.com">Tailwind</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
