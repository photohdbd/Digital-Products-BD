import React from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Core Layout
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import FAQPage from './pages/FAQPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import UserProtectedRoute from './components/UserProtectedRoute';


// Admin Components
import AdminLoginPage, { ProtectedAdminRoute } from './admin/AdminLoginPage';
import AdminLayout from './admin/AdminLayout';
import AdminDashboardPage from './admin/AdminDashboardPage';
import AdminProductsPage from './admin/AdminProductsPage';
import AdminOrdersPage from './admin/AdminOrdersPage';
import AdminMessagesPage from './admin/AdminMessagesPage';

const MainLayout = () => {
    const location = useLocation();
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isAdminRoute || isAuthRoute) {
        return <Outlet />;
    }
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={
              <UserProtectedRoute>
                <CheckoutPage />
              </UserProtectedRoute>
            } />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<FAQPage />} />

            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="refund-policy" element={<RefundPolicyPage />} />
            
            {/* User Auth Routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="account" element={
              <UserProtectedRoute>
                <AccountPage />
              </UserProtectedRoute>
            } />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
                <AdminLayout />
            </ProtectedAdminRoute>
          }>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="messages" element={<AdminMessagesPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
