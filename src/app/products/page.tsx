'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { siteConfig } from '@/config/siteConfig';
import { X, SlidersHorizontal } from 'lucide-react';
import styles from './products.module.css';

type SortKey = 'popular' | 'price_asc' | 'price_desc';

const PRICE_RANGES = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹20,000', min: 5000, max: 20000 },
  { label: 'Over ₹20,000', min: 20000, max: Infinity },
];

function ShopContent() {
  const sp = useSearchParams();
  const catParam = sp.get('category') ?? '';
  const searchParam = sp.get('search') ?? '';

  const [cat, setCat] = useState(catParam);
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [sort, setSort] = useState<SortKey>('popular');
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => { setCat(catParam); }, [catParam]);

  let filtered = [...DUMMY_PRODUCTS];
  if (searchParam) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchParam.toLowerCase()));
  if (cat) filtered = filtered.filter(p => p.category_id === cat);
  if (priceRange !== null) {
    const { min, max } = PRICE_RANGES[priceRange];
    filtered = filtered.filter(p => { const eff = p.discount_price ?? p.price; return eff >= min && eff <= max; });
  }
  if (sort === 'price_asc') filtered.sort((a, b) => (a.discount_price ?? a.price) - (b.discount_price ?? b.price));
  if (sort === 'price_desc') filtered.sort((a, b) => (b.discount_price ?? b.price) - (a.discount_price ?? a.price));

  const clearAll = () => { setCat(''); setPriceRange(null); setSort('popular'); };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Page Title */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {searchParam ? `"${searchParam}"` : cat ? siteConfig.categories.find(c => c.id === cat)?.name : 'Shop'}
          </h1>
          <p className={styles.resultCount}>{filtered.length} products</p>
        </div>

        <button className={styles.mobileFilterBtn} onClick={() => setMobileSidebar(true)}>
          <SlidersHorizontal size={16} /> Filters
        </button>

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={`${styles.sidebar} ${mobileSidebar ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHead}>
              <span className={styles.sidebarTitle}>Filter</span>
              {(cat || priceRange !== null) && (
                <button className={styles.clearBtn} onClick={clearAll}><X size={12} /> Clear</button>
              )}
              <button className={styles.sidebarClose} onClick={() => setMobileSidebar(false)}><X size={18} /></button>
            </div>

            {/* Category */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterGroupTitle}>Category</h3>
              <button className={`${styles.filterOpt} ${!cat ? styles.filterOptActive : ''}`} onClick={() => setCat('')}>
                All Products
              </button>
              {siteConfig.categories.map(c => (
                <button key={c.id} className={`${styles.filterOpt} ${cat === c.id ? styles.filterOptActive : ''}`} onClick={() => setCat(c.id)}>
                  {c.name}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterGroupTitle}>Price</h3>
              {PRICE_RANGES.map((r, i) => (
                <button key={i} className={`${styles.filterOpt} ${priceRange === i ? styles.filterOptActive : ''}`} onClick={() => setPriceRange(priceRange === i ? null : i)}>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className={styles.filterGroup}>
              <h3 className={styles.filterGroupTitle}>Sort By</h3>
              {([['popular', 'Popularity'], ['price_asc', 'Price: Low → High'], ['price_desc', 'Price: High → Low']] as const).map(([key, label]) => (
                <button key={key} className={`${styles.filterOpt} ${sort === key ? styles.filterOptActive : ''}`} onClick={() => setSort(key)}>
                  {label}
                </button>
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className={styles.main}>
            {filtered.length === 0 ? (
              <div className={styles.noResults}>
                <p>No products match your filters.</p>
                <button className={styles.clearAllBtn} onClick={clearAll}>Clear Filters</button>
              </div>
            ) : (
              <div className={styles.productGrid}>
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
