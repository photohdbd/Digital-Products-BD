
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
}

export interface CartItem extends Product {
  quantity: number;
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
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    receivedAt: string;
}

export interface BlogPost {
    id: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    imageUrl: string;
}

export interface Review {
    id: string;
    name: string;
    title: string;
    comment: string;
    rating: number;
    avatarUrl: string;
}
