import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
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
