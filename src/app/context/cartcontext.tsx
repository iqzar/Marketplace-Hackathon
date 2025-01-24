'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

// CartItem type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: Record<string, CartItem>;
  totalPrice: number;
}

// Action types
type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'SET_ITEM_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  setItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Initial state (defaults to empty)
const initialState: CartState = {
  cart: {},
  totalPrice: 0,
};

// Load cart from localStorage safely
const loadCartFromLocalStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return initialState;
  }
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : initialState;
};

// Save cart to localStorage safely
const saveCartToLocalStorage = (cart: CartState): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

// Reducer function to manage cart state
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newCart = { ...state.cart, [action.payload.id]: action.payload };
      const totalPrice = Object.values(newCart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const newState = { ...state, cart: newCart, totalPrice };
      saveCartToLocalStorage(newState);
      return newState;
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = { ...state.cart };
      delete updatedCart[action.payload];
      const totalPrice = Object.values(updatedCart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const newState = { ...state, cart: updatedCart, totalPrice };
      saveCartToLocalStorage(newState);
      return newState;
    }

    case 'SET_ITEM_QUANTITY': {
      const updatedCart = { ...state.cart };
      if (updatedCart[action.payload.id]) {
        updatedCart[action.payload.id].quantity = action.payload.quantity;
      }
      const totalPrice = Object.values(updatedCart).reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const newState = { ...state, cart: updatedCart, totalPrice };
      saveCartToLocalStorage(newState);
      return newState;
    }

    case 'CLEAR_CART': {
      const newState = { ...state, cart: {}, totalPrice: 0 };
      saveCartToLocalStorage(newState);
      return newState;
    }

    default:
      return state;
  }
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to provide context to the app
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const loadedCart = loadCartFromLocalStorage();
    Object.values(loadedCart.cart).forEach((item) => {
      dispatch({ type: 'ADD_TO_CART', payload: item });
    });
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(state);
  }, [state]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const setItemQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'SET_ITEM_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, setItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
