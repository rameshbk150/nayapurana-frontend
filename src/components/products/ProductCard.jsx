
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Heart, ArrowUpRight } from "lucide-react";
import {
  getWishlistIds,
  saveWishlistIds,
  subscribeToWishlistChanges,
} from "@/utils/wishlist";

export default function ProductCard({ product }) {
  const productId = String(product.id);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    function syncFavorite() {
      setIsFavorite(getWishlistIds().includes(productId));
    }

    const timeoutId = setTimeout(syncFavorite, 0);
    const unsubscribe = subscribeToWishlistChanges(syncFavorite);

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [productId]);

  function toggleFavorite() {
    const wishlistIds = getWishlistIds();
    const nextWishlistIds = wishlistIds.includes(productId)
      ? wishlistIds.filter((id) => id !== productId)
      : [...wishlistIds, productId];

    saveWishlistIds(nextWishlistIds);
    setIsFavorite(nextWishlistIds.includes(productId));
  }

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <article className="product-card">
      <div className="product-card-image">
        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
        >
          <img
            src={product.image || "/images/products/placeholder.jpg"}
            alt={product.title}
            loading="lazy"
          />
        </Link>

        {product.featured && (
          <span className="product-featured-badge">Featured</span>
        )}

        {discount > 0 && (
          <span className="product-discount-badge">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          className={
            isFavorite
              ? "product-favorite-button product-favorite-active"
              : "product-favorite-button"
          }
          aria-label={
            isFavorite
              ? `Remove ${product.title} from wishlist`
              : `Save ${product.title} to wishlist`
          }
          aria-pressed={isFavorite}
          onClick={toggleFavorite}
        >
          <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-condition">
            {product.condition === "new" ? "New" : "Pre-owned"}
          </span>

          <span className="product-category">
            {product.category.replaceAll("-", " ")}
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="product-card-title"
        >
          {product.title}
        </Link>

        <div className="product-card-pricing">
          <strong>
            ₹{product.price.toLocaleString("en-IN")}
          </strong>

          {product.originalPrice > product.price && (
            <del>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </del>
          )}
        </div>

        <div className="product-card-footer">
          <span>
            <MapPin size={15} />
            {product.location}
          </span>

          <Link
            href={`/products/${product.id}`}
            className="product-card-link"
            aria-label={`View details for ${product.title}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
