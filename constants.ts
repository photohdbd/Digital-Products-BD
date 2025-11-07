import { Product, Review, User, SpecialOffer } from './types';

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
      "Why Buy From DigiBD?": "Fast & transparent delivery, guaranteed authentic account, and dedicated support.",
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
    { id: 'rev1', name: 'Ziaul Khan', title: 'Recommends DigiBD', comment: 'I always buy digital products from digibd, and I am blown away by your service.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev1' },
    { id: 'rev2', name: 'Jannatul Nayeem', title: 'Recommends DigiBD', comment: 'I am your regular customer. Recommend them they are reliable.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev2' },
    { id: 'rev3', name: 'Kamal Hossain', title: 'Great Support', comment: 'I had a small issue and the support team was very helpful and resolved it quickly.', rating: 4, avatarUrl: 'https://i.pravatar.cc/150?u=rev3' },
    { id: 'rev4', name: 'আফরিন সুলতানা', title: 'খুবই ভালো সার্ভিস', comment: 'আমি সবসময় এখান থেকেই আমার প্রয়োজনীয় ডিজিটাল প্রোডাক্ট কিনি। ডেলিভারি খুব দ্রুত এবং সাপোর্টও চমৎকার।', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev4' },
    { id: 'rev5', name: 'David Lee', title: 'Smooth Transaction', comment: 'The purchase process was incredibly smooth and I received my product key within minutes. Highly recommended!', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev5' },
    { id: 'rev6', name: 'সাবরিনা চৌধুরী', title: 'নির্ভরযোগ্য একটি প্ল্যাটফর্ম', comment: 'ডিজিটাল প্রোডাক্ট কেনার জন্য এটি আমার প্রথম পছন্দ। তাদের সততা এবং দ্রুত ডেলিভারির জন্য আমি মুগ্ধ।', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev6' },
    { id: 'rev7', name: 'Michael Chen', title: 'Excellent Customer Service', comment: 'Had a question about a product and their support team responded almost instantly. Very impressive service.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev7' },
    { id: 'rev8', name: 'তানভীর আহমেদ', title: 'সেরা দাম', comment: 'অন্যান্য সাইটের তুলনায় এখানে দাম অনেক কম এবং প্রোডাক্টগুলো ১০০% আসল। ধন্যবাদ DigiBD!', rating: 4, avatarUrl: 'https://i.pravatar.cc/150?u=rev8' },
    { id: 'rev9', name: 'Emily White', title: 'Will buy again!', comment: 'Found exactly what I was looking for. The website is easy to navigate. A+ experience.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev9' },
    { id: 'rev10', name: 'মোঃ রাশেদুল ইসলাম', title: 'আমার অভিজ্ঞতা', comment: 'প্রথমে একটু দ্বিধায় ছিলাম, কিন্তু প্রোডাক্ট হাতে পাওয়ার পর সব দ্বিধা দূর হয়ে গেছে। আপনারা সত্যিই প্রশংসার যোগ্য।', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev10' },
    { id: 'rev11', name: 'Jessica Brown', title: 'Fantastic Selection', comment: 'They have a wide variety of digital tools that I couldn\'t find elsewhere. This is my new go-to site.', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev11' },
    { id: 'rev12', name: 'ফারজানা হক', title: 'বিশ্বাসের সাথে কেনাকাটা', comment: 'আমি আমার বন্ধুদেরও এই সাইটটি রিকমেন্ড করেছি। তারা সবাই খুব খুশি।', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev12' },
    { id: 'rev13', name: 'Chris Green', title: 'Quick and Easy', comment: 'From finding the product to checkout, everything was quick and easy. No hassle at all.', rating: 4, avatarUrl: 'https://i.pravatar.cc/150?u=rev13' },
    { id: 'rev14', name: 'নুসরাত জাহান', title: 'অসাধারণ সাপোর্ট', comment: 'আমার পেমেন্ট নিয়ে একটি সমস্যা হয়েছিল, কিন্তু তাদের সাপোর্ট টিম খুব দ্রুত সমাধান করে দিয়েছে।', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev14' },
    { id: 'rev15', name: 'Brian Miller', title: 'Legit and Reliable', comment: 'Got my software license instantly. It is legit and works perfectly. Thank you, DigiBD team!', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=rev15' }
];

export const MOCK_USERS: User[] = [
    {id: 'user-0', name: 'Admin User', email: 'admin@test.com', password: 'password'},
    {id: 'user-1', name: 'Test User', email: 'test@test.com', password: 'password'},
];

export const MOCK_SPECIAL_OFFERS: SpecialOffer[] = [
    {id: 'offer-1', title: 'ইউটিউব প্রিমিয়াম', subtitle: 'Quietest Premium Price in BD', image: 'https://i.imgur.com/7b7TqCj.png', link: '/product/prod-capcutpro' },
    {id: 'offer-2', title: 'কুইলবট প্রিমিয়াম', subtitle: 'Quillbot Premium Price in BD', image: 'https://i.imgur.com/uRkHSx3.png', link: '/product/prod-paperpal' },
    {id: 'offer-3', title: 'পিক্সিফাইট এআই', subtitle: 'Pixifiy AI Pro', image: 'https://i.imgur.com/o2Kx6hG.png', link: '/product/prod-hivai' },
    {id: 'offer-4', title: 'হিক্স এআই', subtitle: 'Hix AI Price in BD', image: 'https://i.imgur.com/X4yq7T2.png', link: '/product/prod-hivai' },
];