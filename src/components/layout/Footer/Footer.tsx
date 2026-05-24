import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footerGrid}>
      <div className={styles.col}>
        <h3 className={styles.brandName}>MiniStore.</h3>
        <p className={styles.brandDesc}>{siteConfig.description}</p>
      </div>
      <div className={styles.col}>
        <h4 className={styles.colTitle}>Shop Links</h4>
        {siteConfig.categories.map(cat => (
          <Link key={cat.id} href={`/products?category=${cat.id}`} className={styles.link}>{cat.name}</Link>
        ))}
        <Link href="/products" className={styles.link}>All Products</Link>
      </div>
      <div className={styles.col}>
        <h4 className={styles.colTitle}>Help & Info</h4>
        <Link href="/orders" className={styles.link}>Track Order</Link>
        <Link href="#" className={styles.link}>Returns & Exchanges</Link>
        <Link href="#" className={styles.link}>Shipping Info</Link>
        <Link href="#" className={styles.link}>Privacy Policy</Link>
        <Link href="#" className={styles.link}>Terms & Conditions</Link>
      </div>
      <div className={styles.col}>
        <h4 className={styles.colTitle}>Contact Us</h4>
        <p className={styles.contactItem}>{siteConfig.supportEmail}</p>
        <p className={styles.contactItem}>{siteConfig.contactPhone}</p>
        <p className={styles.contactItem}>Mon – Sat: 9am – 6pm IST</p>
      </div>
    </div>

    <div className={styles.footerBottom}>
      <div className={styles.bottomInner}>
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
        <div className={styles.socials}>
          {['FB', 'TW', 'IG', 'YT'].map(s => (
            <a key={s} href="#" className={styles.social}>{s}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
