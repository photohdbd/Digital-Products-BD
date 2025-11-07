import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { cart, updateCartQuantity, removeFromCart } = context;

  const total = cart.reduce((sum, item) => {
    const price = item.selectedPlan?.price || item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center bg-base-100 p-12 rounded-xl shadow-subtle border border-base-300">
          <h2 className="text-2xl text-gray-700">Your cart is empty.</h2>
          <Link to="/shop" className="mt-6 inline-block bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => {
              const price = item.selectedPlan?.price || item.product.discountPrice || item.product.price;
              const uniqueKey = item.product.id + (item.selectedPlan?.name || '');
              
              return (
              <div key={uniqueKey} className="flex flex-col md:flex-row items-center bg-base-100 p-4 rounded-lg shadow-subtle border border-base-300">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-contain rounded-md mb-4 md:mb-0" />
                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                  {item.selectedPlan && <p className="text-sm text-gray-500">{item.selectedPlan.name}</p>}
                  <p className="text-gray-600 mt-1 font-semibold">৳{price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 1, item.selectedPlan?.name)}
                    className="w-16 bg-base-200 border border-base-300 rounded-md py-1 px-2 text-center text-gray-800"
                  />
                  <button onClick={() => removeFromCart(item.product.id, item.selectedPlan?.name)} className="text-red-500 hover:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )})}
          </div>
          <div className="bg-base-100 p-6 rounded-lg shadow-subtle h-fit border border-base-300">
            <h2 className="text-2xl font-bold text-gray-800 border-b border-base-300 pb-4">Order Summary</h2>
            <div className="flex justify-between items-center my-4 text-lg">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800">৳{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center my-4 text-lg">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-gray-800">Free (Digital)</span>
            </div>
            <div className="flex justify-between items-center my-4 text-2xl font-bold border-t border-base-300 pt-4">
              <span className="text-gray-900">Total</span>
              <span className="text-primary">৳{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="w-full mt-4 block text-center bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;