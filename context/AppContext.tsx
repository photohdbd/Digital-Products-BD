import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus, CustomerDetails, PaymentMethod, ContactMessage, User } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  messages: ContactMessage[];
  isAuthenticated: boolean;
  currentUser: User | null;
  recentlyViewed: Product[];
  addToCart: (product: Product, quantity: number, selectedPlan?: Product['plans'][0]) => void;
  removeFromCart: (productId: string, planName?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, planName?: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId:string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (customer: CustomerDetails, paymentMethod: PaymentMethod, transactionId?: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  toggleProductStatus: (productId: string) => void;
  submitContactForm: (name: string, email: string, message: string) => void;
  addRecentlyViewed: (product: Product) => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass: string) => boolean;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number, selectedPlan?: Product['plans'][0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id && item.selectedPlan?.name === selectedPlan?.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id && item.selectedPlan?.name === selectedPlan?.name
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { product, quantity, selectedPlan }];
    });
  };

  const removeFromCart = (productId: string, planName?: string) => {
    setCart(prevCart => prevCart.filter(item => 
        !(item.product.id === productId && item.selectedPlan?.name === planName)
    ));
  };

  const updateCartQuantity = (productId: string, quantity: number, planName?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, planName);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          (item.product.id === productId && item.selectedPlan?.name === planName) 
            ? { ...item, quantity } 
            : item
        )
      );
    }
  };
  
  const clearCart = () => {
      setCart([]);
  }

  const isInCart = (productId: string) => cart.some(item => item.product.id === productId);
  
  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
        if(prev.find(p => p.id === product.id)) return prev;
        return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };
  
  const isInWishlist = (productId: string) => wishlist.some(item => item.id === productId);
  
  const placeOrder = (customer: CustomerDetails, paymentMethod: PaymentMethod, transactionId?: string) => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      customer: { ...customer, email: currentUser?.email || customer.email },
      items: [...cart],
      total: cart.reduce((sum, item) => {
          const price = item.selectedPlan?.price || item.product.discountPrice || item.product.price;
          return sum + price * item.quantity;
      }, 0),
      paymentMethod,
      transactionId,
      status: OrderStatus.Pending,
      orderDate: new Date().toISOString(),
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
  };
  
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
      setOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  
  const toggleProductStatus = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? {...p, isLive: !p.isLive} : p))
  };

  const submitContactForm = (name: string, email: string, message: string) => {
      const newMessage: ContactMessage = {
          id: `msg-${Date.now()}`,
          name,
          email,
          message,
          receivedAt: new Date().toISOString(),
      };
      setMessages(prev => [newMessage, ...prev]);
  };

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
        const newRecentlyViewed = [product, ...prev.filter(p => p.id !== product.id)];
        return newRecentlyViewed.slice(0, 4); // Keep only the last 4 viewed products
    });
  }
  
  // Mock Auth functions
  const login = (email: string, pass: string): boolean => {
      // In a real app, this would be an API call
      const mockUser: User = { id: 'user1', name: 'Test User', email: email };
      setCurrentUser(mockUser);
      setIsAuthenticated(true);
      return true;
  };
  
  const logout = () => {
      setCurrentUser(null);
      setIsAuthenticated(false);
  };
  
  const register = (name: string, email: string, pass: string): boolean => {
       // This is a mock. In a real app, it would create a user.
       return login(email, pass);
  };

  return (
    <AppContext.Provider value={{
      products,
      cart,
      wishlist,
      orders,
      messages,
      isAuthenticated,
      currentUser,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      isInCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      placeOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      toggleProductStatus,
      submitContactForm,
      addRecentlyViewed,
      login,
      logout,
      register,
    }}>
      {children}
    </AppContext.Provider>
  );
};
