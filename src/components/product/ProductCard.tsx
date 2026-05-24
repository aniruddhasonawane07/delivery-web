'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { Product } from '@/types';
import { siteConfig } from '@/config/siteConfig';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore(s => s.addItem);
  const { showToast } = useToast();
  const [hovered, setHovered] = useState(false);
  const isOOS = product.stock_quantity <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (isOOS) return;
    addItem(product, 1);
    showToast(`Added to cart!`, 'success');
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <Link href={`/product/${product.id}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <img src={product.image_url} alt={product.title} className={styles.image} loading="lazy" />
          {/* Hover overlay with ADD TO CART */}
          <div className={`${styles.overlay} ${hovered ? styles.overlayActive : ''}`}>
            <button className={styles.addBtn} onClick={handleAdd} disabled={isOOS}>
              <ShoppingCart size={14} />
              {isOOS ? 'SOLD OUT' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </Link>

      {/* Info below image */}
      <div className={styles.info}>
        <Link href={`/product/${product.id}`}>
          <h3 className={styles.name}>{product.title}</h3>
        </Link>
        <div className={styles.priceRow}>
          {product.discount_price && (
            <span className={styles.mrp}>{siteConfig.currencySymbol}{product.price.toLocaleString()}</span>
          )}
          <span className={styles.price}>
            {siteConfig.currencySymbol}{(product.discount_price ?? product.price).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
