
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MapPin,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { productsData } from "@/data/productsData";
import "@/style/wishlist.css";

const WISHLIST_KEY = "nayapurana-wishlist";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_KEY);

      if (storedWishlist) {
        const parsedWishlist = JSON.parse(storedWishlist);

        if (Array.isArray(parsedWishlist)) {
          setWishlistIds(
            parsedWishlist.filter((id) => typeof id === "string")
          );
        }
      }
    } catch (error) {
      console.error("Unable to load wishlist:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  function saveWishlist(nextIds) {
    setWishlistIds(nextIds);

    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(nextIds));
    } catch (error) {
      console.error("Unable to save wishlist:", error);
    }
  }

  function removeFromWishlist(productId) {
    saveWishlist(wishlistIds.filter((id) => id !== productId));
  }

  function clearWishlist() {
    saveWishlist([]);
    setShowClearConfirm(false);
  }

  const wishlistProducts = productsData.filter((product) =>
    wishlistIds.includes(String(product.id))
  );

  if (!isLoaded) {
    return (
      <main className="wishlist-page">
        <div className="wishlist-container">
          <div className="wishlist-loading">
            <Heart size={28} />
            <p>Loading your saved products...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <div className="wishlist-container">
        {/* Breadcrumb */}
        <nav className="wishlist-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>My Wishlist</span>
        </nav>

        {/* Page heading */}
        <section className="wishlist-hero">
          <div className="wishlist-heading-icon">
            <Heart size={27} />
          </div>

          <div className="wishlist-heading-content">
            <span className="wishlist-eyebrow">
              YOUR PERSONAL COLLECTION
            </span>

            <h1>My Wishlist</h1>

            <p>
              Keep the products you love in one place and come back
              to them whenever you're ready.
            </p>
          </div>

          <div className="wishlist-count-card">
            <span>Saved items</span>
            <strong>{wishlistProducts.length}</strong>
          </div>
        </section>

        {/* Wishlist toolbar */}
        {wishlistProducts.length > 0 && (
          <div className="wishlist-toolbar">
            <div>
              <h2>Your saved products</h2>
              <p>
                {wishlistProducts.length}{" "}
                {wishlistProducts.length === 1 ? "item" : "items"} saved
              </p>
            </div>

            <button
              type="button"
              className="wishlist-clear-button"
              onClick={() => setShowClearConfirm(true)}
            >
              <Trash2 size={16} />
              Clear wishlist
            </button>
          </div>
        )}

        {/* Clear confirmation */}
        {showClearConfirm && (
          <div
            className="wishlist-confirm-overlay"
            role="presentation"
            onClick={() => setShowClearConfirm(false)}
          >
            <section
              className="wishlist-confirm-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="wishlist-confirm-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="wishlist-confirm-icon">
                <Trash2 size={23} />
              </div>

              <h2 id="wishlist-confirm-title">
                Clear your wishlist?
              </h2>

              <p>
                This will remove all saved products from this browser.
              </p>

              <div className="wishlist-confirm-actions">
                <button
                  type="button"
                  className="wishlist-cancel-button"
                  onClick={() => setShowClearConfirm(false)}
                >
                  Keep items
                </button>

                <button
                  type="button"
                  className="wishlist-confirm-delete"
                  onClick={clearWishlist}
                >
                  Clear wishlist
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Saved products */}
        {wishlistProducts.length > 0 ? (
          <section className="wishlist-grid" aria-label="Saved products">
            {wishlistProducts.map((product) => {
              const discount =
                product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;

              return (
                <article
                  className="wishlist-card"
                  key={product.id}
                >
                  <div className="wishlist-card-image">
                    <Link href={`/products/${product.id}`}>
                      <img
                        src={
                          product.image ||
                          "/images/products/placeholder.jpg"
                        }
                        alt={product.title}
                        loading="lazy"
                      />
                    </Link>

                    {discount > 0 && (
                      <span className="wishlist-discount">
                        {discount}% OFF
                      </span>
                    )}

                    <button
                      type="button"
                      className="wishlist-remove-icon"
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.title} from wishlist`}
                      title="Remove from wishlist"
                    >
                      <Heart size={19} fill="currentColor" />
                    </button>
                  </div>

                  <div className="wishlist-card-body">
                    <div className="wishlist-card-labels">
                      <span className="wishlist-condition">
                        {product.condition === "new"
                          ? "New"
                          : "Pre-owned"}
                      </span>

                      <span className="wishlist-category">
                        {product.category.replaceAll("-", " ")}
                      </span>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="wishlist-product-title"
                    >
                      {product.title}
                    </Link>

                    <p className="wishlist-product-description">
                      {product.description}
                    </p>

                    <div className="wishlist-price-row">
                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>

                      {product.originalPrice > product.price && (
                        <del>
                          ₹
                          {product.originalPrice.toLocaleString("en-IN")}
                        </del>
                      )}
                    </div>

                    <div className="wishlist-location">
                      <MapPin size={15} />
                      <span>{product.location}</span>
                    </div>

                    <div className="wishlist-card-actions">
                      <Link
                        href={`/products/${product.id}`}
                        className="wishlist-view-button"
                      >
                        View product
                        <ArrowRight size={17} />
                      </Link>

                      <button
                        type="button"
                        className="wishlist-remove-text"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label={`Remove ${product.title}`}
                        title="Remove product"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          /* Empty wishlist */
          <section className="wishlist-empty">
            <div className="wishlist-empty-illustration">
              <ShoppingBag size={43} strokeWidth={1.4} />
              <span>
                <Heart size={21} fill="currentColor" />
              </span>
            </div>

            <span className="wishlist-empty-eyebrow">
              YOUR COLLECTION STARTS HERE
            </span>

            <h2>No saved products yet</h2>

            <p>
              Found something you like? Tap the heart on any product
              to save it here for later.
            </p>

            <Link
              href="/products"
              className="wishlist-browse-button"
            >
              Explore products
              <ArrowRight size={18} />
            </Link>

            <Link href="/products" className="wishlist-secondary-link">
              Discover great local deals
            </Link>
          </section>
        )}

        {/* Bottom discovery banner */}
        {wishlistProducts.length > 0 && (
          <section className="wishlist-discovery-banner">
            <div className="wishlist-discovery-icon">
              <ShoppingBag size={25} />
            </div>

            <div>
              <h2>Still looking for something?</h2>
              <p>
                Explore more listings and discover your next great find.
              </p>
            </div>

            <Link href="/products">
              Browse products
              <ArrowRight size={17} />
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
