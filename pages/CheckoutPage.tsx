import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const CheckoutPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [customerDetails, setCustomerDetails] = useState({
    fullName: context?.currentUser?.name || '',
    email: context?.currentUser?.email || '',
    mobile: '',
    address: 'N/A', // Default for digital products
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BKash);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (context?.currentUser) {
        setCustomerDetails(prev => ({...prev, email: context.currentUser.email, fullName: context.currentUser.name}));
    }
  }, [context?.currentUser]);
  
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
      navigate('/account');
  }

  const renderPaymentDetails = () => {
    const isSendMoney = paymentMethod === PaymentMethod.BKash || paymentMethod === PaymentMethod.Nagad || paymentMethod === PaymentMethod.Rocket;
    if (isSendMoney || paymentMethod === PaymentMethod.Bank) {
      return (
        <div className="mt-4 bg-base-100 p-4 rounded-md">
            <p className="text-gray-300">Please send money to: <span className="font-bold text-primary">01234567890 ({paymentMethod})</span></p>
            <p className="text-gray-400 text-sm mt-1">Please include your name as reference.</p>
            <input
                type="text"
                placeholder="Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                required
                className="w-full mt-2 bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
      );
    }
    return null;
  }

  const total = cart.reduce((sum, item) => {
    const price = item.selectedPlan?.price || item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="bg-base-200 p-8 rounded-xl shadow-subtle border border-base-300">
          <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>
          <div className="space-y-4">
            <input type="text" name="fullName" placeholder="Full Name" value={customerDetails.fullName} onChange={handleInputChange} required className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="email" name="email" placeholder="Email" value={customerDetails.email} onChange={handleInputChange} required className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            <input type="tel" name="mobile" placeholder="Mobile Number" value={customerDetails.mobile} onChange={handleInputChange} required className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Payment Method</h2>
          <div className="space-y-2">
            {Object.values(PaymentMethod).map(method => (
              <label key={method} className="flex items-center p-3 bg-base-300 rounded-md cursor-pointer">
                <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="form-radio h-5 w-5 text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-offset-base-200" />
                <span className="ml-3 text-gray-200">{method}</span>
              </label>
            ))}
          </div>
          {renderPaymentDetails()}
          
          <button type="submit" className="w-full mt-8 bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Place Order (৳{total.toFixed(2)})
          </button>
        </form>

        <div className="bg-base-200 p-8 rounded-xl shadow-subtle h-fit border border-base-300">
          <h2 className="text-2xl font-bold text-white mb-6">Your Order</h2>
          <div className="space-y-4">
            {cart.map(item => {
                const price = item.selectedPlan?.price || item.product.discountPrice || item.product.price;
                const uniqueKey = item.product.id + (item.selectedPlan?.name || '');
                return (
                    <div key={uniqueKey} className="flex justify-between items-start">
                        <div className="flex items-start">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-contain rounded-md mr-4 bg-white p-1" />
                            <div>
                                <p className="text-gray-200 font-semibold">{item.product.name}</p>
                                {item.selectedPlan && <p className="text-sm text-gray-400">{item.selectedPlan.name}</p>}
                                <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="text-gray-200 font-semibold">৳{(price * item.quantity).toFixed(2)}</p>
                    </div>
                )
            })}
          </div>
          <div className="border-t border-base-300 mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-lg"><span className="text-gray-300">Subtotal</span> <span className="text-gray-200">৳{total.toFixed(2)}</span></div>
            <div className="flex justify-between text-2xl font-bold"><span className="text-white">Total</span> <span className="text-primary">৳{total.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={showModal} onClose={closeModal} title="Order Received!">
        <div className="text-gray-300">
            <p>Thank you for your purchase.</p>
            <p className="mt-2">You can track your order status on your account page. You will receive an email with your product details shortly after payment confirmation.</p>
            <button onClick={closeModal} className="w-full mt-4 bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg">
                View My Orders
            </button>
        </div>
    </Modal>
    </>
  );
};

export default CheckoutPage;