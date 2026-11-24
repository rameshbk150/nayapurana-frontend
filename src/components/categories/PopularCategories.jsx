
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { categoriesData } from "@/data/categoriesData";
import CategoryGrid from "./CategoryGrid";

export default function PopularCategories() {
  const popularCategories = categoriesData.filter(
    (category) => category.popular
  );

  return (
    <section className="popular-categories-section">
      <div className="popular-categories-header">
        <div>
          <span className="categories-eyebrow">
            <Flame size={15} />
            TRENDING RIGHT NOW
          </span>

          <h2>Popular Categories</h2>

          <p>Start exploring the categories people love.</p>
        </div>

        <Link href="#all-categories" className="categories-text-link">
          View all <ArrowRight size={17} />
        </Link>
      </div>

      <CategoryGrid categories={popularCategories} />
    </section>
  );
}
