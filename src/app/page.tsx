import Link from 'next/link';
import { siteConfig } from '@/config/siteConfig';
import { DUMMY_PRODUCTS } from '@/lib/dummyData';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const categories = siteConfig.categories;

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Products<br />Are Great.</h1>
          <Link href="/products" className={styles.heroBtn}>Shop Product</Link>
        </div>
        <div className={styles.heroImageWrap}>
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=90"
            alt="Hero product"
            className={styles.heroImage}
          />
        </div>
        {/* Arrows */}
        <button className={`${styles.heroArrow} ${styles.heroArrowLeft}`}>&#8249;</button>
        <button className={`${styles.heroArrow} ${styles.heroArrowRight}`}>&#8250;</button>
      </section>

      {/* ── TRUST ICONS ── */}
      <section className={styles.trust}>
        <div className={styles.trustGrid}>
          {[
            { icon: '🚚', title: 'Free Delivery', desc: 'Consectetur adipiscing elit, sed do eiusmod tempor.' },
            { icon: '✓', title: 'Quality Guarantee', desc: 'Consectetur adipiscing elit, sed do eiusmod tempor.' },
            { icon: '%', title: 'Daily Offers', desc: 'Consectetur adipiscing elit, sed do eiusmod tempor.' },
            { icon: '🔒', title: '100% Secure Payment', desc: 'Consectetur adipiscing elit, sed do eiusmod tempor.' },
          ].map(item => (
            <div key={item.title} className={styles.trustItem}>
              <div className={styles.trustIconBox}>{item.icon}</div>
              <div>
                <p className={styles.trustTitle}>{item.title}</p>
                <p className={styles.trustDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY SECTIONS — one per category, 4 products each ── */}
      {categories.map(cat => {
        const catProducts = DUMMY_PRODUCTS.filter(p => p.category_id === cat.id).slice(0, 4);
        if (!catProducts.length) return null;
        return (
          <section key={cat.id} className={styles.catSection}>
            <div className={styles.catHeader}>
              <h2 className={styles.catTitle}>{cat.name}</h2>
              <Link href={`/products?category=${cat.id}`} className={styles.catGoTo}>GO TO SHOP →</Link>
            </div>
            <div className={styles.catGrid}>
              {catProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            {/* Dots indicator */}
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.dotActive}`} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </section>
        );
      })}

      {/* ── NEW YEAR SALE BANNER ── */}
      <section className={styles.saleBanner}>
        <div className={styles.saleBannerContent}>
          <p className={styles.saleOff}>— 10% OFF</p>
          <h2 className={styles.saleTitle}>New Year Sale</h2>
          <Link href="/products" className={styles.saleBtn}>Shop It</Link>
        </div>
        <div className={styles.saleBannerImg}>
          <img
            src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80"
            alt="Sale"
          />
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <div>
            <h3 className={styles.newsletterTitle}>Subscribe Us Now</h3>
            <p className={styles.newsletterDesc}>Get latest updates and offers.</p>
          </div>
          <form className={styles.newsletterForm}>
            <input type="email" placeholder="Enter your email address" className={styles.newsletterInput} />
            <button type="submit" className={styles.newsletterBtn}>SUBSCRIBE</button>
          </form>
        </div>
      </section>

      {/* ── SHOP OUR INSTA (gallery strip) ── */}
      <section className={styles.instaSection}>
        <h3 className={styles.instaTitle}>Shop Our Insta</h3>
        <div className={styles.instaGrid}>
          {DUMMY_PRODUCTS.slice(0, 6).map(p => (
            <div key={p.id} className={styles.instaItem}>
              <img src={p.image_url} alt={p.title} />
              <div className={styles.instaOverlay}>
                <span>📷</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
