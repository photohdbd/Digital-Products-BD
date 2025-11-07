
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have auth logic here.
    // For this prototype, any input works.
    sessionStorage.setItem('isAdminLoggedIn', 'true');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-base-300 rounded-2xl shadow-3d">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="mt-2 text-gray-400">Welcome back, administrator.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-base-100 border border-base-200 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-base-100 border border-base-200 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

// A simple protected route wrapper
export const ProtectedAdminRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const navigate = useNavigate();
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';

    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate('/admin', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <>{children}</> : null;
};


export default AdminLoginPage;
