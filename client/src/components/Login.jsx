import { useState, useContext } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const validators = {
    email: (v) =>
      !v
        ? "Email required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Invalid email"
        : "",
    password: (v) => (!v ? "Password required" : ""),
  };

  const validateField = (name, value) => {
    const msg = validators[name] ? validators[name](value) : "";
    setErrors((prev) => ({ ...prev, [name]: msg }));
    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    validateField(name, value);
  };

  const isFormValid =
    form.email && form.password && Object.values(errors).every((m) => !m);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    let hasError = false;
    Object.entries(form).forEach(([k, v]) => {
      if (validateField(k, v)) hasError = true;
    });
    if (hasError) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
    } catch (err) {
      setServerError(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-12 max-w-sm space-y-5 rounded-xl bg-white/80 p-7 shadow-lg backdrop-blur hover:shadow-xl transition-shadow"
    >
      <h2 className="text-center text-3xl font-bold text-gray-800">
        Welcome Back
      </h2>

      {serverError && (
        <div
          className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 animate-fade-in"
          aria-live="assertive"
        >
          {serverError}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Email<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.email && errors.email)}
          className={`w-full rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            touched.email && errors.email
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300"
          }`}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <div className="min-h-[1.1rem] text-xs text-red-600" aria-live="polite">
          {touched.email && errors.email}
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Password<span className="ml-1 text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!(touched.password && errors.password)}
            className={`w-full rounded-md border px-3 py-2 pr-10 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              touched.password && errors.password
                ? "border-red-400 focus:ring-red-500"
                : "border-gray-300"
            }`}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-medium text-blue-600 hover:text-blue-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="min-h-[1.1rem] text-xs text-red-600" aria-live="polite">
          {touched.password && errors.password}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex select-none items-center gap-2 text-xs text-gray-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Remember me
        </label>
        <button
          type="button"
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className="group relative flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition enabled:hover:bg-blue-700 enabled:focus:outline-none enabled:focus:ring-2 enabled:focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
        )}
        <span className="translate-y-[1px] transition group-hover:-translate-y-[1px]">
          {loading ? "Signing in..." : "Sign In"}
        </span>
      </button>

      <p className="pt-2 text-center text-xs text-gray-500">
        Need an account?{" "}
        <span className="cursor-pointer text-blue-600 underline decoration-dotted underline-offset-2 hover:text-blue-700">
          Register
        </span>
      </p>
    </form>
  );
};

export default Login;
