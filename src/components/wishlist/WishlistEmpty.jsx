
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";

export default function WishlistEmpty() {
  return (
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
        to save it here and revisit it whenever you're ready.
      </p>

      <Link
        href="/products"
        className="wishlist-browse-button"
      >
        Explore products
        <ArrowRight size={18} />
      </Link>

      <Link
        href="/products"
        className="wishlist-secondary-link"
      >
        Discover great local deals
      </Link>
    </section>
  );
}
