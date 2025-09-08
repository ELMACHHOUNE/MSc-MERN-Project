import { useState, useContext } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const validators = {
    name: (v) =>
      !v ? "Name required" : v.length < 2 ? "Too short (min 2 chars)" : "",
    email: (v) =>
      !v
        ? "Email required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Invalid email"
        : "",
    password: (v) =>
      !v ? "Password required" : v.length < 6 ? "Min length 6" : "",
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

  const getPasswordStrength = (pw) => {
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[!@#$%^&*]/.test(pw)) score++;
    return score; // 0-4
  };
  const strength = getPasswordStrength(form.password);
  const strengthLabels = ["Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-600",
  ];

  const isFormValid =
    Object.values(form).every(Boolean) &&
    Object.values(errors).every((m) => !m);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    // Final validation
    let hasError = false;
    Object.entries(form).forEach(([k, v]) => {
      if (validateField(k, v)) hasError = true;
    });
    if (hasError) return;
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      login(res.data);
    } catch (err) {
      setServerError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-12 max-w-sm space-y-5 rounded-xl bg-white/80 p-7 shadow-lg backdrop-blur transition-shadow hover:shadow-xl"
      noValidate
    >
      <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Create Account
      </h2>

      {serverError && (
        <div
          className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 animate-fade-in"
          aria-live="assertive"
        >
          {serverError}
        </div>
      )}

      {/* Name */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Name<span className="ml-1 text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!(touched.name && errors.name)}
          className={`w-full rounded-md border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            touched.name && errors.name
              ? "border-red-400 focus:ring-red-500"
              : "border-gray-300"
          }`}
          placeholder="Jane Doe"
        />
        <div className="min-h-[1.1rem] text-xs text-red-600" aria-live="polite">
          {touched.name && errors.name}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Email
          <span className="ml-1 text-red-500">*</span>
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
          Password
          <span className="ml-1 text-red-500">*</span>
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
            autoComplete="new-password"
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
        <div className="mt-1">
          <div className="h-2 w-full rounded bg-gray-200">
            <div
              className={`h-2 rounded ${strengthColors[strength]} transition-all`}
              style={{ width: `${(strength / 4) * 100}%` }}
            />
          </div>
          <p
            className="mt-1 text-[10px] font-medium uppercase tracking-wide text-gray-500"
            aria-live="polite"
          >
            {form.password
              ? `Strength: ${strengthLabels[strength]}`
              : "Enter a password"}
          </p>
        </div>
        <div className="min-h-[1.1rem] text-xs text-red-600" aria-live="polite">
          {touched.password && errors.password}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || loading}
        className="group relative flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow transition enabled:hover:shadow-md enabled:focus:outline-none enabled:focus:ring-2 enabled:focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
        )}
        <span className="translate-y-[1px] transition group-hover:-translate-y-[1px]">
          {loading ? "Creating..." : "Sign Up"}
        </span>
      </button>

      <p className="pt-2 text-center text-xs text-gray-500">
        By registering you agree to our{" "}
        <span className="cursor-pointer text-blue-600 underline decoration-dotted underline-offset-2 hover:text-blue-700">
          terms
        </span>
        .
      </p>
    </form>
  );
};

export default Register;
