'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export const CartBadge = () => {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <ShoppingCart size={20} />
      <span>Cart</span>
      {mounted && totalItems > 0 && (
        <span style={{
          position: 'absolute',
          top: '-8px',
          left: '-8px',
          backgroundColor: 'var(--color-secondary)',
          color: 'white',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          borderRadius: '50%',
          width: '18px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {totalItems}
        </span>
      )}
    </div>
  );
};
