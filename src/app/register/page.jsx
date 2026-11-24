
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

import "../../style/register.css";

export default function RegisterPage() {
  const [currentYear, setCurrentYear] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentYear(new Date().getFullYear());
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    agreeToTerms: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

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

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (
      formData.phone &&
      !/^[0-9]{10}$/.test(formData.phone)
    ) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }

    /*
     * Frontend validation is complete.
     * Connect your Express registration API here.
     *
     * Example endpoint:
     * POST /api/auth/register
     *
     * Do not treat local validation as account creation.
     */

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        setError(
          "Registration API is not configured yet. Please try again later."
        );
        return;
      }

      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to create your account."
        );
      }

      setSuccess(
        result.message ||
          "Your account has been created successfully. You can now log in."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "customer",
        agreeToTerms: false,
      });
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-shell">

        {/* Left branding panel */}
        <aside className="register-aside">
          <Link href="/" className="register-brand">
            <span className="register-brand-icon">
              <ShoppingBag size={25} />
            </span>

            <span className="register-brand-name">
              Naya<span>Purana</span>
            </span>
          </Link>

          <div className="register-aside-content">
            <span className="register-eyebrow">
              <Leaf size={15} />
              A smarter way to shop
            </span>

            <h1>
              Give products
              <br />
              <span>a second life.</span>
            </h1>

            <p>
              Discover great deals around you, sell things you
              no longer need, and make every purchase count.
            </p>

            <div className="register-benefits">
              <div className="register-benefit">
                <span className="register-benefit-icon">
                  <ShoppingBag size={19} />
                </span>

                <div>
                  <h3>Buy what you love</h3>
                  <p>Find products at prices you will love.</p>
                </div>
              </div>

              <div className="register-benefit">
                <span className="register-benefit-icon">
                  <Leaf size={19} />
                </span>

                <div>
                  <h3>Sell what you don't need</h3>
                  <p>Turn unused items into extra money.</p>
                </div>
              </div>

              <div className="register-benefit">
                <span className="register-benefit-icon">
                  <ShieldCheck size={19} />
                </span>

                <div>
                  <h3>Connect locally</h3>
                  <p>Discover products in your neighborhood.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="register-aside-footer">
            Buy <span>•</span> Sell <span>•</span> Reuse
          </p>
        </aside>

        {/* Registration form */}
        <section className="register-form-section">
          <div className="register-mobile-brand">
            <Link href="/" className="register-brand">
              <span className="register-brand-icon">
                <ShoppingBag size={23} />
              </span>

              <span className="register-brand-name">
                Naya<span>Purana</span>
              </span>
            </Link>
          </div>

          <div className="register-form-wrapper">
            <div className="register-heading">
              <span className="register-heading-label">
                GET STARTED FOR FREE
              </span>

              <h2>Create your account</h2>

              <p>
                Join NayaPurana and start buying and selling
                in your local community.
              </p>
            </div>

            <form
              className="register-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="register-field">
                <label htmlFor="register-name">
                  Full name <span>*</span>
                </label>

                <input
                  id="register-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="register-email">
                  Email address <span>*</span>
                </label>

                <input
                  id="register-email"
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

              <div className="register-field">
                <label htmlFor="register-phone">
                  Mobile number
                  <span className="register-optional">
                    Optional
                  </span>
                </label>

                <div className="register-phone-input">
                  <span className="register-phone-prefix">
                    +91
                  </span>

                  <input
                    id="register-phone"
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(event) => {
                      const digits = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setFormData((previous) => ({
                        ...previous,
                        phone: digits,
                      }));

                      setError("");
                      setSuccess("");
                    }}
                    autoComplete="tel-national"
                    inputMode="numeric"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-role">
                  I want to
                </label>

                <select
                  id="register-role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="customer">
                    Buy products
                  </option>

                  <option value="seller">
                    Buy and sell products
                  </option>
                </select>

                <p className="register-field-hint">
                  You can explore the marketplace and manage
                  your account after registration.
                </p>
              </div>

              <div className="register-field">
                <label htmlFor="register-password">
                  Password <span>*</span>
                </label>

                <div className="register-password-wrap">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    maxLength={128}
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
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

              <div className="register-field">
                <label htmlFor="register-confirm-password">
                  Confirm password <span>*</span>
                </label>

                <div className="register-password-wrap">
                  <input
                    id="register-confirm-password"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    name="confirmPassword"
                    placeholder="Enter your password again"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    maxLength={128}
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <label className="register-terms">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />

                <span>
                  I agree to the{" "}
                  <Link href="/terms">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </span>
              </label>

              {error && (
                <div
                  className="register-alert register-alert-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="register-alert register-alert-success"
                  role="status"
                >
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="register-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="register-spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={19} />
                  </>
                )}
              </button>

              <div className="register-divider">
                <span>Already part of NayaPurana?</span>
              </div>

              <p className="register-login-prompt">
                Already have an account?{" "}
                <Link href="/login">Log in</Link>
              </p>
            </form>

            <p className="register-security-note">
              <ShieldCheck size={15} />
              Your information is handled securely.
            </p>
          </div>

          <p className="register-copyright">
            © {currentYear} NayaPurana.
            Buy more thoughtfully.
          </p>
        </section>
      </div>
    </main>
  );
}
