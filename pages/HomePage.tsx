import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { MOCK_REVIEWS } from '../constants';
import HeroSlider from '../components/HeroSlider';

const Feature: React.FC<{ icon: React.ReactNode; title: string; }> = ({ icon, title }) => (
    <div className="bg-base-100 p-4 rounded-lg shadow-subtle text-center border border-base-300 flex items-center justify-center space-x-3">
        <div className="flex-shrink-0 text-primary">
            {icon}
        </div>
        <h3 className="text-md font-bold text-gray-700">{title}</h3>
    </div>
);

const SpecialOfferCard: React.FC<{title: string, subtitle: string}> = ({title, subtitle}) => (
    <div className="bg-base-100 p-6 rounded-lg shadow-subtle border border-base-300 text-center transition-all duration-300 hover:shadow-lifted hover:-translate-y-1">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 mt-1">{subtitle}</p>
    </div>
)

const HomePage: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { products } = context;
    const liveProducts = products.filter(p => p.isLive);
    const featuredProducts = liveProducts.slice(0, 8);

    return (
        <div className="space-y-12 md:space-y-20 pb-16">
            {/* Hero Slider */}
            <HeroSlider />

            <div className="container mx-auto px-6 space-y-20">
                {/* Special Offer */}
                 <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Special Offer</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SpecialOfferCard title="ইউটিউব প্রিমিয়াম" subtitle="Quietest Premium Price in BD"/>
                        <SpecialOfferCard title="কুইলবট প্রিমিয়াম" subtitle="Quillbot Premium Price in BD"/>
                        <SpecialOfferCard title="পিক্সিফাইট এআই" subtitle="Pixifiy AI Pro"/>
                        <SpecialOfferCard title="হিক্স এআই" subtitle="Hix AI Price in BD"/>
                    </div>
                </section>
                
                {/* Features Section */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Feature 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                        title="Authentic Product"
                    />
                    <Feature 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        title="Fast Delivery"
                    />
                     <Feature 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                        title="10AM-11PM Support"
                    />
                    <Feature 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                        title="Secure Checkout"
                    />
                </section>


                {/* Featured Products */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </section>
                
                 {/* How to buy */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">How to buy</h2>
                    <div className="max-w-4xl mx-auto bg-black rounded-lg shadow-lifted h-80 flex items-center justify-center">
                        <p className="text-white text-2xl">Video Player Placeholder</p>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">Reviews</h2>
                    <p className="text-center text-gray-500 mb-12 -mt-4">What our clients say about us?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {MOCK_REVIEWS.slice(0, 2).map(review => (
                            <div key={review.id} className="bg-base-100 p-6 rounded-lg shadow-subtle border border-base-300">
                                <div className="flex items-center mb-4">
                                    <img src={review.avatarUrl} alt={review.name} className="w-14 h-14 rounded-full mr-4" />
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{review.name}</h4>
                                        <p className="text-sm text-primary font-semibold">{review.title}</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                 {/* Hostinger Ad */}
                 <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-12 rounded-lg text-center">
                    <h2 className="text-3xl font-bold">We recommend Hostinger</h2>
                    <p className="mt-2">Hostinger was among the the fastest web hosting services, and the best price on the planet.</p>
                    <a href="#" className="mt-6 inline-block bg-accent hover:bg-opacity-90 text-gray-900 font-bold py-3 px-8 rounded-lg">Get Offer</a>
                </section>

            </div>
        </div>
    );
};

export default HomePage;
