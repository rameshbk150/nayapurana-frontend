
"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
  PackageSearch,
} from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import { productsData } from "@/data/productsData";
import { categoriesData } from "@/data/categoriesData";
import "@/style/category-details.css";

function normalize(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[-_&]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function CategoryDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="category-details-page">
          <div className="category-details-container">Loading category...</div>
        </main>
      }
    >
      <CategoryDetailsContent />
    </Suspense>
  );
}

function CategoryDetailsContent() {
  const params = useParams();
  const id = String(params.id || "");

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [condition, setCondition] = useState("all");

  const category = categoriesData.find(
    (item) =>
      item.slug === id ||
      item.id === id ||
      normalize(item.name) === normalize(id)
  );

  const categoryProducts = useMemo(() => {
    if (!category) return [];

    const categoryKeys = [
      category.id,
      category.slug,
      category.name,
    ].map(normalize);

    let result = productsData.filter((product) => {
      const productCategory = normalize(product.category);

      return categoryKeys.some(
        (key) =>
          productCategory === key ||
          productCategory.includes(key) ||
          key.includes(productCategory)
      );
    });

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        [
          product.title,
          product.description,
          product.location,
          product.category,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        )
      );
    }

    if (condition !== "all") {
      result = result.filter(
        (product) => product.condition === condition
      );
    }

    result = [...result];

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "discount") {
      result.sort((a, b) => {
        const discountA =
          a.originalPrice > a.price
            ? (a.originalPrice - a.price) / a.originalPrice
            : 0;

        const discountB =
          b.originalPrice > b.price
            ? (b.originalPrice - b.price) / b.originalPrice
            : 0;

        return discountB - discountA;
      });
    }

    return result;
  }, [category, search, sortBy, condition]);

  if (!category) {
    return (
      <main className="category-details-page">
        <section className="category-not-found">
          <PackageSearch size={48} strokeWidth={1.5} />

          <h1>Category Not Found</h1>

          <p>
            We couldn&apos;t find this category. Explore our other
            marketplace categories instead.
          </p>

          <Link href="/categories" className="category-back-button">
            <ArrowLeft size={17} />
            Browse All Categories
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="category-details-page">
      <section className="category-details-hero">
        <div className="category-details-container">
          <nav className="category-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/categories">Categories</Link>
            <span>/</span>
            <span aria-current="page">{category.name}</span>
          </nav>

          <Link
            href="/categories"
            className="category-back-link"
          >
            <ArrowLeft size={16} />
            All Categories
          </Link>

          <div className="category-details-heading">
            <div>
              <span className="category-details-eyebrow">
                EXPLORE NAYAPURANA
              </span>

              <h1>{category.name}</h1>

              <p>
                {category.description ||
                  `Discover great deals in ${category.name}.`}
              </p>
            </div>

            <div
              className="category-details-icon"
              aria-hidden="true"
            >
              {category.name}
            </div>
          </div>
        </div>
      </section>

      <section className="category-details-listing">
        <div className="category-details-container">
          <div className="category-toolbar">
            <div className="category-toolbar-title">
              <h2>Explore Products</h2>
              <span>
                {categoryProducts.length}{" "}
                {categoryProducts.length === 1
                  ? "item"
                  : "items"}
              </span>
            </div>

            <div className="category-toolbar-controls">
              <label className="category-search">
                <Search size={18} />

                <input
                  type="search"
                  placeholder="Search this category..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  aria-label="Search products in this category"
                />
              </label>

              <label className="category-select-control">
                <SlidersHorizontal size={16} />

                <select
                  value={condition}
                  onChange={(event) =>
                    setCondition(event.target.value)
                  }
                  aria-label="Filter by product condition"
                >
                  <option value="all">All conditions</option>
                  <option value="new">New</option>
                  <option value="used">Pre-owned</option>
                </select>
              </label>

              <label className="category-select-control">
                <ArrowUpDown size={16} />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  aria-label="Sort products"
                >
                  <option value="newest">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="title">Name: A to Z</option>
                </select>
              </label>
            </div>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="category-products-grid">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="category-products-empty">
              <div className="category-empty-icon">
                <PackageSearch size={34} />
              </div>

              <h3>No products found</h3>

              <p>
                {search || condition !== "all"
                  ? "Try changing your search or filters."
                  : `There are no products listed in ${category.name} yet.`}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCondition("all");
                  setSortBy("newest");
                }}
              >
                Clear Filters
              </button>

              <Link
                href="/categories"
                className="category-explore-link"
              >
                Explore Other Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
