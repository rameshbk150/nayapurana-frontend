
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Smartphone,
  Sofa,
  Shirt,
  Bike,
  Sparkles,
} from "lucide-react";

const quickCategories = [
  { label: "Mobiles", icon: Smartphone, href: "/categories/mobiles" },
  { label: "Furniture", icon: Sofa, href: "/categories/home-furniture" },
  { label: "Fashion", icon: Shirt, href: "/categories/fashion" },
  { label: "Vehicles", icon: Bike, href: "/categories/cars-bikes" },
];

export default function Hero() {
  const [search, setSearch] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      window.location.href = "/products";
      return;
    }

    window.location.href = `/products?search=${encodeURIComponent(query)}`;
  }

  return (
    <section className="market-hero">
      <div className="market-hero-container">
        <div className="market-hero-content">
          <div className="market-hero-badge">
            <Sparkles size={15} />
            <span>YOUR LOCAL MARKETPLACE</span>
          </div>

          <h1>
            Give It a New Life.
            <br />
            <span>Find Your Next Treasure.</span>
          </h1>

          <p className="market-hero-description">
            Buy and sell pre-loved treasures around you. Discover
            amazing deals on everyday essentials with NayaPurana.
          </p>

          <form className="market-hero-search" onSubmit={handleSearch}>
            <Search size={21} className="market-search-icon" />

            <input
              type="search"
              placeholder="What are you looking for?"
              aria-label="Search products"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          <div className="market-hero-location">
            <MapPin size={15} />
            <span>Discover deals in your neighbourhood</span>
          </div>

          <div className="market-hero-actions">
            <Link href="/categories" className="market-btn-primary">
              Explore Categories
              <ArrowRight size={17} />
            </Link>

            <Link href="/sell" className="market-btn-secondary">
              Sell an Item
            </Link>
          </div>

          <div className="market-hero-trust">
            <div className="market-trust-icon">
              <ShieldCheck size={20} />
            </div>

            <div>
              <strong>Shop smarter. Waste less.</strong>
              <span>Give useful things another chance.</span>
            </div>
          </div>
        </div>

        <div className="market-hero-visual">
          <div className="market-visual-orb" />

          <div className="market-visual-label market-label-top">
            <span className="market-label-dot" />
            Great finds near you
          </div>

          <div className="market-product-showcase">
            <div className="market-showcase-top">
              <span className="market-showcase-tag">
                <Sparkles size={13} />
                PRE-LOVED, RE-LOVED
              </span>

              <span className="market-showcase-heart">♥</span>
            </div>

            <div className="market-showcase-illustration">
              <div className="market-illustration-circle">
                <span className="market-emoji-phone">📱</span>
                <span className="market-emoji-sofa">🛋️</span>
                <span className="market-emoji-sneaker">👟</span>
                <span className="market-emoji-lamp">💡</span>
              </div>
            </div>

            <div className="market-showcase-bottom">
              <div>
                <span className="market-showcase-caption">
                  A WORLD OF POSSIBILITIES
                </span>
                <h2>Good things deserve a second home.</h2>
              </div>

              <Link
                href="/products"
                className="market-showcase-arrow"
                aria-label="Browse products"
              >
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          <div className="market-floating-card market-floating-savings">
            <span className="market-floating-icon">♻️</span>
            <div>
              <strong>Buy better</strong>
              <span>Give items a second life</span>
            </div>
          </div>

          <div className="market-floating-card market-floating-local">
            <MapPin size={17} />
            <div>
              <strong>Shop local</strong>
              <span>Discover nearby finds</span>
            </div>
          </div>

          <div className="market-visual-sparkle market-sparkle-one">✦</div>
          <div className="market-visual-sparkle market-sparkle-two">✧</div>
        </div>

        <div className="market-hero-categories">
          <span className="market-quick-label">QUICK EXPLORE</span>

          {quickCategories.map(({ label, icon: Icon, href }) => (
            <Link href={href} key={label} className="market-quick-category">
              <span className="market-quick-icon">
                <Icon size={18} />
              </span>
              <span>{label}</span>
              <ArrowRight size={14} className="market-quick-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
