
"use client";

import { use } from "react";
import Link from "next/link";

import ProductForm from "../../../../components/sell/ProductForm";
import sellData, {
  sampleListings,
} from "../../../../data/sellData";
import "../../../../style/sell.css";

export default function EditListingPage({ params }) {
  const { id } = use(params);

  const product = sampleListings.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="sell-page">
        <div className="sell-container">
          <section className="sell-empty-state sell-not-found">
            <h1>Listing not found</h1>
            <p>
              This listing may have been removed or the link may
              be incorrect.
            </p>
            <Link href="/sell" className="sell-primary-button">
              Back to my listings
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="sell-page">
      <div className="sell-container sell-form-container">
        <ProductForm
          mode="edit"
          initialData={product}
          categories={sellData.categories}
          conditions={sellData.conditions}
          fields={sellData.fields}
          formContent={sellData.form}
        />
      </div>
    </main>
  );
}
