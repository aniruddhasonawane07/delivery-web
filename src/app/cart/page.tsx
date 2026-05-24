'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { siteConfig } from '@/config/siteConfig';
import styles from './cart.module.css';

export default function CartPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <ShoppingBag size={64} strokeWidth={1} color="#ccc" />
        <h2 className={styles.emptyTitle}>Your Cart is Empty</h2>
        <p className={styles.emptyDesc}>Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className={styles.shopBtn}>Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Cart</h1>

        <div className={styles.layout}>
          {/* Cart Table */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Photo</th>
                  <th className={styles.th}>Product</th>
                  <th className={styles.th}>Quantity</th>
                  <th className={styles.th}>Total</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const lineTotal = (item.discount_price ?? item.price) * item.quantity;
                  return (
                    <tr key={item.cartItemId} className={styles.row}>
                      <td className={styles.tdPhoto}>
                        <Link href={`/product/${item.id}`}>
                          <img src={item.image_url} alt={item.title} className={styles.rowImg} />
                        </Link>
                      </td>
                      <td className={styles.tdProduct}>
                        <Link href={`/product/${item.id}`} className={styles.rowTitle}>{item.title}</Link>
                        <p className={styles.rowPrice}>
                          {siteConfig.currencySymbol}{(item.discount_price ?? item.price).toLocaleString()} each
                        </p>
                      </td>
                      <td className={styles.tdQty}>
                        <div className={styles.qtyBox}>
                          <button className={styles.qtyBtn} onClick={() => {
                            if (item.quantity <= 1) { removeItem(item.cartItemId); showToast('Item removed'); return; }
                            updateQuantity(item.cartItemId, item.quantity - 1);
                          }}><Minus size={12} /></button>
                          <span className={styles.qtyNum}>{item.quantity}</span>
                          <button className={styles.qtyBtn} onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} disabled={item.quantity >= item.stock_quantity}><Plus size={12} /></button>
                        </div>
                      </td>
                      <td className={styles.tdTotal}>
                        <span className={styles.lineTotal}>{siteConfig.currencySymbol}{lineTotal.toLocaleString()}</span>
                      </td>
                      <td className={styles.tdRemove}>
                        <button className={styles.removeBtn} onClick={() => { removeItem(item.cartItemId); showToast('Item removed'); }}>
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cart Totals */}
          <div className={styles.totalsBox}>
            <h2 className={styles.totalsTitle}>Cart Totals</h2>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalVal}>{siteConfig.currencySymbol}{total.toLocaleString()}</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Shipping</span>
              <span className={styles.freeShip}>Free Shipping</span>
            </div>
            <div className={styles.divider} />
            <div className={`${styles.totalRow} ${styles.grandRow}`}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.grandTotal}>{siteConfig.currencySymbol}{total.toLocaleString()}</span>
            </div>

            <button className={styles.checkoutBtn} onClick={() => router.push('/checkout')}>
              Proceed to Checkout
            </button>
            <Link href="/products" className={styles.continueLink}>← Continue Shopping</Link>
          </div>
        </div>

        {/* Newsletter in cart like MiniStore */}
        <div className={styles.cartNewsletter}>
          <h3 className={styles.newsletterTitle}>Subscribe Us Now</h3>
          <p className={styles.newsletterDesc}>Get exclusive deals and offers directly in your inbox.</p>
          <div className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email address" className={styles.newsletterInput} />
            <button className={styles.newsletterBtn}>SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
