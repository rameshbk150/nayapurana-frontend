
import Hero from "@/components/hero";
import ProductCard from "@/components/products/ProductCard";
import { productsData } from "@/data/productsData";
import "@/style/hero.css";
import "@/style/products.css";

export default function Home() {
  const featuredProducts = productsData
    .filter((product) => product.featured)
    .slice(0, 8);

  return (
    <>
      <Hero />

      <section className="products-listing-section">
        <div className="products-container">
          <div className="products-listing-heading">
            <div>
              <span className="products-eyebrow">
                HANDPICKED FOR YOU
              </span>
              <h2>Featured Products</h2>
              <p>Discover great finds at prices you'll love.</p>
            </div>

            <a href="/products" className="products-view-all">
              View All Products →
            </a>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="products-home-empty">
              New featured products are coming soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
