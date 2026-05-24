# White-Label E-Commerce Template

A production-ready, highly modular E-Commerce template built with **Next.js 15 (App Router)**, **TypeScript**, **CSS Modules**, and **Supabase**.

Designed specifically for small-to-medium local businesses (Mobile Accessories, Electronics, Decor, etc.).

## 🚀 Features
- **Config-Driven Branding**: Change site name, logo, colors, and categories instantly.
- **Supabase Backend**: Pre-configured schema for Auth, Products, Orders, and more.
- **Zustand Cart**: Fast, client-side persisted shopping cart.
- **Flipkart-style UI**: Clean, responsive, and mobile-first design using modular CSS.
- **Admin Dashboard**: Ready-to-use layouts for managing products and orders.

## 🛠️ How to Customize for a New Client

You can deploy this application for a completely different business just by changing two files:

### 1. `src/config/siteConfig.ts`
Modify the business details, contact information, currency, and categories:
```typescript
export const siteConfig = {
  name: "Client's Store Name",
  description: "What they sell",
  logo: "/logo.png",
  currency: "USD",
  currencySymbol: "$",
  // ... update categories
}
```

### 2. `src/styles/variables.css`
Update the CSS variables to match the client's branding:
```css
:root {
  --color-primary: #ff0000; /* Client's brand color */
  --color-secondary: #000000;
  /* ... */
}
```

## 📦 Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.example` to `.env.local` and add your Supabase credentials.
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

3. **Database Setup**
   Run the SQL file located in `supabase/migrations/00_initial_schema.sql` in your Supabase SQL Editor to create all necessary tables and RLS policies.

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🚢 Deployment
Easily deployable on Vercel. 
Just link your GitHub repository to Vercel and add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Environment Variables in the Vercel dashboard.
