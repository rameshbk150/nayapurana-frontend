"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Heart,
  ChevronDown,
  User,
  Plus,
} from "lucide-react";

import "../style/navbar.css";

export default function Navbar({ data }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  if (!data) return null;

  const {
    brand = {},
    navigation = [],
    actions = {},
    categories = [],
  } = data;

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================== */}
        <Link href="/" className="navbar-logo">
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name || "NayaPurana"}
              className="navbar-logo-image"
            />
          ) : (
            <div className="navbar-logo-text">
              <span className="navbar-brand-name">
                {brand.name}
              </span>

              {brand.tagline && (
                <span className="navbar-tagline">
                  {brand.tagline}
                </span>
              )}
            </div>
          )}
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <nav className="navbar-navigation">

          {navigation.map((item) => (
            <div
              key={item.label}
              className="navbar-nav-item-wrapper"
            >

              {item.dropdown ? (
                <button
                  type="button"
                  className="navbar-nav-link navbar-dropdown-button"
                  onClick={() =>
                    setCategoryOpen((prev) => !prev)
                  }
                >
                  {item.label}

                  <ChevronDown
                    size={16}
                    className={
                      categoryOpen
                        ? "navbar-chevron rotate"
                        : "navbar-chevron"
                    }
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={
                    item.highlight
                      ? "navbar-nav-link navbar-sell-link"
                      : "navbar-nav-link"
                  }
                >
                  {item.highlight && (
                    <Plus size={16} />
                  )}

                  {item.label}
                </Link>
              )}

              {/* =========================
                  CATEGORY DROPDOWN
              ========================== */}
              {item.dropdown && categoryOpen && (
                <div className="navbar-dropdown">

                  <div className="navbar-dropdown-header">
                    <span>Browse Categories</span>
                  </div>

                  <div className="navbar-dropdown-grid">

                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="navbar-category-link"
                        onClick={() =>
                          setCategoryOpen(false)
                        }
                      >
                        {category.name}
                      </Link>
                    ))}

                  </div>

                  <Link
                    href="/categories"
                    className="navbar-view-all"
                    onClick={() =>
                      setCategoryOpen(false)
                    }
                  >
                    View All Categories →
                  </Link>

                </div>
              )}

            </div>
          ))}

        </nav>

        {/* =========================
            DESKTOP ACTIONS
        ========================== */}
        <div className="navbar-actions">

          {/* Wishlist */}
          {actions.wishlist && (
            <Link
              href={actions.wishlist.href}
              className="navbar-icon-button"
              aria-label={actions.wishlist.label}
              title={actions.wishlist.label}
            >
              <Heart size={20} />
            </Link>
          )}

          {/* Login */}
          {actions.login && (
            <Link
              href={actions.login.href}
              className="navbar-login"
            >
              <User size={17} />
              {actions.login.label}
            </Link>
          )}

          {/* Register */}
          {actions.register && (
            <Link
              href={actions.register.href}
              className="navbar-register"
            >
              {actions.register.label}
            </Link>
          )}

        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() =>
            setMobileMenu((prev) => !prev)
          }
          aria-label={
            mobileMenu
              ? "Close menu"
              : "Open menu"
          }
        >
          {mobileMenu ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <div
        className={
          mobileMenu
            ? "navbar-mobile-menu active"
            : "navbar-mobile-menu"
        }
      >

        <div className="navbar-mobile-links">

          {navigation.map((item) => (
            <div
              key={item.label}
              className="navbar-mobile-item"
            >

              {item.dropdown ? (
                <>
                  <button
                    type="button"
                    className="navbar-mobile-link navbar-mobile-category-button"
                    onClick={() =>
                      setCategoryOpen((prev) => !prev)
                    }
                  >
                    <span>{item.label}</span>

                    <ChevronDown
                      size={17}
                      className={
                        categoryOpen
                          ? "navbar-chevron rotate"
                          : "navbar-chevron"
                      }
                    />
                  </button>

                  {categoryOpen && (
                    <div className="navbar-mobile-categories">

                      {categories.map(
                        (category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="navbar-mobile-category"
                            onClick={() =>
                              setMobileMenu(false)
                            }
                          >
                            {category.name}
                          </Link>
                        )
                      )}

                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={
                    item.highlight
                      ? "navbar-mobile-link navbar-mobile-sell"
                      : "navbar-mobile-link"
                  }
                  onClick={() =>
                    setMobileMenu(false)
                  }
                >
                  {item.highlight && (
                    <Plus size={17} />
                  )}

                  {item.label}
                </Link>
              )}

            </div>
          ))}

        </div>

        {/* Mobile actions */}
        <div className="navbar-mobile-actions">

          {actions.wishlist && (
            <Link
              href={actions.wishlist.href}
              className="navbar-mobile-action"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <Heart size={18} />
              {actions.wishlist.label}
            </Link>
          )}

          {actions.login && (
            <Link
              href={actions.login.href}
              className="navbar-mobile-action"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              <User size={18} />
              {actions.login.label}
            </Link>
          )}

          {actions.register && (
            <Link
              href={actions.register.href}
              className="navbar-mobile-register"
              onClick={() =>
                setMobileMenu(false)
              }
            >
              {actions.register.label}
            </Link>
          )}

        </div>

      </div>
    </header>
  );
}