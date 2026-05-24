'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { siteConfig } from '@/config/siteConfig';
import styles from './success.module.css';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') ?? '';
  const getOrder = useOrderStore(s => s.getOrder);
  const [order, setOrder] = useState(getOrder(orderId));

  useEffect(() => { setOrder(getOrder(orderId)); }, [orderId, getOrder]);

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Order not found</h2>
          <Link href="/" className={styles.shopBtn}>Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <CheckCircle size={64} color="var(--color-success)" strokeWidth={1.5} />
        </div>
        <h1 className={styles.successTitle}>Order Placed Successfully! 🎉</h1>
        <p className={styles.successSubtitle}>
          Your order <strong>{order.id}</strong> has been confirmed and will be delivered soon.
        </p>

        {/* Delivery Info */}
        <div className={styles.deliveryBox}>
          <p className={styles.deliveryLabel}>Delivering to:</p>
          <p className={styles.deliveryAddress}>
            <strong>{order.address.fullName}</strong> | {order.address.phone}<br />
            {order.address.addressLine1}, {order.address.city}, {order.address.state} – {order.address.pincode}
          </p>
          <p className={styles.deliveryDate}>Expected delivery: <strong>11 – 13 May 2026</strong></p>
        </div>

        {/* Order Items */}
        <div className={styles.itemsSection}>
          <h3>Items in this order</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className={styles.orderItem}>
              <img src={item.image_url} alt={item.title} className={styles.itemImg} />
              <div className={styles.itemInfo}>
                <p className={styles.itemTitle}>{item.title}</p>
                <p className={styles.itemQty}>Qty: {item.quantity}</p>
              </div>
              <p className={styles.itemPrice}>{siteConfig.currencySymbol}{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <div className={styles.orderTotal}>
            <span>Total Paid</span>
            <span className={styles.totalAmount}>{siteConfig.currencySymbol}{order.totalAmount.toLocaleString()}</span>
          </div>
          <div className={styles.payBadge}>
            {order.paymentMethod === 'cod' ? '💵 Cash on Delivery' : '💳 Online Payment'}
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/orders" className={styles.ordersBtn}>
            <Package size={18} /> View All Orders
          </Link>
          <Link href="/products" className={styles.shopBtn}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
