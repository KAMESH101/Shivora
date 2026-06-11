import React from 'react';
import Button from '../../components/Button';
import './Collections.css';

const collections = [
  {
    id: 1,
    name: 'Spring / Summer 2025',
    subtitle: 'Bloom Collection',
    description: 'Lightweight silhouettes, floral prints, and sun-drenched palettes that celebrate the warmth of the season.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    tag: 'New Season',
    pieces: 42,
  },
  {
    id: 2,
    name: 'Autumn / Winter 2024',
    subtitle: 'Nocturne Collection',
    description: 'Rich textures, deep earth tones, and tailored precision for the cooler months. Elegance meets warmth.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    tag: 'Bestseller',
    pieces: 58,
    dark: true,
  },
  {
    id: 3,
    name: 'Resort 2025',
    subtitle: 'Azure Collection',
    description: 'Breezy linen, nautical accents, and effortless elegance for those who travel in style.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    tag: 'Limited Edition',
    pieces: 28,
  },
  {
    id: 4,
    name: 'Capsule Wardrobe',
    subtitle: 'Essentials Collection',
    description: 'Timeless basics that form the foundation of any wardrobe. Versatile, quality-first, forever relevant.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
    tag: 'Always Available',
    pieces: 24,
  },
];

const Collections = () => {
  return (
    <main className="collections-page">
      {/* Header */}
      <div className="collections-page__header">
        <div className="container">
          <p className="section-subtitle">Curated for You</p>
          <h1 className="section-title">Our Collections</h1>
          <p className="collections-page__sub">
            Each collection tells a story. Discover the world of Shivora through our carefully crafted seasonal ranges.
          </p>
        </div>
      </div>

      <div className="container collections-page__body">
        {/* Featured large card */}
        <div className="collection-featured">
          <div className="collection-featured__img-wrap">
            <img
              src={collections[0].image}
              alt={collections[0].name}
              className="collection-featured__img"
            />
          </div>
          <div className="collection-featured__content">
            <span className="collection-featured__tag">{collections[0].tag}</span>
            <p className="section-subtitle">{collections[0].subtitle}</p>
            <h2 className="section-title">{collections[0].name}</h2>
            <p className="collection-featured__desc">{collections[0].description}</p>
            <div className="collection-featured__meta">
              <span className="collection-featured__pieces">{collections[0].pieces} pieces</span>
            </div>
            <Button href="/shop" variant="primary" size="lg">
              Explore Collection
            </Button>
          </div>
        </div>

        {/* Grid of other collections */}
        <div className="collections-grid">
          {collections.slice(1).map((col) => (
            <div key={col.id} className={`collection-card ${col.dark ? 'collection-card--dark' : ''}`}>
              <div className="collection-card__img-wrap">
                <img src={col.image} alt={col.name} className="collection-card__img" loading="lazy" />
                {col.dark && <div className="collection-card__overlay" />}
              </div>
              <div className="collection-card__content">
                <span className="collection-card__tag">{col.tag}</span>
                <p className="collection-card__subtitle">{col.subtitle}</p>
                <h3 className="collection-card__name">{col.name}</h3>
                <p className="collection-card__desc">{col.description}</p>
                <div className="collection-card__footer">
                  <span className="collection-card__pieces">{col.pieces} pieces</span>
                  <a href="/shop" className="collection-card__link">
                    View All
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lookbook CTA */}
        <div className="lookbook-cta">
          <div className="lookbook-cta__bg">
            <img
              src="https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1400&q=80"
              alt="Lookbook"
              className="lookbook-cta__img"
            />
          </div>
          <div className="lookbook-cta__content">
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>Digital Lookbook</p>
            <h2 className="lookbook-cta__title">See It All Come Together</h2>
            <p className="lookbook-cta__sub">Explore our editorial lookbook for styling ideas and outfit inspiration from our latest collections.</p>
            <Button variant="ghost" size="lg" href="/shop">
              View Lookbook
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Collections;
