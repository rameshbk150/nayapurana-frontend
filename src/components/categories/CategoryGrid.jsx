
import CategoryCard from "./CategoryCard";

export default function CategoryGrid({ categories = [] }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
}
