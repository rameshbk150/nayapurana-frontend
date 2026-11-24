
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Leaf,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import "../../style/login.css";

export default function LoginPage() {
  const [currentYear, setCurrentYear] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentYear(new Date().getFullYear());
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const email = formData.email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError("Login service is not configured.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Invalid email or password."
        );
      }

      /*
       * Authentication response depends on your backend.
       *
       * Prefer an HttpOnly, Secure cookie set by the backend.
       * If your API returns a token in JSON instead, adapt
       * this section to your actual authentication contract.
       */

      if (result.token) {
        // Temporary integration for a backend that returns a JWT.
        // For production, prefer an HttpOnly cookie.
        sessionStorage.setItem("token", result.token);
      }

      setSuccess("Login successful. Redirecting...");

      const role = result.user?.role || result.role;

      if (role === "seller") {
        window.location.assign("/seller");
      } else {
        window.location.assign("/");
      }
    } catch (err) {
      setError(
        err.message || "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-shell">

        {/* Left branding panel */}
        <aside className="login-aside">
          <Link href="/" className="login-brand">
            <span className="login-brand-icon">
              <ShoppingBag size={25} />
            </span>

            <span className="login-brand-name">
              Naya<span>Purana</span>
            </span>
          </Link>

          <div className="login-aside-content">
            <span className="login-eyebrow">
              <Leaf size={15} />
              Buy smarter. Live better.
            </span>

            <h1>
              Your next great
              <br />
              <span>find is waiting.</span>
            </h1>

            <p>
              Sign in to discover local deals, manage your
              listings, connect with sellers, and give
              pre-loved products a new home.
            </p>

            <div className="login-trust-card">
              <span className="login-trust-icon">
                <ShieldCheck size={21} />
              </span>

              <div>
                <h3>Your marketplace, your way</h3>
                <p>
                  Manage your account, products, and orders
                  from one convenient place.
                </p>
              </div>
            </div>
          </div>

          <p className="login-aside-footer">
            Buy <span>•</span> Sell <span>•</span> Reuse
          </p>
        </aside>

        {/* Login form */}
        <section className="login-form-section">
          <div className="login-mobile-brand">
            <Link href="/" className="login-brand">
              <span className="login-brand-icon">
                <ShoppingBag size={23} />
              </span>

              <span className="login-brand-name">
                Naya<span>Purana</span>
              </span>
            </Link>
          </div>

          <div className="login-form-wrapper">
            <div className="login-heading">
              <span className="login-heading-label">
                WELCOME BACK
              </span>

              <h2>Sign in to your account</h2>

              <p>
                Enter your details to continue to NayaPurana.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="login-field">
                <label htmlFor="login-email">
                  Email address
                </label>

                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>

              <div className="login-field">
                <label htmlFor="login-password">
                  Password
                </label>

                <div className="login-password-wrap">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    maxLength={128}
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <div className="login-form-options">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />

                  <span>Remember me</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="login-forgot-link"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div
                  className="login-alert login-alert-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="login-alert login-alert-success"
                  role="status"
                >
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

              <div className="login-divider">
                <span>NEW TO NAYAPURANA?</span>
              </div>

              <p className="login-register-prompt">
                Don't have an account?{" "}
                <Link href="/register">
                  Create an account
                </Link>
              </p>
            </form>

            <p className="login-security-note">
              <ShieldCheck size={15} />
              Your account information is handled securely.
            </p>
          </div>

          <p className="login-copyright">
            © {currentYear} NayaPurana.
            Buy more thoughtfully.
          </p>
        </section>
      </div>
    </main>
  );
}
