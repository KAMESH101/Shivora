import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/ProductCard';
import { useProducts } from '../../context/ProductsContext';
import './Shop.css';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 – ₹1,500', min: 1000, max: 1500 },
  { label: '₹1,500 – ₹2,000', min: 1500, max: 2000 },
  { label: 'Over ₹2,000', min: 2000, max: Infinity },
];

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

const Shop = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [search, setSearch] = useState('');

  const allCategories = useMemo(() => {
    return ['All', ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    const pr = priceRanges[selectedPriceRange];
    list = list.filter((p) => p.price >= pr.min && p.price <= pr.max);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest': list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)); break;
      default: break;
    }

    return list;
  }, [selectedCategory, selectedPriceRange, sortBy, search]);

  return (
    <main className="shop-page">
      {/* Page header */}
      <div className="shop-page__header">
        <div className="container">
          <p className="section-subtitle">Browse Our Range</p>
          <h1 className="section-title">Shop All</h1>
          <p className="shop-page__sub">Discover our full collection of premium fashion pieces.</p>
        </div>
      </div>

      <div className="container shop-page__body">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <div className="shop-sidebar__section">
            <h3 className="shop-sidebar__title">Categories</h3>
            <ul className="shop-sidebar__list">
              {allCategories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`shop-sidebar__btn ${selectedCategory === cat ? 'shop-sidebar__btn--active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="shop-sidebar__count">
                      {cat === 'All' ? products.length : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="shop-sidebar__section">
            <h3 className="shop-sidebar__title">Price Range</h3>
            <ul className="shop-sidebar__list">
              {priceRanges.map((r, i) => (
                <li key={r.label}>
                  <button
                    className={`shop-sidebar__btn ${selectedPriceRange === i ? 'shop-sidebar__btn--active' : ''}`}
                    onClick={() => setSelectedPriceRange(i)}
                  >
                    {r.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="shop-toolbar__search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="shop-toolbar__search-input"
              />
            </div>
            <div className="shop-toolbar__right">
              <span className="shop-toolbar__count">{filtered.length} products</span>
              <select
                className="shop-toolbar__sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="shop-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <p>No products match your filters.</p>
              <button onClick={() => { setSelectedCategory('All'); setSelectedPriceRange(0); setSearch(''); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Shop;
