import { useState } from 'react';

// simple wishlist hook - I keep wishlisted items in local state for now
// later will connect to backend

function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  function toggleWishlist(product) {
    setWishlist(function(prev) {
      const isAlready = prev.find(function(p) { return p.id === product.id; });
      if (isAlready) {
        return prev.filter(function(p) { return p.id !== product.id; });
      }
      return [...prev, product];
    });
  }

  function isWishlisted(productId) {
    return wishlist.some(function(p) { return p.id === productId; });
  }

  return { wishlist, toggleWishlist, isWishlisted };
}

export default useWishlist;
