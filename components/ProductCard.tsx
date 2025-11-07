
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { AppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(AppContext);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    context?.addToCart(product, 1);
  }
  
  return (
    <Link to={`/product/${product.id}`} className="block group bg-base-200 rounded-xl overflow-hidden shadow-3d hover:shadow-3d-hover transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105" />
        {product.discountPrice && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">SALE</div>
        )}
      </div>
      <div className="p-5">
        <p className="text-sm text-secondary mb-1">{product.category}</p>
        <h3 className="text-xl font-bold text-white truncate group-hover:text-accent transition-colors duration-300">{product.name}</h3>
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            {product.discountPrice ? (
              <div className="flex items-baseline space-x-2">
                <p className="text-2xl font-bold text-accent">৳{product.discountPrice.toFixed(2)}</p>
                <p className="text-lg text-gray-500 line-through">৳{product.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-2xl font-bold text-white">৳{product.price.toFixed(2)}</p>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-primary hover:bg-opacity-80 text-white transition-all duration-300 transform group-hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
