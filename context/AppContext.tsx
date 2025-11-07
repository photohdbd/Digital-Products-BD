import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus, CustomerDetails, PaymentMethod, ContactMessage, User, SpecialOffer } from '../types';
import { MOCK_PRODUCTS, MOCK_USERS, MOCK_SPECIAL_OFFERS } from '../constants';

// Helper to get initial state from localStorage or use a default value
const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.error(`Error reading from localStorage for key "${key}":`, error);
    }
    return defaultValue;
};

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  messages: ContactMessage[];
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[];
  specialOffers: SpecialOffer[];
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
  login: (email: string, pass: string) => { success: boolean, message: string };
  logout: () => void;
  register: (name: string, email: string, pass: string) => { success: boolean, message: string };
  addSpecialOffer: (offer: Omit<SpecialOffer, 'id'>) => void;
  updateSpecialOffer: (offer: SpecialOffer) => void;
  deleteSpecialOffer: (offerId: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => getInitialState('products', MOCK_PRODUCTS));
  const [cart, setCart] = useState<CartItem[]>(() => getInitialState('cart', []));
  const [wishlist, setWishlist] = useState<Product[]>(() => getInitialState('wishlist', []));
  const [orders, setOrders] = useState<Order[]>(() => getInitialState('orders', []));
  const [messages, setMessages] = useState<ContactMessage[]>(() => getInitialState('messages', []));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getInitialState('isAuthenticated', false));
  const [currentUser, setCurrentUser] = useState<User | null>(() => getInitialState('currentUser', null));
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => getInitialState('recentlyViewed', []));
  const [users, setUsers] = useState<User[]>(() => getInitialState('users', MOCK_USERS));
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>(() => getInitialState('specialOffers', MOCK_SPECIAL_OFFERS));

  // Effects to save state to localStorage whenever it changes
  useEffect(() => { try { localStorage.setItem('products', JSON.stringify(products)); } catch (e) { console.error("Failed to save products", e) } }, [products]);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated)); }, [isAuthenticated]);
  useEffect(() => { localStorage.setItem('currentUser', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('specialOffers', JSON.stringify(specialOffers)); }, [specialOffers]);

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
  
  const login = (email: string, pass: string) => {
      const user = users.find(u => u.email === email);
      if (!user) {
          return { success: false, message: 'No account found with this email. Please register.' };
      }
      if (user.password !== pass) {
          return { success: false, message: 'Incorrect password.' };
      }
      setCurrentUser(user);
      setIsAuthenticated(true);
      return { success: true, message: 'Login successful!' };
  };
  
  const logout = () => {
      setCurrentUser(null);
      setIsAuthenticated(false);
  };
  
  const register = (name: string, email: string, pass: string) => {
       const existingUser = users.find(u => u.email === email);
       if (existingUser) {
           return { success: false, message: 'An account with this email already exists.' };
       }
       const newUser: User = { id: `user-${Date.now()}`, name, email, password: pass };
       setUsers(prev => [...prev, newUser]);
       // Automatically log in the new user
       setCurrentUser(newUser);
       setIsAuthenticated(true);
       return { success: true, message: 'Registration successful!' };
  };

  const addSpecialOffer = (offerData: Omit<SpecialOffer, 'id'>) => {
      const newOffer: SpecialOffer = {
          ...offerData,
          id: `offer-${Date.now()}`
      };
      setSpecialOffers(prev => [newOffer, ...prev]);
  };

  const updateSpecialOffer = (updatedOffer: SpecialOffer) => {
      setSpecialOffers(prev => prev.map(o => o.id === updatedOffer.id ? updatedOffer : o));
  };

  const deleteSpecialOffer = (offerId: string) => {
      setSpecialOffers(prev => prev.filter(o => o.id !== offerId));
  }

  return (
    <AppContext.Provider value={{
      products,
      cart,
      wishlist,
      orders,
      messages,
      isAuthenticated,
      currentUser,
      users,
      specialOffers,
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
      addSpecialOffer,
      updateSpecialOffer,
      deleteSpecialOffer,
    }}>
      {children}
    </AppContext.Provider>
  );
};