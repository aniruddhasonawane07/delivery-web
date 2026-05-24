import React from 'react';
import styles from './Card.module.css';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`${styles.card} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = ({ className = '', children, ...props }: CardProps) => (
  <div className={`${styles.header} ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className = '', children, ...props }: CardProps) => (
  <div className={`${styles.content} ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...props }: CardProps) => (
  <div className={`${styles.footer} ${className}`} {...props}>
    {children}
  </div>
);
