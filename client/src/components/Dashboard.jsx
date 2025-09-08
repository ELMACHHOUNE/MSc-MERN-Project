import { useContext, useEffect, useState } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [error, setError] = useState("");

  const fetchProfile = () => {
    if (!user?.token) return;
    setLoading(true);
    setError("");
    api
      .get("/auth/me", { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => setProfile(res.data))
      .catch(() => {
        setError("Session expired");
        logout();
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (!user)
    return (
      <h2 className="mt-12 text-center text-xl text-gray-700">Please login</h2>
    );

  return (
    <div className="mx-auto mt-12 w-full max-w-xl animate-fade-in rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur">
      {loading ? (
        <div className="space-y-4">
          <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="mb-1 text-3xl font-bold text-gray-800">
              Welcome {profile?.name || "User"} 👋
            </h2>
            <p className="text-sm text-gray-600">
              Email: <span className="font-medium">{profile?.email}</span>
            </p>
          </div>

          {error && (
            <div className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={fetchProfile}
              disabled={loading}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Refresh
            </button>

            {!confirmLogout ? (
              <button
                onClick={() => setConfirmLogout(true)}
                className="rounded-md bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={logout}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setConfirmLogout(false)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
