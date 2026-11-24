
"use client";

import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Shirt,
  Sofa,
  CarFront,
  Refrigerator,
  Dumbbell,
  BookOpen,
  Blocks,
  Sparkles,
  Wrench,
  Package,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  Smartphone,
  Laptop,
  Shirt,
  Sofa,
  CarFront,
  Refrigerator,
  Dumbbell,
  BookOpen,
  Blocks,
  Sparkles,
  Wrench,
  Package,
};

export default function CategoryCard({ category }) {
  const Icon = iconMap[category.icon] || Package;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="category-card"
      aria-label={`Browse ${category.name}`}
    >
      <div
        className="category-card-icon"
        style={{ "--category-color": category.color }}
      >
        <Icon size={29} strokeWidth={1.7} />
      </div>

      <div className="category-card-content">
        <h3>{category.name}</h3>
        <p>{category.description}</p>

        <span className="category-product-count">
          {category.productCount} listings
        </span>
      </div>

      <span className="category-card-arrow">
        <ArrowUpRight size={19} />
      </span>
    </Link>
  );
}
