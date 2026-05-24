export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image_url?: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  discount_price?: number;
  category_id: string;
  image_url: string;
  specs?: Record<string, string>;
  stock_quantity: number;
  is_active: boolean;
}

export interface CartItem extends Product {
  cartItemId: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  address: Address;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'cod' | 'online';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}
