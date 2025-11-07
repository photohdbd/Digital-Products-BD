
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
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
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending: return 'bg-yellow-500/20 text-yellow-400';
      case OrderStatus.Processing: return 'bg-blue-500/20 text-blue-400';
      case OrderStatus.Delivered: return 'bg-green-500/20 text-green-400';
      case OrderStatus.Cancelled: return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">My Account</h1>
        <button 
          onClick={handleLogout} 
          className="bg-error hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="bg-base-200 p-8 rounded-xl shadow-3d mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Account Details</h2>
        <div className="space-y-2 text-gray-300">
          <p><strong>Name:</strong> {currentUser?.name}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
        </div>
      </div>

      <div className="bg-base-200 p-8 rounded-xl shadow-3d">
        <h2 className="text-2xl font-bold text-white mb-4">My Orders</h2>
        {userOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-base-300">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map(order => (
                  <tr key={order.id} className="border-b border-base-300 last:border-0 hover:bg-base-300/50">
                    <td className="p-4 font-mono text-sm text-gray-400">{order.id}</td>
                    <td className="p-4 text-gray-300">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="p-4 text-white font-semibold">৳{order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400">You have not placed any orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
