
import { SlidersHorizontal } from "lucide-react";

export default function ProductFilters({
  categories,
  category,
  setCategory,
  condition,
  setCondition,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onReset,
}) {
  return (
    <div className="product-filters">
      <div className="product-filters-heading">
        <h3>
          <SlidersHorizontal size={18} />
          Filters
        </h3>

        <button type="button" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="product-filter-group">
        <label htmlFor="product-category">Category</label>

        <select
          id="product-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="product-filter-group">
        <label htmlFor="product-condition">Condition</label>

        <select
          id="product-condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        >
          <option value="all">All conditions</option>
          <option value="new">New</option>
          <option value="used">Pre-owned</option>
        </select>
      </div>

      <div className="product-filter-group">
        <label>Price range (₹)</label>

        <div className="product-price-inputs">
          <input
            type="number"
            min="0"
            placeholder="Min"
            aria-label="Minimum price"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />

          <input
            type="number"
            min="0"
            placeholder="Max"
            aria-label="Maximum price"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </div>
      </div>

      <div className="product-filter-note">
        Compare prices and check the product details before buying.
      </div>
    </div>
  );
}
