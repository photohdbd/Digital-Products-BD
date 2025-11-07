import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Password') {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-lifted">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-gray-500">Enter the administrator password.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-base-200 border border-base-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
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
