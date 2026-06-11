import React, { createContext, useContext, useState } from 'react';

// I learned about Context API from React docs
// this lets any component access cart without passing props down

const CartContext = createContext();

const STORAGE_KEY = 'shivora_cart';

export function CartProvider({ children }) {

  // Initialize from localStorage so cart survives page refresh
  const [cartItems, setCartItems] = useState(function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage in sync whenever cart items change
  React.useEffect(function() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // private mode or storage full - fail silently
    }
  }, [cartItems]);

  // add item to cart with selected quantity
  function addToCart(product, size = 'M', quantity = 1) {
    setCartItems(function(prev) {
      // check if same product + size already in cart
      const exists = prev.find(function(item) {
        return item.id === product.id && item.size === size;
      });

      if (exists) {
        // increase quantity by the selected amount
        return prev.map(function(item) {
          if (item.id === product.id && item.size === size) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      }

      // add new item with selected quantity
      return [...prev, { ...product, size: size, quantity: quantity }];
    });
  }

  // remove item from cart
  function removeFromCart(productId, size) {
    setCartItems(function(prev) {
      return prev.filter(function(item) {
        return !(item.id === productId && item.size === size);
      });
    });
  }

  // update quantity
  function updateQuantity(productId, size, newQty) {
    if (newQty < 1) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems(function(prev) {
      return prev.map(function(item) {
        if (item.id === productId && item.size === size) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  }

  // clear entire cart
  function clearCart() {
    setCartItems([]);
  }

  // total number of items (for badge on navbar)
  const totalItems = cartItems.reduce(function(sum, item) {
    return sum + item.quantity;
  }, 0);

  // total price
  const totalPrice = cartItems.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// custom hook so I don't have to import useContext everywhere
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
}
