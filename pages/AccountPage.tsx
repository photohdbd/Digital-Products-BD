import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { OrderStatus } from '../types';

const AccountPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { currentUser, logout, orders } = context;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userOrders = orders.filter(o => o.customer.email === currentUser?.email);
  
  const getStatusPill = (status: OrderStatus) => {
    const baseClasses = 'px-3 py-1 text-xs font-semibold rounded-full';
    switch (status) {
      case OrderStatus.Pending: return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case OrderStatus.Processing: return `${baseClasses} bg-blue-100 text-blue-800`;
      case OrderStatus.OnTheWay: return `${baseClasses} bg-indigo-100 text-indigo-800`;
      case OrderStatus.Delivered: return `${baseClasses} bg-green-100 text-green-800`;
      case OrderStatus.Cancelled: return `${baseClasses} bg-red-100 text-red-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-gray-900">My Account</h1>
        <button 
          onClick={handleLogout} 
          className="bg-error hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      <div className="bg-base-100 p-8 rounded-xl shadow-subtle border border-base-300 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Details</h2>
        <div className="space-y-2 text-gray-600">
          <p><strong>Name:</strong> {currentUser?.name}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
        </div>
      </div>

      <div className="bg-base-100 p-8 rounded-xl shadow-subtle border border-base-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order History</h2>
        <p className="text-gray-500 mb-6">Track the status of your recent orders here.</p>
        {userOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-base-300">
                <tr>
                  <th className="p-4 font-semibold text-gray-600">Order ID</th>
                  <th className="p-4 font-semibold text-gray-600">Date</th>
                  <th className="p-4 font-semibold text-gray-600">Total</th>
                  <th className="p-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map(order => (
                  <tr key={order.id} className="border-b border-base-300 last:border-0 hover:bg-base-200">
                    <td className="p-4 font-mono text-sm text-gray-500">#{order.id.split('-')[1]}</td>
                    <td className="p-4 text-gray-700">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-800 font-semibold">৳{order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={getStatusPill(order.status)}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
              <p className="text-gray-500">You have not placed any orders yet.</p>
               <Link to="/shop" className="mt-4 inline-block bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-lg">
                    Start Shopping
                </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
