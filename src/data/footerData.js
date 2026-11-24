
const footerData = {
  brand: {
    name: "NayaPurana",
    tagline: "Good finds. Better prices.",
    description:
      "Your local marketplace for buying and selling pre-loved and new items. Discover great deals, give useful things a second life, and connect with your community.",
    logo: "/images/logo.png",
    homeUrl: "/",
  },

  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Browse Products", href: "/products" },
    { label: "All Categories", href: "/categories" },
    { label: "Sell an Item", href: "/sell" },
    { label: "My Wishlist", href: "/wishlist" },
  ],

  popularCategories: [
    { label: "Mobiles & Tablets", href: "/categories/mobiles" },
    { label: "Electronics", href: "/categories/electronics" },
    { label: "Fashion", href: "/categories/fashion" },
    { label: "Home & Furniture", href: "/categories/home-furniture" },
    { label: "Cars & Bikes", href: "/categories/cars-bikes" },
  ],

  supportLinks: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Frequently Asked Questions", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],

  contact: {
    // Replace these examples with verified business details.
    address: "Navi Mumbai, Maharashtra, India",
    email: "support@nayapurana.com",
    phone: "+91 98765 43210",
    businessHours: "Monday – Saturday, 9:00 AM – 6:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Navi+Mumbai",
  },

  socialLinks: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: "Instagram",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      icon: "Facebook",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/",
      icon: "Youtube",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: "Linkedin",
    },
  ],

  newsletter: {
    title: "Stay in the loop",
    description:
      "Get marketplace updates, fresh finds and shopping tips in your inbox.",
    placeholder: "Enter your email address",
    buttonLabel: "Subscribe",
  },

  copyright: `© ${new Date().getFullYear()} NayaPurana. All rights reserved.`,
};

export default footerData;
