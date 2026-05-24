'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { siteConfig } from '@/config/siteConfig';
import styles from './orders.module.css';

const STATUS_COLORS: Record<string, string> = {
  Pending: '#ff9800',
  Processing: '#2874f0',
  Shipped: '#9c27b0',
  Delivered: '#388e3c',
  Cancelled: '#f44336',
};

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore(s => s.orders);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (orders.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Package size={80} strokeWidth={1} color="var(--color-text-muted)" />
        <h2>No orders yet</h2>
        <p>When you place an order, it will appear here.</p>
        <Link href="/products" className={styles.shopBtn}>Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.pageContainer}`}>
      <h1 className={styles.pageTitle}>My Orders</h1>
      <div className={styles.ordersList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div>
                <p className={styles.orderId}>Order #{order.id}</p>
                <p className={styles.orderDate}>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <span className={styles.statusBadge} style={{ background: `${STATUS_COLORS[order.status]}22`, color: STATUS_COLORS[order.status] }}>
                {order.status}
              </span>
            </div>
            <div className={styles.orderItems}>
              {order.items.map((item, i) => (
                <div key={i} className={styles.orderItem}>
                  <img src={item.image_url} alt={item.title} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                  <p className={styles.itemPrice}>{siteConfig.currencySymbol}{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className={styles.orderFooter}>
              <div className={styles.addressInfo}>
                <p className={styles.footerLabel}>Delivering to</p>
                <p>{order.address.fullName} | {order.address.city}, {order.address.state}</p>
              </div>
              <div className={styles.totalInfo}>
                <p className={styles.footerLabel}>Order Total</p>
                <p className={styles.orderTotal}>{siteConfig.currencySymbol}{order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
