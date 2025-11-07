
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { cart, updateCartQuantity, removeFromCart } = context;

  const total = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center bg-base-200 p-12 rounded-xl shadow-3d">
          <h2 className="text-2xl text-gray-300">Your cart is empty.</h2>
          <Link to="/shop" className="mt-6 inline-block bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col md:flex-row items-center bg-base-200 p-4 rounded-lg shadow-lg">
                <img src={item.images[0]} alt={item.name} className="w-32 h-32 object-cover rounded-md mb-4 md:mb-0" />
                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <p className="text-gray-400">৳{(item.discountPrice || item.price).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 bg-base-300 border border-base-100 rounded-md py-1 px-2 text-center text-white"
                  />
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow-3d h-fit">
            <h2 className="text-2xl font-bold text-white border-b border-base-300 pb-4">Order Summary</h2>
            <div className="flex justify-between items-center my-4 text-lg">
              <span className="text-gray-300">Subtotal</span>
              <span className="font-semibold text-white">৳{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center my-4 text-lg">
              <span className="text-gray-300">Shipping</span>
              <span className="font-semibold text-white">Free (Digital)</span>
            </div>
            <div className="flex justify-between items-center my-4 text-2xl font-bold border-t border-base-300 pt-4">
              <span className="text-white">Total</span>
              <span className="text-accent">৳{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="w-full mt-4 block text-center bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
