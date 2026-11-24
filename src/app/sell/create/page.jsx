
import ProductForm from "@/components/sell/ProductForm";
import sellData from "@/data/sellData";
import "../../../style/sell.css";

export const metadata = {
  title: "Sell a Product | NayaPurana",
  description:
    "Create a listing and sell your products locally on NayaPurana.",
};

export default function CreateListingPage() {
  return (
    <main className="sell-page">
      <div className="sell-container sell-form-container">
        <ProductForm
          mode="create"
          categories={sellData.categories}
          conditions={sellData.conditions}
          fields={sellData.fields}
          formContent={sellData.form}
        />
      </div>
    </main>
  );
}
