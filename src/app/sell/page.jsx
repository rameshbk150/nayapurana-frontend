
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, PackagePlus, Boxes } from "lucide-react";

import sellData, { sampleListings } from "@/data/sellData";
import SellPageHeader from "@/components/sell/SellPageHeader";
import SellerProductCard from "@/components/sell/SellerProductCard";
import "../../style/sell.css";

export default function SellPage() {
  const [products, setProducts] = useState(sampleListings);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesStatus =
        status === "All" || product.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [products, search, status]);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Remove this listing from the current view?"
    );

    if (!confirmed) return;

    // Demo-only behavior. Connect to DELETE /api/products/:id.
    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );
  };

  const activeCount = products.filter(
    (product) => product.status === "Active"
  ).length;

  const soldCount = products.filter(
    (product) => product.status === "Sold"
  ).length;

  const stats = [
    { label: "Active listings", value: activeCount, icon: "active" },
    { label: "Items sold", value: soldCount, icon: "sold" },
    { label: "Total listings", value: products.length, icon: "total" },
  ];

  return (
    <main className="sell-page">
      <div className="sell-container">
        <SellPageHeader
          eyebrow={sellData.page.eyebrow}
          title={sellData.page.title}
          description={sellData.page.description}
          buttonLabel={sellData.page.createButton}
        />

        <section className="sell-stats-grid">
          {stats.map((stat) => (
            <article className="sell-stat-card" key={stat.label}>
              <span className={`sell-stat-icon sell-stat-${stat.icon}`}>
                <Boxes size={21} />
              </span>
              <div>
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
              </div>
            </article>
          ))}
        </section>

        <section className="sell-listings-section">
          <div className="sell-listings-heading">
            <div>
              <span className="sell-eyebrow">YOUR MARKETPLACE</span>
              <h2>My listings</h2>
              <p>Manage the products you are selling.</p>
            </div>

            <Link
              href="/sell/create"
              className="sell-secondary-create"
            >
              <PackagePlus size={17} />
              Add product
            </Link>
          </div>

          <div className="sell-toolbar">
            <div className="sell-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search your listings..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search listings"
              />
            </div>

            <div className="sell-status-filters">
              {["All", "Active", "Sold"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    status === item
                      ? "sell-filter-button active"
                      : "sell-filter-button"
                  }
                  onClick={() => setStatus(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="seller-products-grid">
              {filteredProducts.map((product) => (
                <SellerProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="sell-empty-state">
              <span>
                <Boxes size={28} />
              </span>
              <h3>No listings found</h3>
              <p>
                Try another search, change the status filter, or
                create a new listing.
              </p>
              <Link
                href="/sell/create"
                className="sell-primary-button"
              >
                <PackagePlus size={17} />
                Create listing
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
