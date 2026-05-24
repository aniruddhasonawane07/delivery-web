'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, ShoppingCart, Zap, Star } from 'lucide-react';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/siteConfig';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './productDetail.module.css';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = DUMMY_PRODUCTS.find(p => p.id === params.id);
  const router = useRouter();
  const addItem = useCartStore(s => s.addItem);
  const { showToast } = useToast();

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link href="/products">← Back to Shop</Link>
      </div>
    );
  }

  const related = DUMMY_PRODUCTS.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);
  const discount = product.discount_price ? Math.round((1 - product.discount_price / product.price) * 100) : 0;
  const catName = siteConfig.categories.find(c => c.id === product.category_id)?.name ?? product.category_id;
  const isOOS = product.stock_quantity <= 0;

  const handleAddToCart = () => {
    if (isOOS) return;
    addItem(product, qty);
    showToast(`${qty}x added to cart!`, 'success');
  };

  const handleBuyNow = () => {
    if (isOOS) return;
    addItem(product, qty);
    router.push('/checkout');
  };

  const images = [product.image_url, product.image_url, product.image_url];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> &nbsp;/&nbsp;
          <Link href={`/products?category=${product.category_id}`}>{catName}</Link> &nbsp;/&nbsp;
          <span>{product.title.substring(0, 40)}</span>
        </div>

        {/* ── Product Layout ── */}
        <div className={styles.productGrid}>
          {/* Left: Images */}
          <div className={styles.imageCol}>
            <div className={styles.mainImgBox}>
              <img src={images[activeImg]} alt={product.title} className={styles.mainImg} />
            </div>
            <div className={styles.thumbRow}>
              {images.map((img, i) => (
                <button key={i} className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className={styles.detailCol}>
            <h1 className={styles.productTitle}>{product.title}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} fill={i <= 4 ? 'var(--color-accent)' : 'none'} color="var(--color-accent)" />
              ))}
              <span className={styles.reviewCount}>(2,341 reviews)</span>
            </div>

            {/* Price */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>
                {siteConfig.currencySymbol}{(product.discount_price ?? product.price).toLocaleString()}
              </span>
              {product.discount_price && (
                <>
                  <span className={styles.mrp}>{siteConfig.currencySymbol}{product.price.toLocaleString()}</span>
                  <span className={styles.discountBadge}>{discount}% OFF</span>
                </>
              )}
            </div>

            <div className={styles.divider} />

            {/* Short Description */}
            <p className={styles.shortDesc}>{product.description}</p>

            {/* Stock */}
            <p className={isOOS ? styles.oos : styles.inStock}>
              {isOOS ? '● Out of stock' : '● In stock'}
            </p>

            {/* Quantity + CTA */}
            <div className={styles.ctaRow}>
              <div className={styles.qtyBox}>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={13} /></button>
                <span className={styles.qtyVal}>{qty}</span>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.min(product.stock_quantity, q + 1))} disabled={isOOS}><Plus size={13} /></button>
              </div>
              <button className={styles.addCartBtn} onClick={handleAddToCart} disabled={isOOS}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button className={styles.buyNowBtn} onClick={handleBuyNow} disabled={isOOS}>
                <Zap size={16} /> Buy Now
              </button>
            </div>

            {/* Meta info */}
            <div className={styles.meta}>
              <p><strong>SKU:</strong> {product.id.toUpperCase()}</p>
              <p><strong>Category:</strong> <Link href={`/products?category=${product.category_id}`} className={styles.metaLink}>{catName}</Link></p>
              <p><strong>Stock:</strong> {product.stock_quantity} units</p>
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Additional Info / Reviews ── */}
        <div className={styles.tabs}>
          <div className={styles.tabBar}>
            {([
              { key: 'description', label: 'Description' },
              { key: 'additional', label: 'Additional Information' },
              { key: 'reviews', label: 'Reviews (2341)' },
            ] as const).map(t => (
              <button
                key={t.key}
                className={`${styles.tabBtn} ${activeTab === t.key ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(t.key)}
              >{t.label}</button>
            ))}
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'description' && (
              <div className={styles.tabPane}>
                <p>{product.description ?? 'No description available for this product.'}</p>
                {product.description && <p style={{ marginTop: 12 }}>Premium quality product with excellent build quality. Perfect for everyday use and long-term durability.</p>}
              </div>
            )}
            {activeTab === 'additional' && product.specs && (
              <div className={styles.tabPane}>
                <table className={styles.specsTable}>
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k}>
                        <th>{k}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className={styles.tabPane}>
                <div className={styles.reviewSummary}>
                  <div className={styles.reviewScore}>
                    <span className={styles.reviewBigScore}>4.3</span>
                    <div className={styles.reviewStars}>
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={18} fill={i <= 4 ? 'var(--color-accent)' : 'none'} color="var(--color-accent)" />
                      ))}
                    </div>
                    <span className={styles.reviewCount}>Based on 2,341 reviews</span>
                  </div>
                </div>
                <p style={{ color: 'var(--color-text-muted)', marginTop: 24 }}>Login to write a review.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Related Products</h3>
            <div className={styles.relatedGrid}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
