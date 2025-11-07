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
    <Link to={`/product/${product.id}`} className="block group bg-base-100 rounded-xl overflow-hidden shadow-subtle hover:shadow-lifted border border-base-300 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img src={product.images[0]} alt={product.name} className="w-full h-56 object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        {product.discountPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">SALE</div>
        )}
      </div>
      <div className="p-5 border-t border-base-300">
        <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-primary transition-colors duration-300 h-14">{product.name}</h3>
        <div className="mt-3 flex items-baseline justify-start">
          <div>
            {product.discountPrice ? (
              <div className="flex items-baseline space-x-2">
                <p className="text-xl font-bold text-primary">৳{product.discountPrice.toFixed(2)}</p>
                <p className="text-md text-gray-400 line-through">৳{product.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-xl font-bold text-primary">৳{product.price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
