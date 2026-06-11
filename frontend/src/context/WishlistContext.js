import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

const STORAGE_KEY = 'shivora_wishlist';

export function WishlistProvider({ children }) {

  // initialise from localStorage so wishlist survives page refresh
  const [wishlistItems, setWishlistItems] = useState(function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // keep localStorage in sync whenever wishlist changes
  useEffect(function() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch {
      // storage full or private mode — fail silently
    }
  }, [wishlistItems]);

  function toggleWishlist(product) {
    setWishlistItems(function(prev) {
      const already = prev.find(function(p) { return p.id === product.id; });
      if (already) {
        return prev.filter(function(p) { return p.id !== product.id; });
      }
      return [...prev, product];
    });
  }

  function isWishlisted(productId) {
    return wishlistItems.some(function(p) { return p.id === productId; });
  }

  function removeFromWishlist(productId) {
    setWishlistItems(function(prev) {
      return prev.filter(function(p) { return p.id !== productId; });
    });
  }

  function clearWishlist() {
    setWishlistItems([]);
  }

  const totalWishlist = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist,
      clearWishlist,
      totalWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider');
  }
  return context;
}
