
const sellData = {
  page: {
    eyebrow: "SELL ON NAYAPURANA",
    title: "Your unused items deserve a new home.",
    description:
      "List your products, connect with local buyers, and turn things you no longer need into money.",
    createButton: "Sell an item",
  },

  stats: [
    { label: "Active listings", value: "3" },
    { label: "Items sold", value: "12" },
    { label: "Total listings", value: "15" },
  ],

  categories: [
    { label: "Mobiles", value: "mobiles" },
    { label: "Electronics", value: "electronics" },
    { label: "Furniture", value: "furniture" },
    { label: "Vehicles", value: "vehicles" },
    { label: "Fashion", value: "fashion" },
    { label: "Home Appliances", value: "home-appliances" },
    { label: "Books", value: "books" },
    { label: "Sports", value: "sports" },
    { label: "Other", value: "other" },
  ],

  conditions: [
    { label: "Brand New", value: "new" },
    { label: "Like New", value: "like-new" },
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
  ],

  form: {
    createTitle: "Create your listing",
    editTitle: "Edit your listing",
    createDescription:
      "Add clear details so local buyers can find your product.",
    editDescription:
      "Update your product information and keep your listing accurate.",
    submitCreate: "Publish listing",
    submitEdit: "Save changes",
    cancelLabel: "Cancel",
  },

  fields: {
    title: {
      label: "Product name",
      placeholder: "e.g. iPhone 13, 128GB",
    },
    description: {
      label: "Product description",
      placeholder:
        "Describe the product, its features, age, and condition...",
    },
    price: {
      label: "Selling price",
      placeholder: "Enter your price",
    },
    originalPrice: {
      label: "Original price",
      placeholder: "Optional",
    },
    category: {
      label: "Category",
      placeholder: "Choose a category",
    },
    condition: {
      label: "Product condition",
      placeholder: "Choose condition",
    },
    city: {
      label: "City",
      placeholder: "e.g. Navi Mumbai",
    },
    locality: {
      label: "Locality / Area",
      placeholder: "e.g. Sanpada Sector 1",
    },
  },
};

// Sample frontend data. Replace with API data later.
export const sampleListings = [
  {
    id: "item-101",
    title: "iPhone 13, 128GB",
    category: "mobiles",
    condition: "good",
    price: 28500,
    originalPrice: 49900,
    city: "Navi Mumbai",
    locality: "Sanpada Sector 1",
    status: "Active",
    image: "/images/products/iphone-13.jpg",
    description:
      "Well-maintained iPhone 13 with 128GB storage. Works properly.",
    createdAt: "2026-10-01",
  },
  {
    id: "item-102",
    title: "Study Table",
    category: "furniture",
    condition: "like-new",
    price: 2500,
    originalPrice: 5000,
    city: "Navi Mumbai",
    locality: "Vashi",
    status: "Active",
    image: "/images/products/study-table.jpg",
    description:
      "Compact study table in excellent condition.",
    createdAt: "2026-10-03",
  },
  {
    id: "item-103",
    title: "Wireless Headphones",
    category: "electronics",
    condition: "good",
    price: 1200,
    originalPrice: 2500,
    city: "Navi Mumbai",
    locality: "Nerul",
    status: "Sold",
    image: "/images/products/headphones.jpg",
    description:
      "Wireless headphones in good working condition.",
    createdAt: "2026-09-20",
  },
];

export default sellData;
