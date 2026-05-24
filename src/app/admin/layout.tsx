import React from 'react';
import Link from 'next/link';
import { Package, ShoppingBag, LayoutDashboard, Settings } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.adminSidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/products" className={styles.navLink}>
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/orders" className={styles.navLink}>
            <ShoppingBag size={20} />
            <span>Orders</span>
          </Link>
          <Link href="/admin/settings" className={styles.navLink}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
      <main className={styles.adminMain}>
        {children}
      </main>
    </div>
  );
}
