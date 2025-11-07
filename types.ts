export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
  discountUntil?: string; // ISO 8601 date string
  tags: string[];
  category: string;
  isLive: boolean;
  plans?: {
    name: string;
    price: number;
    originalPrice?: number;
  }[];
  details?: {
    [key: string]: string | string[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPlan?: Product['plans'][0];
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  OnTheWay = 'On The Way',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export enum PaymentMethod {
  BKash = 'bKash (Send Money)',
  Nagad = 'Nagad (Send Money)',
  Rocket = 'Rocket (Send Money)',
  Bank = 'Bank Transfer',
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  status: OrderStatus;
  orderDate: string; // ISO 8601 date string
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    receivedAt: string;
}

export interface Review {
    id: string;
    name: string;
    title: string;
    comment: string;
    rating: number;
    avatarUrl: string;
}

export interface SpecialOffer {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    link: string;
}