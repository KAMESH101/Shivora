import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as staticProducts } from '../utils/data';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(function() {
    async function fetchProducts() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Map MongoDB ObjectID to `id` parameter and local asset images
            const mapped = data.map((p) => {
              const staticProd = staticProducts.find(
                (sp) => sp.name.toLowerCase().trim() === p.name.toLowerCase().trim()
              );
              return {
                ...p,
                id: p._id || p.id,
                image: staticProd ? staticProd.image : p.image,
                hoverImage: staticProd ? staticProd.hoverImage : (p.hoverImage || p.image)
              };
            });
            setProducts(mapped);
          }
        }
      } catch (err) {
        console.warn('Backend API offline, falling back to static local product data.', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used inside ProductsProvider');
  }
  return context;
}
