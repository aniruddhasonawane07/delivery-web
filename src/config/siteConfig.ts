export const siteConfig = {
  name: "TechStore India",
  tagline: "India ka Fashion Capital",
  description: "Your one-stop shop for electronics, gadgets, mobiles, decor and home utility products.",
  logo: "/logo.png",
  currency: "INR",
  currencySymbol: "₹",
  supportEmail: "support@techstore.example.com",
  contactPhone: "+91-9876543210",

  categories: [
    {
      id: "electronics",
      name: "Electronics",
      slug: "electronics",
      icon: "💻",
      image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "mobiles",
      name: "Mobiles & Accessories",
      slug: "mobiles",
      icon: "📱",
      image_url: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "decor",
      name: "Home Decor",
      slug: "decor",
      icon: "🏠",
      image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "utility",
      name: "Home Utility",
      slug: "utility",
      icon: "🔧",
      image_url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80",
    },
  ],

  features: {
    enableHeroBanner: true,
    enableTrending: true,
    enableOffers: true,
    enableNewsletter: false,
  },

  payment: {
    codEnabled: true,
    razorpayEnabled: false,
  },
};

export type SiteConfig = typeof siteConfig;
