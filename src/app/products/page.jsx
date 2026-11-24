
"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, PackageOpen } from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import ProductToolbar from "@/components/products/ProductToolbar";
import { productsData, productCategories } from "@/data/productsData";

import "@/style/products.css";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = productsData.filter((product) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesCondition =
        condition === "all" || product.condition === condition;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCondition &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else {
      result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return result;
  }, [search, category, condition, minPrice, maxPrice, sortBy]);

  function resetFilters() {
    setSearch("");
    setCategory("all");
    setCondition("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  }

  return (
    <main className="products-page">
      <section className="products-hero">
        <div className="products-container">
          <div className="products-hero-content">
            <span className="products-eyebrow">
              BUY SMART. SELL EASY.
            </span>

            <h1>
              Find great deals on{" "}
              <span>pre-loved products.</span>
            </h1>

            <p>
              Discover affordable products from people around you.
              Give useful things a second life with NayaPurana.
            </p>

            <form
              className="products-search"
              onSubmit={(event) => event.preventDefault()}
            >
              <Search size={21} />

              <input
                type="search"
                placeholder="Search mobiles, furniture, bikes..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
              />

              <button type="submit">Search</button>
            </form>

            <div className="products-hero-points">
              <span>✓ Local listings</span>
              <span>✓ Great prices</span>
              <span>✓ Easy discovery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="products-main">
        <div className="products-container">
          <div className="products-section-heading">
            <div>
              <span className="products-section-eyebrow">
                EXPLORE MARKETPLACE
              </span>
              <h2>Products near you</h2>
              <p>
                Browse listings and find something worth bringing home.
              </p>
            </div>

            <button
              type="button"
              className="mobile-filter-button"
              onClick={() => setShowFilters((previous) => !previous)}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          <div className="products-layout">
            <aside
              className={`products-sidebar ${
                showFilters ? "products-sidebar-open" : ""
              }`}
            >
              <ProductFilters
                categories={productCategories}
                category={category}
                setCategory={setCategory}
                condition={condition}
                setCondition={setCondition}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onReset={resetFilters}
              />
            </aside>

            <div className="products-results">
              <ProductToolbar
                count={filteredProducts.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="products-empty">
                  <PackageOpen size={46} strokeWidth={1.5} />

                  <h3>No products found</h3>

                  <p>
                    Try a different search term or clear some filters.
                  </p>

                  <button type="button" onClick={resetFilters}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
