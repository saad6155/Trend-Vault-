export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  collection: 'vintage' | 'cyber' | 'minimal' | 'botanical';
  fit: string;
  gsm: number;
  badge?: string;
  colors: {
    name: string;
    hex: string;
    image: string;
  }[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  primaryImage: string;
  secondaryImage?: string;
  description: string;
  details: string[];
  measurements: {
    size: string;
    chest: number; // inches
    length: number; // inches
    shoulder: number; // inches
  }[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
  isCustom?: boolean;
  customDetails?: {
    text?: string;
    placement: string;
    graphicName?: string;
  };
}

export interface OrderReceipt {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: string;
  };
}
