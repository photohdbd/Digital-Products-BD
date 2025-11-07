
import React, { createContext, useState, ReactNode } from 'react';
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
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
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

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
      setCart([]);
  }

  const isInCart = (productId: string) => cart.some(item => item.id === productId);
  
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
      customer,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0),
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
  
  // Mock Auth functions
  const login = (email: string, pass: string): boolean => {
      console.log("Attempting login for", email, pass);
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
       console.log("Registering", name, email, pass);
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
      login,
      logout,
      register,
    }}>
      {children}
    </AppContext.Provider>
  );
};
