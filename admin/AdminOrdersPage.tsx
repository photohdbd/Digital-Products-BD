import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { OrderStatus } from '../types';

const AdminOrdersPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { orders, updateOrderStatus } = context;
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending: return 'border-yellow-500';
      case OrderStatus.Processing: return 'border-blue-500';
      case OrderStatus.Delivered: return 'border-green-500';
      case OrderStatus.Cancelled: return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Order Management</h1>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className={`bg-base-200 p-6 rounded-xl shadow-subtle border-l-4 ${getStatusColor(order.status)}`}>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
              <div>
                <p className="font-mono text-sm text-gray-400">ORDER #{order.id}</p>
                <p className="text-xl font-bold text-white">{order.customer.fullName}</p>
                <p className="text-gray-300">{order.customer.email} | {order.customer.mobile}</p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <p className="text-2xl font-bold text-primary">৳{order.total.toFixed(2)}</p>
                <p className="text-gray-400">{new Date(order.orderDate).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-200 mb-2">Items:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {order.items.map(item => (
                    <li key={item.product.id + (item.selectedPlan?.name || '')}>
                        {item.product.name} 
                        {item.selectedPlan ? <span className="text-sm text-gray-400"> - {item.selectedPlan.name}</span> : ''}
                        (x{item.quantity})
                    </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <p className="text-gray-300">Payment: <span className="font-semibold text-white">{order.paymentMethod}</span></p>
                {order.transactionId && <p className="text-gray-300">TxID: <span className="font-semibold text-white">{order.transactionId}</span></p>}
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <label htmlFor={`status-${order.id}`} className="text-gray-300">Status:</label>
                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                  className="bg-base-300 border border-gray-600 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {Object.values(OrderStatus).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="text-center p-8 text-gray-400 bg-base-200 rounded-xl border border-base-300">No orders have been placed yet.</p>}
      </div>
    </div>
  );
};

export default AdminOrdersPage;