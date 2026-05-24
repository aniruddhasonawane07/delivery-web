'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useOrderStore } from '@/store/useOrderStore';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { siteConfig } from '@/config/siteConfig';
import { Address, Order } from '@/types';
import styles from './checkout.module.css';

type Step = 'address' | 'payment' | 'review';

const INDIAN_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh'];

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>('address');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [submitting, setSubmitting] = useState(false);

  const { items, getTotalPrice, clearCart } = useCartStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const total = getTotalPrice();

  const [address, setAddress] = useState<Address>({
    fullName: '', phone: '', email: '', addressLine1: '', addressLine2: '',
    city: '', state: '', pincode: '',
  });
  const [errors, setErrors] = useState<Partial<Address>>({});

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  if (items.length === 0 && step !== 'review') {
    return (
      <div className={styles.emptyMsg}>
        <p>Your cart is empty.</p>
        <button className={styles.backBtn} onClick={() => router.push('/')}>Go Shopping</button>
      </div>
    );
  }

  const validate = () => {
    const e: Partial<Address> = {};
    if (!address.fullName.trim()) e.fullName = 'Full name is required';
    if (!address.phone.trim() || !/^[6-9]\d{9}$/.test(address.phone)) e.phone = 'Valid 10-digit phone required';
    if (!address.email.trim() || !/\S+@\S+\.\S+/.test(address.email)) e.email = 'Valid email required';
    if (!address.addressLine1.trim()) e.addressLine1 = 'Address is required';
    if (!address.city.trim()) e.city = 'City is required';
    if (!address.state) e.state = 'State is required';
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode)) e.pincode = 'Valid 6-digit pincode required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAddressNext = () => {
    if (validate()) setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));

    const orderId = `ORD-${Date.now().toString().slice(-8)}`;
    const order: Order = {
      id: orderId,
      date: new Date().toISOString(),
      address,
      items: items.map(i => ({
        productId: i.id,
        title: i.title,
        image_url: i.image_url,
        price: i.discount_price ?? i.price,
        quantity: i.quantity,
      })),
      totalAmount: total,
      paymentMethod,
      status: 'Pending',
    };
    addOrder(order);
    clearCart();
    setSubmitting(false);
    router.push(`/checkout/success?orderId=${orderId}`);
  };

  const stepNumber = step === 'address' ? 1 : step === 'payment' ? 2 : 3;

  return (
    <div className={`container ${styles.pageContainer}`}>
      {/* Stepper */}
      <div className={styles.stepper}>
        {(['address', 'payment', 'review'] as Step[]).map((s, i) => (
          <React.Fragment key={s}>
            <div className={`${styles.stepItem} ${step === s ? styles.stepActive : stepNumber > i + 1 ? styles.stepDone : ''}`}>
              <div className={styles.stepCircle}>{stepNumber > i + 1 ? <CheckCircle size={16} /> : i + 1}</div>
              <span className={styles.stepLabel}>{s === 'address' ? 'Delivery Address' : s === 'payment' ? 'Payment' : 'Review Order'}</span>
            </div>
            {i < 2 && <div className={`${styles.stepLine} ${stepNumber > i + 1 ? styles.stepLineDone : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.layout}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>

          {/* Step 1: Address */}
          {step === 'address' && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <MapPin size={20} color="var(--color-primary)" />
                <h2>Delivery Address</h2>
              </div>
              <div className={styles.form}>
                <div className={styles.formRow2}>
                  <div className={styles.field}>
                    <label>Full Name *</label>
                    <input value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} placeholder="John Doe" />
                    {errors.fullName && <span className={styles.err}>{errors.fullName}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number *</label>
                    <input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} placeholder="9876543210" maxLength={10} />
                    {errors.phone && <span className={styles.err}>{errors.phone}</span>}
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Email Address *</label>
                  <input type="email" value={address.email} onChange={e => setAddress({...address, email: e.target.value})} placeholder="you@email.com" />
                  {errors.email && <span className={styles.err}>{errors.email}</span>}
                </div>
                <div className={styles.field}>
                  <label>Address Line 1 *</label>
                  <input value={address.addressLine1} onChange={e => setAddress({...address, addressLine1: e.target.value})} placeholder="House No., Street, Area" />
                  {errors.addressLine1 && <span className={styles.err}>{errors.addressLine1}</span>}
                </div>
                <div className={styles.field}>
                  <label>Address Line 2 (Optional)</label>
                  <input value={address.addressLine2} onChange={e => setAddress({...address, addressLine2: e.target.value})} placeholder="Landmark, Nearby" />
                </div>
                <div className={styles.formRow3}>
                  <div className={styles.field}>
                    <label>City *</label>
                    <input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="Mumbai" />
                    {errors.city && <span className={styles.err}>{errors.city}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>State *</label>
                    <select value={address.state} onChange={e => setAddress({...address, state: e.target.value})}>
                      <option value="">Select State</option>
                      {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <span className={styles.err}>{errors.state}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>Pincode *</label>
                    <input value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} placeholder="400001" maxLength={6} />
                    {errors.pincode && <span className={styles.err}>{errors.pincode}</span>}
                  </div>
                </div>
                <button className={styles.nextBtn} onClick={handleAddressNext}>
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 'payment' && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <CreditCard size={20} color="var(--color-primary)" />
                <h2>Payment Method</h2>
              </div>
              <div className={styles.paymentOptions}>
                <label className={`${styles.payOption} ${paymentMethod === 'cod' ? styles.payOptionActive : ''}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <div>
                    <p className={styles.payTitle}>💵 Cash on Delivery</p>
                    <p className={styles.payDesc}>Pay when your order arrives at your door</p>
                  </div>
                </label>
                <label className={`${styles.payOption} ${styles.payOptionDisabled}`}>
                  <input type="radio" name="payment" value="online" disabled />
                  <div>
                    <p className={styles.payTitle}>💳 Online Payment <span className={styles.comingSoon}>Coming Soon</span></p>
                    <p className={styles.payDesc}>UPI, Card, Net Banking (Razorpay)</p>
                  </div>
                </label>
              </div>
              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('address')}>← Back</button>
                <button className={styles.nextBtn} onClick={() => setStep('review')}>Review Order →</button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 'review' && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <CheckCircle size={20} color="var(--color-primary)" />
                <h2>Review Your Order</h2>
              </div>

              {/* Address Summary */}
              <div className={styles.reviewSection}>
                <h3>Delivering to:</h3>
                <p className={styles.reviewAddress}>
                  <strong>{address.fullName}</strong> | {address.phone}<br />
                  {address.addressLine1}{address.addressLine2 ? `, ${address.addressLine2}` : ''}<br />
                  {address.city}, {address.state} – {address.pincode}
                </p>
              </div>

              {/* Items Summary */}
              <div className={styles.reviewSection}>
                <h3>Items ({items.length})</h3>
                {items.map(item => (
                  <div key={item.cartItemId} className={styles.reviewItem}>
                    <img src={item.image_url} alt={item.title} className={styles.reviewItemImg} />
                    <div className={styles.reviewItemInfo}>
                      <p className={styles.reviewItemTitle}>{item.title}</p>
                      <p className={styles.reviewItemQty}>Qty: {item.quantity}</p>
                    </div>
                    <p className={styles.reviewItemPrice}>
                      {siteConfig.currencySymbol}{((item.discount_price ?? item.price) * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className={styles.btnRow}>
                <button className={styles.backBtn} onClick={() => setStep('payment')}>← Back</button>
                <button className={styles.placeOrderBtn} onClick={handlePlaceOrder} disabled={submitting}>
                  {submitting ? '⏳ Placing Order...' : `🛒 Place Order • ${siteConfig.currencySymbol}${total.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Price Summary */}
        <div className={styles.summaryPanel}>
          <div className={styles.summaryPanelInner}>
            <h2 className={styles.summaryTitle}>PRICE DETAILS</h2>
            <div className={styles.summaryRows}>
              {items.map(item => (
                <div key={item.cartItemId} className={styles.summaryRow}>
                  <span className={styles.summaryItemName}>{item.title.substring(0, 22)}... ×{item.quantity}</span>
                  <span>{siteConfig.currencySymbol}{((item.discount_price ?? item.price) * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className={styles.summaryDivider} />
              <div className={styles.summaryRow}>
                <span>Delivery</span><span className={styles.freeText}>FREE</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>Total</span>
                <span>{siteConfig.currencySymbol}{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
