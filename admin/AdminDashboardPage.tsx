import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-base-100 p-6 rounded-xl shadow-subtle border border-base-300 flex items-center space-x-4">
    <div className="bg-primary/10 text-primary p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const AdminDashboardPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return null;

  const { products, orders, messages } = context;

  const liveProductsCount = products.filter(p => p.isLive).length;
  const pendingOrders = orders.filter(o => o.status === OrderStatus.Pending);
  const totalRevenue = orders
    .filter(o => o.status === OrderStatus.Delivered)
    .reduce((sum, order) => sum + order.total, 0);

  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending: return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.Processing: return 'bg-blue-100 text-blue-800';
      case OrderStatus.Delivered: return 'bg-green-100 text-green-800';
      case OrderStatus.Cancelled: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Products" value={products.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>} />
        <StatCard title="Live Products" value={liveProductsCount} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Pending Orders" value={pendingOrders.length} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <StatCard title="Total Revenue" value={`৳${totalRevenue.toFixed(2)}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>} />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Orders</h2>
        <div className="bg-base-100 rounded-xl shadow-subtle overflow-x-auto border border-base-300">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-base-300">
                <th className="p-4 font-semibold text-gray-600">Order ID</th>
                <th className="p-4 font-semibold text-gray-600">Customer</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Total</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-base-300 last:border-0 hover:bg-base-200">
                  <td className="p-4 font-mono text-sm text-gray-500">{order.id}</td>
                  <td className="p-4 text-gray-800">{order.customer.fullName}</td>
                  <td className="p-4 text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="p-4 text-gray-800 font-semibold">৳{order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="text-center p-8 text-gray-500">No orders yet.</p>}
        </div>
        <div className="text-right mt-4">
            <Link to="/admin/orders" className="text-primary hover:underline">View All Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;