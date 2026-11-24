
"use client";

import Link from "next/link";
import {
  MapPin,
  Pencil,
  Tag,
  CalendarDays,
} from "lucide-react";

export default function SellerProductCard({
  product,
  onDelete,
}) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const formatCondition = (condition) => {
    const labels = {
      new: "Brand New",
      "like-new": "Like New",
      good: "Good",
      fair: "Fair",
    };

    return labels[condition] || condition;
  };

  return (
    <article className="seller-product-card">
      <Link
        href={`/products/${product.id}`}
        className="seller-product-image-link"
      >
        <div className="seller-product-image">
          <img
            src={product.image || "/images/products/placeholder.png"}
            alt={product.title}
          />
        </div>
      </Link>

      <div className="seller-product-content">
        <div className="seller-product-topline">
          <span className="seller-product-category">
            {product.category.replaceAll("-", " ")}
          </span>

          <span
            className={`sell-status ${
              product.status.toLowerCase() === "sold"
                ? "sell-status-sold"
                : "sell-status-active"
            }`}
          >
            {product.status}
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="seller-product-title"
        >
          {product.title}
        </Link>

        <div className="seller-product-price">
          {formatPrice(product.price)}

          {product.originalPrice > product.price && (
            <span>{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div className="seller-product-meta">
          <span>
            <Tag size={14} />
            {formatCondition(product.condition)}
          </span>

          <span>
            <MapPin size={14} />
            {product.locality}, {product.city}
          </span>
        </div>

        <div className="seller-product-date">
          <CalendarDays size={14} />
          Listed {product.createdAt}
        </div>

        <div className="seller-product-actions">
          <Link
            href={`/sell/${product.id}/edit`}
            className="seller-edit-button"
          >
            <Pencil size={15} />
            Edit listing
          </Link>

          {product.status !== "Sold" && (
            <button
              type="button"
              className="seller-delete-button"
              onClick={() => onDelete?.(product.id)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
