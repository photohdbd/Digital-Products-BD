import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const HeroSlider: React.FC = () => {
    const context = useContext(AppContext);
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = context?.heroSlides || [];

    useEffect(() => {
        if (heroSlides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
        }, 3000);

        return () => clearInterval(timer);
    }, [heroSlides.length]);

    if (heroSlides.length === 0) {
        return (
            <div className="relative w-full h-[60vh] max-h-[500px] bg-base-200 flex items-center justify-center text-white">
                <p>No slides have been configured.</p>
            </div>
        );
    }

    const slide = heroSlides[currentSlide];

    return (
        <div className="relative w-full h-[60vh] max-h-[500px] bg-base-200 overflow-hidden">
            <div
                className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {heroSlides.map((s) => (
                    <div key={s.id} className="w-full flex-shrink-0 h-full relative">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-40" />
                    </div>
                ))}
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-6">
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.6)'}}>
                    {slide.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.6)'}}>
                    {slide.subtitle}
                </p>
                <Link
                    to={slide.buttonLink}
                    className="mt-8 inline-block bg-accent hover:bg-opacity-90 text-gray-900 font-bold py-3 px-8 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lifted"
                >
                    {slide.buttonText}
                </Link>
            </div>
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-6 bg-accent' : 'bg-white/50 hover:bg-white'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;