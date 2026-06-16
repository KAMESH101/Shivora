import React from 'react';
import { categories } from '../../utils/data';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Categories.css';

const Categories = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="categories" ref={ref}>
      <div className="container">
        <div className={`categories__header reveal-up ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-subtitle">Explore By</p>
          <h2 className="section-title">Shop by Category</h2>
        </div>

        <div className="categories__grid">
          {categories.map((cat, i) => (
            <a
              key={cat.id}
              href="/shop"
              className={`categories__card ${i === 0 ? 'categories__card--featured' : ''} reveal-up stagger-${i + 1} ${isVisible ? 'is-visible' : ''}`}
            >
              <img src={cat.image} alt={cat.name} className="categories__card-img" loading="lazy" />
              <div className="categories__card-overlay">
                <div className="categories__card-content">
                  <h3 className="categories__card-name">{cat.name}</h3>
                  <span className="categories__card-count">{cat.count} items</span>
                  <div className="categories__card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
