
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = context?.login(email, password);
    if (success) {
      navigate('/account');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-base-300 rounded-2xl shadow-3d">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Login to Your Account</h1>
          <p className="mt-2 text-gray-400">Welcome back!</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center bg-red-500/10 p-2 rounded-md">{error}</p>}
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
          <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Sign in
          </button>
          <p className="text-center text-gray-400">
              Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
