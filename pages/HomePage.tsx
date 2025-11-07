
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { MOCK_CATEGORIES, MOCK_REVIEWS } from '../constants';

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-base-200 p-6 rounded-xl shadow-lg text-center transform transition duration-300 hover:-translate-y-2">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);


const HomePage: React.FC = () => {
    const context = useContext(AppContext);
    if (!context) return null;

    const { products } = context;
    const liveProducts = products.filter(p => p.isLive);
    const featuredProducts = liveProducts.slice(0, 4);

    return (
        <div className="space-y-16 md:space-y-24 pb-16">
            {/* Hero Banner */}
            <div className="relative text-white text-center py-20 md:py-32 px-6 overflow-hidden bg-base-200">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-900 opacity-80 z-0"></div>
                <div className="absolute inset-0 opacity-10 z-0" style={{backgroundImage: `radial-gradient(#fff 0.5px, transparent 0.5px), radial-gradient(#fff 0.5px, #121212 0.5px)`, backgroundSize: `20px 20px`, backgroundPosition: `0 0, 10px 10px`}}></div>
                <div className="relative z-10 container mx-auto">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                        Authentic Digital Products in Bangladesh
                    </h1>
                    <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto text-gray-200">
                        Your one-stop shop for subscriptions, software licenses, gift cards, and more.
                    </p>
                    <Link
                        to="/shop"
                        className="mt-8 inline-block bg-accent hover:bg-opacity-80 text-white font-bold py-4 px-10 text-lg rounded-full transition-all duration-300 transform hover:scale-110 shadow-3d hover:shadow-3d-hover"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <section className="container mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Feature 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                        title="Authentic Products"
                        description="We guarantee 100% genuine licenses and subscriptions from official sources."
                    />
                    <Feature 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                        title="Fast Delivery"
                        description="Receive your digital products via email within minutes of payment confirmation."
                    />
                     <Feature 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                        title="Secure Checkout"
                        description="Your payments are processed securely through trusted local gateways."
                    />
                </div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {MOCK_CATEGORIES.map(category => (
                        <Link key={category} to="/shop" className="group block text-center bg-base-200 p-6 rounded-xl shadow-3d hover:shadow-3d-hover hover:bg-primary transition-all duration-300 transform hover:-translate-y-2">
                           <p className="font-semibold text-lg text-white group-hover:text-white">{category}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_REVIEWS.map(review => (
                        <div key={review.id} className="bg-base-200 p-6 rounded-xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <img src={review.avatarUrl} alt={review.name} className="w-14 h-14 rounded-full mr-4" />
                                <div>
                                    <h4 className="font-bold text-white text-lg">{review.name}</h4>
                                    <p className="text-sm text-gray-400">{review.title}</p>
                                </div>
                            </div>
                            <p className="text-gray-300">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
