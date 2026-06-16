import React, { useState } from 'react';
import ProductCard from '../ProductCard';
import Button from '../Button';
import { useProducts } from '../../context/ProductsContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './FeaturedProducts.css';

const tabs = ['All', 'Dresses', 'Tops', 'Bottoms', 'Jackets'];

const FeaturedProducts = () => {
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('All');
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const filtered = activeTab === 'All'
    ? products
    : products.filter((p) => p.category.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section className="featured" ref={ref}>
      <div className="container">
        <div className={`featured__header reveal-up ${isVisible ? 'is-visible' : ''}`}>
          <div>
            <p className="section-subtitle">Handpicked For You</p>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Button href="/shop" variant="secondary" size="sm">
            View All
          </Button>
        </div>

        {/* Tabs */}
        <div className={`featured__tabs reveal-up stagger-1 ${isVisible ? 'is-visible' : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`featured__tab ${activeTab === tab ? 'featured__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="featured__grid">
          {filtered.slice(0, 8).map((product, i) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className={`reveal-up stagger-${(i % 4) + 1} ${isVisible ? 'is-visible' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
