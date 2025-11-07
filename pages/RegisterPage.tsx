import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    const result = context?.register(name, email, password);
    if (result?.success) {
      navigate('/account');
    } else {
      setError(result?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 py-12 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-base-200 rounded-2xl shadow-lifted border border-base-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create an Account</h1>
          <p className="mt-2 text-gray-400">Join us and start shopping!</p>
        </div>
        <form className="space-y-6" onSubmit={handleRegister}>
          {error && <p className="text-red-400 text-center bg-red-500/20 p-3 rounded-md">{error}</p>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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
              className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-base-300 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Create Account
          </button>
           <p className="text-center text-gray-400">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Login here</Link>
          </p>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors duration-300">
            &larr; Back to Site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;