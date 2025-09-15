import { NavLink, Outlet } from "react-router-dom";
import { useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);

  const navClass = useCallback(
    ({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:text-white hover:bg-gray-700"
      }`,
    []
  );

  return (
    <>
      <nav className="bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <div className="flex items-center gap-2 text-gray-200 font-semibold">
            <span className="text-blue-400">MERN</span> Demo
          </div>
          <div className="flex items-center gap-2">
            {!user && (
              <>
                <NavLink to="/register" className={navClass}>
                  Register
                </NavLink>
                <NavLink to="/login" className={navClass}>
                  Login
                </NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink to="/dashboard" className={navClass}>
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-red-600/80 transition bg-red-600/60"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
