
"use client";

import { useMemo, useState } from "react";
import CategoriesHero from "@/components/categories/CategoriesHero";
import CategoryGrid from "@/components/categories/CategoryGrid";
import PopularCategories from "@/components/categories/PopularCategories";
import { categoriesData } from "@/data/categoriesData";
import "@/style/categories.css";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categoriesData;
    }

    return categoriesData.filter((category) =>
      [
        category.name,
        category.description,
        category.slug,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [search]);

  const filteredPopular = useMemo(() => {
    return filteredCategories.filter((category) => category.popular);
  }, [filteredCategories]);

  return (
    <main className="categories-page">
      <CategoriesHero
        search={search}
        onSearchChange={setSearch}
        totalCategories={categoriesData.length}
      />

      <div className="categories-container">
        {!search.trim() ? (
          <PopularCategories />
        ) : (
          <section className="popular-categories-section">
            <div className="popular-categories-header">
              <div>
                <span className="categories-eyebrow">
                  SEARCH RESULTS
                </span>
                <h2>Matching Categories</h2>
                <p>Categories matching "{search}"</p>
              </div>
            </div>

            <CategoryGrid categories={filteredPopular} />
          </section>
        )}

        <section
          className="categories-section"
          id="all-categories"
        >
          <div className="categories-section-header">
            <div>
              <span className="categories-eyebrow">
                EXPLORE NAYAPURANA
              </span>

              <h2>
                {search.trim()
                  ? "All Matching Categories"
                  : "Browse All Categories"}
              </h2>

              <p>
                Discover products, compare prices and find your next
                great deal.
              </p>
            </div>

            <span className="categories-count">
              {filteredCategories.length}{" "}
              {filteredCategories.length === 1
                ? "category"
                : "categories"}
            </span>
          </div>

          <CategoryGrid categories={filteredCategories} />

          {filteredCategories.length === 0 && (
            <div className="categories-empty">
              <h3>No categories found</h3>
              <p>
                Try a different keyword, such as mobiles, fashion
                or furniture.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
