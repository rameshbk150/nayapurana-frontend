
import { ArrowDownUp } from "lucide-react";

export default function ProductToolbar({
  count,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="product-toolbar">
      <p>
        <strong>{count}</strong>{" "}
        {count === 1 ? "product" : "products"} found
      </p>

      <label className="product-sort">
        <ArrowDownUp size={17} />

        <span>Sort by</span>

        <select
          aria-label="Sort products"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
        </select>
      </label>
    </div>
  );
}
