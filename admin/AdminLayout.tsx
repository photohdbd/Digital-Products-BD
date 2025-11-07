import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/', { replace: true });
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
          <NavLink to="/admin/hero" className={linkClasses}>Hero Section</NavLink>
          <NavLink to="/admin/customers" className={linkClasses}>Customers</NavLink>
          <NavLink to="/admin/messages" className={linkClasses}>Messages</NavLink>
          <NavLink to="/" className={linkClasses}>Back to Site</NavLink>
        </nav>
        <div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                <span>Logout</span>
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