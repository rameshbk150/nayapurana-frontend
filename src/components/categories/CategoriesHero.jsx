
import { Search, ArrowRight, Layers3 } from "lucide-react";

export default function CategoriesHero({
  search,
  onSearchChange,
  totalCategories,
}) {
  return (
    <section className="categories-hero">
      <div className="categories-hero-inner">
        <div className="categories-hero-content">
          <span className="categories-hero-badge">
            <Layers3 size={15} />
            THE SMARTER WAY TO SHOP
          </span>

          <h1>
            Discover More.
            <br />
            <span>Spend Less.</span>
          </h1>

          <p>
            Explore categories, find great deals and give pre-loved
            products a new home with NayaPurana.
          </p>

          <div className="categories-search">
            <Search size={21} className="categories-search-icon" />

            <input
              type="search"
              placeholder="What are you looking for?"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-label="Search product categories"
            />

            {search && (
              <button
                type="button"
                className="categories-search-clear"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          <div className="categories-hero-meta">
            <span>
              <strong>{totalCategories}</strong> categories to explore
            </span>
            <span className="categories-hero-dot" />
            <span>Find deals near you</span>
          </div>
        </div>

        <div className="categories-hero-art" aria-hidden="true">
          <div className="categories-art-circle">
            <div className="categories-art-card categories-art-card-one">
              <span className="categories-art-emoji">📱</span>
              <span>Electronics</span>
            </div>

            <div className="categories-art-card categories-art-card-two">
              <span className="categories-art-emoji">🛋️</span>
              <span>Home & Living</span>
            </div>

            <div className="categories-art-card categories-art-card-three">
              <span className="categories-art-emoji">👟</span>
              <span>Fashion</span>
            </div>

            <div className="categories-art-center">
              <Layers3 size={46} strokeWidth={1.6} />
            </div>

            <div className="categories-art-caption">
              <span>Good finds.</span>
              <strong>Better prices.</strong>
            </div>
          </div>

          <div className="categories-art-sparkle sparkle-one">✦</div>
          <div className="categories-art-sparkle sparkle-two">✧</div>
        </div>

        <a href="#all-categories" className="categories-hero-scroll">
          Explore categories <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
