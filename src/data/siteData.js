const siteData = {
  brand: {
    name: "NayaPurana",
    tagline: "Buy • Sell • Reuse",
    logo: "/images/logo/logo.png",
  },

  navigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Buy",
      href: "/products",
    },
    {
      label: "Categories",
      href: "/categories",
      dropdown: true,
    },
    {
      label: "Sell",
      href: "/sell",
      highlight: true,
    },
  ],

  actions: {
    wishlist: {
      label: "Wishlist",
      href: "/wishlist",
    },

    login: {
      label: "Login",
      href: "/login",
    },

    register: {
      label: "Register",
      href: "/register",
    },
  },

  categories: [
    {
      name: "Mobiles",
      href: "/categories/mobiles",
    },
    {
      name: "Electronics",
      href: "/categories/electronics",
    },
    {
      name: "Vehicles",
      href: "/categories/vehicles",
    },
    {
      name: "Furniture",
      href: "/categories/furniture",
    },
    {
      name: "Fashion",
      href: "/categories/fashion",
    },
    {
      name: "Home Appliances",
      href: "/categories/home-appliances",
    },
    {
      name: "Books",
      href: "/categories/books",
    },
  ],
};

export default siteData;