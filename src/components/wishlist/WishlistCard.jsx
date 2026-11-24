
"use client";

import Link from "next/link";
import {
  Heart,
  MapPin,
  Trash2,
  ArrowRight,
  Tag,
} from "lucide-react";

export default function WishlistCard({ product, onRemove }) {
  if (!product) return null;

  const {
    id,
    title,
    description,
    category,
    condition,
    price,
    originalPrice,
    location,
    image,
  } = product;

  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <article className="wishlist-card">
      {/* Product Image */}
      <div className="wishlist-card-image">
        <Link
          href={`/products/${id}`}
          aria-label={`View ${title}`}
        >
          <img
            src={image || "/images/products/placeholder.jpg"}
            alt={title}
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
          onClick={() => onRemove?.(id)}
          aria-label={`Remove ${title} from wishlist`}
          title="Remove from wishlist"
        >
          <Heart size={19} fill="currentColor" />
        </button>
      </div>

      {/* Product Information */}
      <div className="wishlist-card-body">
        <div className="wishlist-card-labels">
          <span className="wishlist-condition">
            {condition === "new" ? "New" : "Pre-owned"}
          </span>

          <span className="wishlist-category">
            {category?.replaceAll("-", " ")}
          </span>
        </div>

        <Link
          href={`/products/${id}`}
          className="wishlist-product-title"
        >
          {title}
        </Link>

        <p className="wishlist-product-description">
          {description}
        </p>

        {/* Price */}
        <div className="wishlist-price-row">
          <strong>
            ₹{Number(price || 0).toLocaleString("en-IN")}
          </strong>

          {originalPrice > price && (
            <del>
              ₹{Number(originalPrice).toLocaleString("en-IN")}
            </del>
          )}
        </div>

        {discount > 0 && (
          <p className="wishlist-saving">
            <Tag size={13} />
            Save ₹
            {(originalPrice - price).toLocaleString("en-IN")}
          </p>
        )}

        {/* Location */}
        <div className="wishlist-location">
          <MapPin size={15} />
          <span>{location || "Location not specified"}</span>
        </div>

        {/* Actions */}
        <div className="wishlist-card-actions">
          <Link
            href={`/products/${id}`}
            className="wishlist-view-button"
          >
            View product
            <ArrowRight size={17} />
          </Link>

          <button
            type="button"
            className="wishlist-remove-text"
            onClick={() => onRemove?.(id)}
            aria-label={`Delete ${title} from wishlist`}
            title="Remove product"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
