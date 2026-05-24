'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { Product } from '@/types';
import styles from './ProductActions.module.css';

export const ProductActions = ({ product }: { product: Product }) => {
  const router = useRouter();
  const addItem = useCartStore(s => s.addItem);
  const { showToast } = useToast();
  const isOOS = product.stock_quantity <= 0;

  const handleAddToCart = () => {
    if (isOOS) return;
    addItem(product, 1);
    showToast('Added to cart!', 'success');
  };

  const handleBuyNow = () => {
    if (isOOS) return;
    addItem(product, 1);
    router.push('/checkout');
  };

  return (
    <div className={styles.actions}>
      <button className={styles.addBtn} onClick={handleAddToCart} disabled={isOOS}>
        <ShoppingCart size={18} />
        {isOOS ? 'Out of Stock' : 'Add to Cart'}
      </button>
      <button className={styles.buyBtn} onClick={handleBuyNow} disabled={isOOS}>
        <Zap size={18} />
        Buy Now
      </button>
    </div>
  );
};
