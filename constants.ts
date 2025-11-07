import { Product, Review } from './types';

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://i.imgur.com/8nC3gUt.png',
    title: 'সেরা অফারে প্রিমিয়াম সাবস্ক্রিপশন কিনুন এখন',
    subtitle: 'অফিসিয়াল অ্যাপস কিনুন ২০% ছাড় পর্যন্ত!',
    buttonText: 'অফার দেখুন',
    buttonLink: '/shop',
  },
  {
    id: 2,
    image: 'https://i.imgur.com/9aE0VdD.png',
    title: 'VEO 3 AI Video Generator',
    subtitle: 'আপনার আইডিয়াকে ভিডিওতে রূপান্তর করুন',
    buttonText: 'এখনই কিনুন',
    buttonLink: '/product/prod-veo3',
  },
  {
    id: 3,
    image: 'https://i.imgur.com/kH8qS2J.png',
    title: 'সকল গ্রাফিক্স টুলের উপর বিশেষ ছাড়',
    subtitle: 'ডিজাইন করুন প্রফেশনালদের মতো',
    buttonText: 'সব টুলস দেখুন',
    buttonLink: '/shop',
  },
];


export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-veo3',
    name: 'Google AI Pro & Ultra with Veo 3 AI Video Generator',
    description: 'Experience the power of Google AI with Veo 3, the next-generation video generator. Create stunning videos from text prompts.',
    images: ['https://i.imgur.com/1Z2WylT.png'],
    price: 1500,
    category: 'Graphics Tools',
    tags: ['ai', 'video', 'google'],
    isLive: true,
    plans: [
      { name: 'Pro 1 Month', price: 1500, originalPrice: 1800 },
      { name: 'Ultra 1 Month', price: 2500, originalPrice: 3000 },
    ],
    details: {
      "Product Overview": "An advanced AI tool for generating high-quality videos from text prompts. It's perfect for content creators, marketers, and professionals looking to create engaging visual content efficiently.",
      "Tools & Capabilities included": ["Text-to-cinematic video generation", "Studio - creative dev environment", "Whisk - structured task & agent orchestration"],
      "Who Should Use It?": ["Content creators", "Marketers & Advertisers", "Researchers, students & professionals"],
      "Why Buy From DigitalProductsBD?": "Fast & transparent delivery, guaranteed authentic account, and dedicated support.",
      "Frequently Asked Questions (FAQ)": "Is this a monthly subscription? - Yes. Do I receive credentials? - Yes, after payment.",
    }
  },
  {
    id: 'prod-chatgpt4o',
    name: 'চ্যাটজিটিপি ৪ও',
    description: 'OpenAI এর সবচেয়ে শক্তিশালী মডেল।',
    images: ['https://i.imgur.com/7gH1sLp.png'],
    price: 1800,
    discountPrice: 1599,
    category: 'Writing Tools',
    tags: ['ai', 'chat', 'openai'],
    isLive: true,
  },
  {
    id: 'prod-paperpal',
    name: 'পেপারপাল',
    description: 'একাডেমিক রাইটিং এর জন্য সেরা AI টুল।',
    images: ['https://i.imgur.com/yX2t3cR.png'],
    price: 1200,
    category: 'Writing Tools',
    tags: ['writing', 'academic', 'ai'],
    isLive: true,
  },
  {
    id: 'prod-megabox',
    name: 'মেগা বক্স',
    description: 'সব ধরনের ফাইল স্টোরেজের সেরা সমাধান।',
    images: ['https://i.imgur.com/Qj4d2rD.png'],
    price: 999,
    discountPrice: 850,
    category: 'Cloud Storage',
    tags: ['storage', 'cloud'],
    isLive: true,
  },
  {
    id: 'prod-capcutpro',
    name: 'CapCut Pro Price in Bangladesh',
    description: 'সহজে ভিডিও এডিট করার জন্য CapCut Pro.',
    images: ['https://i.imgur.com/sW3f4tE.png'],
    price: 800,
    category: 'Graphics Tools',
    tags: ['video', 'editing'],
    isLive: true,
  },
  {
    id: 'prod-hivai',
    name: 'HIX AI Price in BD',
    description: 'আপনার লেখার গতি বাড়াতে HIX AI.',
    images: ['https://i.imgur.com/rX5w6fG.png'],
    price: 900,
    category: 'Writing Tools',
    tags: ['ai', 'writing'],
    isLive: true,
  },
   {
    id: 'prod-edu-center',
    name: 'Educational Centre',
    description: 'সকল শিক্ষামূলক টুলস একসাথে।',
    images: ['https://i.imgur.com/fT7h8uV.png'],
    price: 2500,
    category: 'Educational Tools',
    tags: ['education', 'learning'],
    isLive: true,
  },
];

export const MOCK_CATEGORIES = [
  'Writing Tools',
  'Educational Tools',
  'Graphics Tools',
  'VPN',
  'Marketing Tools',
  'Gift Cards',
  'Cloud Storage'
];

export const MOCK_REVIEWS: Review[] = [
    { id: 'rev1', name: 'Ziaul Khan', title: 'Recommends Digital Products BD', comment: 'I always buy digital products from digital products bd, and I am blown away by your service.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev1' },
    { id: 'rev2', name: 'Jannatul Nayeem', title: 'Recommends Digital Products BD', comment: 'I am your regular customer. Recommend them they are reliable.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev2' },
    { id: 'rev3', name: 'Kamal Hossain', title: 'Great Support', comment: 'I had a small issue and the support team was very helpful and resolved it quickly.', rating: 4, avatarUrl: 'https://i.pravatar.cc/150?u=rev3' },
];
