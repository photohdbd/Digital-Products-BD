
import { Product, BlogPost, Review } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod1',
    name: 'ProWriter AI Subscription (1 Month)',
    description: 'Get a one-month subscription to the leading AI writing assistant. Perfect for blogs, marketing copy, and academic papers.',
    images: ['https://picsum.photos/seed/prowriter/800/600'],
    price: 1200.00,
    discountPrice: 950.00,
    tags: ['ai', 'writing', 'subscription'],
    category: 'Writing Tools',
    isLive: true,
  },
  {
    id: 'prod2',
    name: 'Edufy Premium Account (1 Year)',
    description: 'Unlock a full year of access to Edufy\'s extensive library of educational courses and resources. Learn from industry experts.',
    images: ['https://picsum.photos/seed/edufy/800/600'],
    price: 4500.00,
    tags: ['education', 'courses', 'e-learning'],
    category: 'Educational Tools',
    isLive: true,
  },
  {
    id: 'prod3',
    name: 'PixelPerfect Graphics Suite License',
    description: 'A lifetime license for the PixelPerfect Graphics Suite. A powerful alternative to expensive design software.',
    images: ['https://picsum.photos/seed/pixelperfect/800/600'],
    price: 3500.00,
    discountPrice: 2999.00,
    tags: ['graphics', 'design', 'software', 'license'],
    category: 'Graphics Tools',
    isLive: true,
  },
  {
    id: 'prod4',
    name: 'SecureTunnel VPN (6 Months)',
    description: 'Protect your online privacy with a 6-month subscription to SecureTunnel VPN. Fast, reliable, and secure.',
    images: ['https://picsum.photos/seed/vpn/800/600'],
    price: 2500.00,
    tags: ['vpn', 'security', 'privacy'],
    category: 'VPN',
    isLive: true,
  },
   {
    id: 'prod5',
    name: 'MarketBoost Pro Plan (3 Months)',
    description: 'Supercharge your marketing efforts with 3 months of MarketBoost Pro. Includes SEO tools, email marketing, and social media analytics.',
    images: ['https://picsum.photos/seed/marketboost/800/600'],
    price: 5000.00,
    tags: ['marketing', 'seo', 'analytics'],
    category: 'Marketing Tools',
    isLive: true,
  },
  {
    id: 'prod6',
    name: '$10 Global Gift Card',
    description: 'A $10 gift card redeemable on major international platforms. The perfect gift for gamers and shoppers.',
    images: ['https://picsum.photos/seed/giftcard/800/600'],
    price: 1150.00,
    tags: ['gift card', 'gaming', 'shopping'],
    category: 'Gift Cards',
    isLive: false,
  },
];

export const MOCK_CATEGORIES = [
  'Writing Tools',
  'Educational Tools',
  'Graphics Tools',
  'VPN',
  'Marketing Tools',
  'Gift Cards'
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
    { id: 'blog1', title: 'Top 5 AI Writing Tools for 2024', author: 'Admin', date: '2024-07-15', excerpt: 'Discover the best AI tools that can help you write faster and smarter. We compare features, pricing, and more...', imageUrl: 'https://picsum.photos/seed/blog1/400/250' },
    { id: 'blog2', title: 'Why Every Bangladeshi Needs a VPN', author: 'Admin', date: '2024-07-10', excerpt: 'In today\'s digital age, online privacy is more important than ever. Learn how a VPN can protect you.', imageUrl: 'https://picsum.photos/seed/blog2/400/250' },
    { id: 'blog3', title: 'How to Choose the Right Graphics Tool for Your Needs', author: 'Admin', date: '2024-07-05', excerpt: 'Whether you\'re a professional designer or a hobbyist, this guide will help you select the perfect graphics software.', imageUrl: 'https://picsum.photos/seed/blog3/400/250' },
];

export const MOCK_REVIEWS: Review[] = [
    { id: 'rev1', name: 'Anik Rahman', title: 'Fast Delivery!', comment: 'Got my software license key within 10 minutes. Excellent service!', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev1' },
    { id: 'rev2', name: 'Sadia Islam', title: 'Authentic Products', comment: 'The subscription worked perfectly. I will definitely buy again from here.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev2' },
    { id: 'rev3', name: 'Kamal Hossain', title: 'Great Support', comment: 'I had a small issue and the support team was very helpful and resolved it quickly.', rating: 4, avatarUrl: 'https://i.pravatar.cc/150?u=rev3' },
];
