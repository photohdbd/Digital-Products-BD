
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CountdownTimer from '../components/CountdownTimer';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!context) return <div>Loading...</div>;

  const { products, addToCart } = context;
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center text-2xl text-red-500">Product not found.</div>;
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
      addToCart(product, quantity);
  };

  const handleBuyNow = () => {
      addToCart(product, quantity);
      navigate('/checkout');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-base-200 rounded-xl shadow-3d overflow-hidden mb-4">
            <img src={product.images[activeImage]} alt={`${product.name} view ${activeImage + 1}`} className="w-full h-auto object-cover aspect-video" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <button key={index} onClick={() => setActiveImage(index)} className={`w-1/4 rounded-lg overflow-hidden border-2 ${index === activeImage ? 'border-primary' : 'border-transparent'}`}>
                <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-auto object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{product.name}</h1>
          <p className="text-lg text-secondary mt-2">{product.category}</p>
          
          <div className="my-6">
            {product.discountPrice ? (
              <div className="flex items-baseline space-x-3">
                <p className="text-4xl font-bold text-accent">৳{product.discountPrice.toFixed(2)}</p>
                <p className="text-2xl text-gray-500 line-through">৳{product.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-4xl font-bold text-white">৳{product.price.toFixed(2)}</p>
            )}
          </div>
          
          {product.discountUntil && new Date(product.discountUntil) > new Date() && (
            <div>
                <p className="font-semibold text-white mb-2">Offer ends in:</p>
                <CountdownTimer targetDate={product.discountUntil} />
            </div>
          )}

          <p className="text-gray-300 leading-relaxed my-6">{product.description}</p>
          
          <div className="flex items-center space-x-2 mb-6">
            {product.tags.map(tag => (
              <span key={tag} className="bg-base-300 text-secondary text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <label htmlFor="quantity" className="mr-4 font-semibold text-white">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))} 
                className="w-20 bg-base-200 border border-base-300 rounded-md py-2 px-3 text-center text-white" 
              />
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="flex-1 border-2 border-primary text-primary font-bold py-3 px-8 rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
          <div className="mt-24">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
          </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
