'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, X, Menu, ChevronDown, Package, LogOut } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { useCartStore } from '@/store/useCartStore';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import styles from './Header.module.css';

export const Header = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof DUMMY_PRODUCTS>([]);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore(s => s.getTotalItems());
  const searchRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false); setSearchResults([]);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (val.length > 1) {
      setSearchResults(DUMMY_PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5));
    } else setSearchResults([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) { router.push(`/products?search=${encodeURIComponent(searchQuery)}`); setSearchOpen(false); }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className={styles.announce}>
        FREE SHIPPING ON ORDERS ABOVE ₹999 &nbsp;·&nbsp; USE CODE: <strong>WELCOME10</strong> FOR 10% OFF
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerInner}>
          {/* Mobile toggle */}
          <button className={styles.mobileToggle} onClick={() => setMobileOpen(true)}>
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className={styles.logo}>MiniStore.</Link>

          {/* Nav */}
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <div className={styles.navDropdown}>
              <span className={styles.navLink}>Pages <ChevronDown size={12} /></span>
              <div className={styles.dropdownMenu}>
                {siteConfig.categories.map(c => (
                  <Link key={c.id} href={`/products?category=${c.id}`} className={styles.dropdownItem}>{c.name}</Link>
                ))}
              </div>
            </div>
            <Link href="/products" className={styles.navLink}>Shop</Link>
            <Link href="/orders" className={styles.navLink}>Orders</Link>
            <Link href="/auth" className={styles.navLink}>Contact</Link>
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Search */}
            <div ref={searchRef} className={styles.searchWrap}>
              <button className={styles.iconBtn} onClick={() => setSearchOpen(!searchOpen)}>
                <Search size={18} />
              </button>
              {searchOpen && (
                <div className={styles.searchBox}>
                  <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value)}
                      className={styles.searchInput}
                    />
                    <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}>
                      <X size={16} />
                    </button>
                  </form>
                  {searchResults.length > 0 && (
                    <div className={styles.searchResults}>
                      {searchResults.map(p => (
                        <button key={p.id} className={styles.searchResultItem} onClick={() => { router.push(`/product/${p.id}`); setSearchOpen(false); setSearchQuery(''); }}>
                          <img src={p.image_url} alt="" className={styles.searchThumb} />
                          <div>
                            <p className={styles.searchTitle}>{p.title}</p>
                            <p className={styles.searchPrice}>₹{(p.discount_price ?? p.price).toLocaleString()}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User */}
            <div ref={userRef} className={styles.userWrap}>
              <button className={styles.iconBtn} onClick={() => setUserOpen(!userOpen)}>
                <User size={18} />
              </button>
              {userOpen && (
                <div className={styles.userMenu}>
                  <Link href="/auth" className={styles.userMenuItem} onClick={() => setUserOpen(false)}>Login / Sign Up</Link>
                  <Link href="/orders" className={styles.userMenuItem} onClick={() => setUserOpen(false)}>
                    <Package size={14} /> My Orders
                  </Link>
                  <Link href="/auth" className={styles.userMenuItem} onClick={() => setUserOpen(false)}>
                    <LogOut size={14} /> Logout
                  </Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className={styles.cartBtn}>
              <div className={styles.cartWrap}>
                <ShoppingCart size={18} />
                {mounted && totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileSidebar}>
            <div className={styles.mobileHeader}>
              <span className={styles.logo}>MiniStore.</span>
              <button onClick={() => setMobileOpen(false)}><X size={22} /></button>
            </div>
            <nav className={styles.mobileNav}>
              <Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
              <Link href="/products" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Shop</Link>
              {siteConfig.categories.map(c => (
                <Link key={c.id} href={`/products?category=${c.id}`} className={styles.mobileSub} onClick={() => setMobileOpen(false)}>
                  {c.icon} {c.name}
                </Link>
              ))}
              <Link href="/orders" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>My Orders</Link>
              <Link href="/auth" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Login / Sign Up</Link>
            </nav>
          </div>
          <div className={styles.mobileBackdrop} onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
};
