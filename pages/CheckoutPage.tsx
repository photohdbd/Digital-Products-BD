
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const CheckoutPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: 'N/A', // Default for digital products
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BKash);
  const [transactionId, setTransactionId] = useState('');

  if (!context) return null;
  const { cart, placeOrder } = context;

  if (cart.length === 0 && !showModal) {
      navigate('/shop');
      return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(customerDetails, paymentMethod, transactionId);
    setShowModal(true);
  };
  
  const closeModal = () => {
      setShowModal(false);
      navigate('/');
  }

  const renderPaymentDetails = () => {
    const isSendMoney = paymentMethod === PaymentMethod.BKash || paymentMethod === PaymentMethod.Nagad || paymentMethod === PaymentMethod.Rocket;
    if (isSendMoney || paymentMethod === PaymentMethod.Bank) {
      return (
        <div className="mt-4 bg-base-300 p-4 rounded-md">
            <p className="text-gray-300">Please send money to: <span className="font-bold text-accent">01234567890 ({paymentMethod})</span></p>
            <p className="text-gray-300 text-sm mt-1">Please include your Order ID as reference if possible.</p>
            <input
                type="text"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                className="w-full mt-2 bg-base-100 border border-base-200 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
      );
    }
    return null;
  }

  const total = cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="bg-base-200 p-8 rounded-xl shadow-3d">
          <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>
          <div className="space-y-4">
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required className="w-full bg-base-100 border border-base-200 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required className="w-full bg-base-100 border border-base-200 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleInputChange} required className="w-full bg-base-100 border border-base-200 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Payment Method</h2>
          <div className="space-y-2">
            {Object.values(PaymentMethod).map(method => (
              <label key={method} className="flex items-center p-3 bg-base-100 rounded-md cursor-pointer">
                <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="form-radio h-5 w-5 text-primary bg-base-300" />
                <span className="ml-3 text-white">{method}</span>
              </label>
            ))}
          </div>
          {renderPaymentDetails()}
          
          <button type="submit" className="w-full mt-8 bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Place Order
          </button>
        </form>

        <div className="bg-base-200 p-8 rounded-xl shadow-3d h-fit">
          <h2 className="text-2xl font-bold text-white mb-6">Your Order</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex items-start">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                </div>
                <p className="text-white">৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-base-300 mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-lg"><span className="text-gray-300">Subtotal</span> <span className="text-white">৳{total.toFixed(2)}</span></div>
            <div className="flex justify-between text-2xl font-bold"><span className="text-white">Total</span> <span className="text-accent">৳{total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={showModal} onClose={closeModal} title="Order Received!">
        <p className="text-gray-300">Thank you for your purchase.</p>
        <p className="text-gray-300 mt-2">You will receive an email with your product details shortly after payment confirmation.</p>
        <button onClick={closeModal} className="mt-6 w-full bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-md">
            OK
        </button>
    </Modal>
    </>
  );
};

export default CheckoutPage;
