import { NavLink, Outlet } from "react-router-dom";
import { useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

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
      <Navbar />
      <main className="mx-auto max-w-5xl p-4 pt-40">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
