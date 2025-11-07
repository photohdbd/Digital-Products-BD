import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/admin', { replace: true });
  }

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-base-300 hover:text-white'}`;
  
  return (
    <div className="flex min-h-screen bg-base-100">
      <aside className="w-64 bg-base-200 p-4 shadow-lg flex-shrink-0 flex flex-col">
        <h1 className="text-2xl font-bold text-white text-center mb-8">Admin Panel</h1>
        <nav className="space-y-2 flex-grow">
          <NavLink to="/admin/dashboard" className={linkClasses}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={linkClasses}>Products</NavLink>
          <NavLink to="/admin/orders" className={linkClasses}>Orders</NavLink>
          <NavLink to="/admin/offers" className={linkClasses}>Offers</NavLink>
          <NavLink to="/admin/customers" className={linkClasses}>Customers</NavLink>
          <NavLink to="/admin/messages" className={linkClasses}>Messages</NavLink>
          <NavLink to="/" className={linkClasses}>Back to Site</NavLink>
        </nav>
        <div>
            <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20">
                Logout
            </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;