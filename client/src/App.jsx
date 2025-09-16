import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import BackgroundBoxes from "./components/BackgroundBoxes";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Lazy-loaded pages
const Register = lazy(() => import("./components/Register"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Small component to handle root redirect logic
const RootRedirect = () => {
  const { user } = useContext(AuthContext);
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <BackgroundBoxes>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<RootRedirect />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </BackgroundBoxes>
  );
}

export default App;
