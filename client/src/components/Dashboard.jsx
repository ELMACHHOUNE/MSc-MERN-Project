import { useContext, useEffect, useState } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user?.token) {
      api
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setProfile(res.data))
        .catch(() => logout());
    }
  }, [user, logout]);

  if (!user) return <h2 className="mt-12 text-center text-xl">Please login</h2>;

  return (
    <div className="mx-auto mt-12 max-w-xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-2 text-2xl font-semibold">Welcome {profile?.name}</h2>
      <p className="mb-6 text-gray-600">Email: {profile?.email}</p>
      <button
        onClick={logout}
        className="rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
