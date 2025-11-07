import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { AppContext } from '../context/AppContext';
import { MOCK_REVIEWS } from '../constants';
import HeroSlider from '../components/HeroSlider';

const Feature: React.FC<{ icon: React.ReactNode; title: string; }> = ({ icon, title }) => (
    <div className="bg-base-200 p-4 rounded-lg shadow-subtle text-center border border-base-300 flex items-center justify-center space-x-3">
        <div className="flex-shrink-0 text-primary">
            {icon}
        </div>
        <h3 className="text-md font-bold text-gray-300">{title}</h3>
    </div>
);

const SpecialOfferCard: React.FC<{title: string, subtitle: string, image: string, link: string}> = ({title, subtitle, image, link}) => (
    <Link to={link} className="block group bg-base-200 p-4 rounded-lg shadow-subtle border border-base-300 text-center transition-all duration-300 hover:shadow-lifted hover:-translate-y-1 hover:border-primary">
        <img src={image} alt={title} className="w-full h-32 object-contain mx-auto mb-4"/>
        <h3 className="text-xl font-bold text-white group-hover:text-primary">{title}</h3>
        <p className="text-gray-400 mt-1 text-sm">{subtitle}</p>
    </Link>
)

const ReviewCard: React.FC<{review: typeof MOCK_REVIEWS[0]}> = ({ review }) => (
    <div className="bg-base-200 p-6 rounded-lg shadow-subtle border border-base-300 w-full flex-shrink-0">
        <div className="flex items-center mb-4">
            <img src={review.avatarUrl} alt={review.name} className="w-14 h-14 rounded-full mr-4" />
            <div>
                <h4 className="font-bold text-white text-lg">{review.name}</h4>
                <p className="text-sm text-primary font-semibold">{review.title}</p>
            </div>
        </div>
        <p className="text-gray-300">"{review.comment}"</p>
    </div>
);

const HomePage: React.FC = () => {
    const context = useContext(AppContext);
    const [currentReview, setCurrentReview] = useState(0);

     useEffect(() => {
        const timer = setInterval(() => {
            setCurrentReview((prev) => (prev === MOCK_REVIEWS.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    if (!context) return null;

    const { products, specialOffers } = context;
    const liveProducts = products.filter(p => p.isLive);
    const featuredProducts = liveProducts.slice(0, 8);

    return (
        <div className="space-y-12 md:space-y-20 pb-16">
            <HeroSlider />

            <div className="container mx-auto px-6 space-y-20">
                {specialOffers.length > 0 && (
                     <section>
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Special Offer</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {specialOffers.map(offer => <SpecialOfferCard key={offer.id} {...offer} />)}
                        </div>
                    </section>
                )}
                
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

                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </section>
                
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">How to Buy</h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div className="bg-base-200 p-6 rounded-lg">
                            <div className="text-4xl text-primary mb-2">①</div>
                            <h3 className="font-bold text-white">Select Product</h3>
                            <p className="text-sm text-gray-400">Browse our shop and choose the product you need.</p>
                        </div>
                         <div className="bg-base-200 p-6 rounded-lg">
                            <div className="text-4xl text-primary mb-2">②</div>
                            <h3 className="font-bold text-white">Add to Cart</h3>
                            <p className="text-sm text-gray-400">Add the product to your cart and proceed to checkout.</p>
                        </div>
                         <div className="bg-base-200 p-6 rounded-lg">
                            <div className="text-4xl text-primary mb-2">③</div>
                            <h3 className="font-bold text-white">Make Payment</h3>
                            <p className="text-sm text-gray-400">Pay using bKash, Nagad, or Rocket and provide the TxID.</p>
                        </div>
                         <div className="bg-base-200 p-6 rounded-lg">
                            <div className="text-4xl text-primary mb-2">④</div>
                            <h3 className="font-bold text-white">Receive Product</h3>
                            <p className="text-sm text-gray-400">Get your digital product delivered to your email instantly.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">Reviews</h2>
                    <p className="text-center text-gray-400 mb-12 -mt-4">What our clients say about us?</p>
                    <div className="max-w-xl mx-auto overflow-hidden relative pb-8">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentReview * 100}%)` }}
                        >
                            {MOCK_REVIEWS.map((review) => (
                                <div key={review.id} className="w-full flex-shrink-0">
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
                            {MOCK_REVIEWS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentReview(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentReview === index ? 'w-5 bg-primary' : 'w-2 bg-base-300 hover:bg-primary/50'}`}
                                    aria-label={`Go to review ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default HomePage;