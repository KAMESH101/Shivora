import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import './SearchOverlay.css';

function SearchOverlay({ isOpen, onClose }) {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // focus input when overlay opens
  useEffect(function() {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    // clear search when closed
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // close on Escape key
  useEffect(function() {
    function handleKey(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKey);
    return function() {
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  // filter products as user types
  useEffect(function() {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(function(p) {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
    setResults(filtered.slice(0, 6)); // show max 6 results
  }, [query]);

  function handleProductClick(productId) {
    navigate(`/product/${productId}`);
    onClose();
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* dark backdrop */}
      <div className="search-backdrop" onClick={onClose} />

      {/* search panel */}
      <div className="search-overlay">
        <div className="search-overlay-top">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            {/* search icon */}
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search for products, categories..."
              value={query}
              onChange={function(e) { setQuery(e.target.value); }}
            />

            {/* clear button */}
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={function() { setQuery(''); inputRef.current.focus(); }}
              >
                ✕
              </button>
            )}
          </form>

          {/* close button */}
          <button className="search-close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        {/* results */}
        <div className="search-results">
          {query.trim() === '' && (
            <div className="search-suggestions">
              <p className="search-suggestions-label">Popular Searches</p>
              <div className="search-tags">
                {['Dresses', 'Blazers', 'Summer', 'New Arrivals', 'Sale'].map(function(tag) {
                  return (
                    <button
                      key={tag}
                      className="search-tag"
                      onClick={function() { setQuery(tag); }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div className="search-no-results">
              <p>No products found for <strong>"{query}"</strong></p>
              <p className="search-no-results-sub">Try a different keyword or browse our categories</p>
            </div>
          )}

          {results.length > 0 && (
            <>
              <p className="search-results-label">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
              <div className="search-results-grid">
                {results.map(function(product) {
                  return (
                    <div
                      key={product.id}
                      className="search-result-item"
                      onClick={function() { handleProductClick(product.id); }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="search-result-img"
                      />
                      <div className="search-result-info">
                        <p className="search-result-category">{product.category}</p>
                        <p className="search-result-name">{product.name}</p>
                        <p className="search-result-price">₹{product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* view all link */}
              <button
                className="search-view-all"
                onClick={handleSearchSubmit}
              >
                View all results for "{query}" →
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchOverlay;
