
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  ChevronRight,
} from "lucide-react";

import { productsData } from "@/data/productsData";
import ProductCard from "@/components/products/ProductCard";
import {
  getWishlistIds,
  saveWishlistIds,
  subscribeToWishlistChanges,
} from "@/utils/wishlist";
import "@/style/product-details.css";

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="product-details-page">
          <div className="product-details-container">Loading product...</div>
        </main>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
}

function ProductDetailsContent() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;
  const product = productsData.find(
    (item) => String(item.id) === String(id)
  );

  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    function syncFavorite() {
      setIsFavorite(getWishlistIds().includes(String(id)));
    }

    const timeoutId = setTimeout(syncFavorite, 0);
    const unsubscribe = subscribeToWishlistChanges(syncFavorite);

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [id]);

  if (!product) {
    return (
      <main className="product-not-found">
        <Package size={54} strokeWidth={1.4} />

        <h1>Product not found</h1>

        <p>
          This listing may have been removed or is no longer available.
        </p>

        <Link href="/products" className="product-primary-button">
          Browse products
        </Link>
      </main>
    );
  }

  const images = [
    product.image || "/images/products/placeholder.jpg",
    ...(product.gallery || []),
  ];

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const categoryName = product.category.replaceAll("-", " ");

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in your listing "${product.title}" on NayaPurana. Is it still available?`
  );

  // Replace this with the seller's verified WhatsApp number from your API.
  const sellerWhatsApp = product.seller?.whatsapp || "";

  const relatedProducts = productsData
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    )
    .slice(0, 4);

  function contactSeller() {
    if (!sellerWhatsApp) {
      alert(
        "Seller contact details are not available for this sample listing yet."
      );
      return;
    }

    const number = sellerWhatsApp.replace(/\D/g, "");

    window.open(
      `https://wa.me/${number}?text=${whatsappMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function toggleFavorite() {
    const productId = String(product.id);
    const wishlistIds = getWishlistIds();
    const nextWishlistIds = wishlistIds.includes(productId)
      ? wishlistIds.filter((wishlistId) => wishlistId !== productId)
      : [...wishlistIds, productId];

    saveWishlistIds(nextWishlistIds);
    setIsFavorite(nextWishlistIds.includes(productId));
  }

  return (
    <main className="product-details-page">
      <div className="product-details-container">
        {/* Breadcrumbs */}
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={15} />

          <Link href="/products">Products</Link>
          <ChevronRight size={15} />

          <span>{product.title}</span>
        </nav>

        <button
          type="button"
          className="product-back-button"
          onClick={() => router.back()}
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <section className="product-details-grid">
          {/* Product image gallery */}
          <div className="product-gallery">
            <div className="product-main-image">
              <img
                src={images[activeImage]}
                alt={product.title}
                key={images[activeImage]}
              />

              {product.featured && (
                <span className="product-gallery-featured">
                  Featured listing
                </span>
              )}

              {discount > 0 && (
                <span className="product-gallery-discount">
                  {discount}% OFF
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="product-gallery-thumbnails">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    className={
                      activeImage === index
                        ? "product-thumbnail product-thumbnail-active"
                        : "product-thumbnail"
                    }
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={activeImage === index}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            )}

            <div className="product-gallery-note">
              <ShieldCheck size={19} />
              <div>
                <strong>Buy with confidence</strong>
                <p>
                  Inspect the product and confirm its condition before
                  completing your purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Product information */}
          <div className="product-information">
            <div className="product-detail-labels">
              <span className="product-detail-condition">
                {product.condition === "new" ? "Brand new" : "Pre-owned"}
              </span>

              <span className="product-detail-category">
                {categoryName}
              </span>
            </div>

            <h1>{product.title}</h1>

            <div className="product-detail-location">
              <MapPin size={17} />
              <span>{product.location}</span>
            </div>

            <div className="product-detail-price">
              <strong>
                ₹{product.price.toLocaleString("en-IN")}
              </strong>

              {product.originalPrice > product.price && (
                <>
                  <del>
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </del>

                  <span className="product-saving">
                    Save ₹
                    {(product.originalPrice - product.price).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </>
              )}
            </div>

            {discount > 0 && (
              <p className="product-discount-message">
                <Tag size={16} />
                {discount}% lower than the listed original price
              </p>
            )}

            <div className="product-detail-divider" />

            <div className="product-description">
              <h2>Product description</h2>
              <p>{product.description}</p>
            </div>

            <div className="product-specifications">
              <div>
                <Package size={19} />
                <span>Condition</span>
                <strong>
                  {product.condition === "new" ? "New" : "Pre-owned"}
                </strong>
              </div>

              <div>
                <MapPin size={19} />
                <span>Location</span>
                <strong>{product.location}</strong>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>Listing type</span>
                <strong>Local marketplace</strong>
              </div>
            </div>

            {/* Contact actions */}
            <div className="product-detail-actions">
              <button
                type="button"
                className="product-contact-button"
                onClick={contactSeller}
              >
                <MessageCircle size={20} />
                Contact seller on WhatsApp
              </button>

              <button
                type="button"
                className={
                  isFavorite
                    ? "product-save-button product-save-active"
                    : "product-save-button"
                }
                onClick={toggleFavorite}
                aria-label={
                  isFavorite
                    ? "Remove from favorites"
                    : "Save to favorites"
                }
                aria-pressed={isFavorite}
              >
                <Heart
                  size={20}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>
            </div>

            <p className="product-contact-disclaimer">
              <ShieldCheck size={15} />
              Meet safely, inspect the item, and agree on payment
              directly with the seller.
            </p>

            <div className="product-delivery-note">
              <Truck size={20} />
              <div>
                <strong>Arrange collection with the seller</strong>
                <p>
                  Confirm the pickup location and any delivery charges
                  before making payment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seller information */}
        <section className="product-seller-section">
          <div className="product-seller-icon">
            <ShoppingBag size={25} />
          </div>

          <div className="product-seller-copy">
            <span>SELLER INFORMATION</span>
            <h2>{product.seller?.name || "NayaPurana seller"}</h2>
            <p>
              Ask the seller about availability, product condition,
              and collection arrangements.
            </p>
          </div>

          <button
            type="button"
            className="product-seller-contact"
            onClick={contactSeller}
          >
            Contact seller
            <ArrowRight size={17} />
          </button>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <div className="related-products-heading">
              <div>
                <span>YOU MAY ALSO LIKE</span>
                <h2>Similar products</h2>
              </div>

              <Link href="/products">
                View all
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
