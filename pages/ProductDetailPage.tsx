import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CountdownTimer from '../components/CountdownTimer';
import ProductCard from '../components/ProductCard';
import Accordion from '../components/Accordion';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const context = useContext(AppContext);
  const navigate = useNavigate();
  
  if (!context) return <div>Loading...</div>;
  const { products, addToCart, addRecentlyViewed, recentlyViewed } = context;

  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(product?.plans?.[0] || null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) {
        addRecentlyViewed(product);
        setSelectedPlan(product.plans?.[0] || null);
        window.scrollTo(0, 0);
    }
  }, [product]);


  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center text-2xl text-red-500">Product not found.</div>;
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentlyViewedProducts = recentlyViewed.filter(p => p.id !== product.id);

  const handleAddToCart = () => {
      addToCart(product, quantity, selectedPlan);
  };

  const handleBuyNow = () => {
      addToCart(product, quantity, selectedPlan);
      navigate('/checkout');
  }

  const displayPrice = selectedPlan?.price || product.discountPrice || product.price;
  const originalPrice = selectedPlan?.originalPrice || (product.discountPrice ? product.price : null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs text-gray-400 mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Products</Link></li> 
          <li>{product.name}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-white rounded-xl shadow-subtle border border-base-300 overflow-hidden mb-4">
            <img src={product.images[activeImage]} alt={`${product.name} view ${activeImage + 1}`} className="w-full h-auto object-contain p-4 aspect-square" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{product.name}</h1>
          
          <div className="my-6">
              <div className="flex items-baseline space-x-3">
                <p className="text-4xl font-bold text-primary">৳{displayPrice.toFixed(2)}</p>
                {originalPrice && <p className="text-2xl text-gray-500 line-through">৳{originalPrice.toFixed(2)}</p>}
              </div>
          </div>

          <div className="text-gray-300 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          
          {product.plans && product.plans.length > 0 && (
              <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Plan Options & Credits</h3>
                  <div className="flex flex-wrap gap-3">
                      {product.plans.map(plan => (
                          <button 
                            key={plan.name}
                            onClick={() => setSelectedPlan(plan)}
                            className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${selectedPlan?.name === plan.name ? 'bg-primary border-primary text-white' : 'bg-base-200 border-base-300 hover:border-primary text-gray-200'}`}
                          >
                              {plan.name}
                          </button>
                      ))}
                  </div>
              </div>
          )}

          <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
            <button onClick={handleAddToCart} className="flex-1 bg-gray-200 hover:bg-white text-gray-900 font-bold py-3 px-8 rounded-lg">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="flex-1 bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
          <Accordion sections={product.details || {}} />
      </div>

      {relatedProducts.length > 0 && (
          <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
          </div>
      )}
      
       {recentlyViewedProducts.length > 0 && (
          <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Recently Viewed Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recentlyViewedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
          </div>
      )}
    </div>
  );
};

export default ProductDetailPage;