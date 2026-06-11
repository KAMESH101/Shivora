import React from 'react';
import Hero from '../../components/Hero';
import Categories from '../../components/Categories';
import FeaturedProducts from '../../components/FeaturedProducts';
import Newsletter from '../../components/Newsletter';
import './Home.css';

const BrandBanner = () => (
  <section className="brand-banner">
    <div className="brand-banner__track">
      {['Free Shipping Over $100', '✦', 'New Collection 2025', '✦', 'Returns Within 30 Days', '✦', 'Sustainable Fashion', '✦', 'Free Shipping Over $100', '✦', 'New Collection 2025', '✦', 'Returns Within 30 Days', '✦', 'Sustainable Fashion', '✦'].map((text, i) => (
        <span key={i} className="brand-banner__item">{text}</span>
      ))}
    </div>
  </section>
);

const PromoSection = () => (
  <section className="promo-section">
    <div className="container promo-section__inner">
      <div className="promo-section__card promo-section__card--left">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80"
          alt="Summer Sale"
          className="promo-section__img"
        />
        <div className="promo-section__overlay">
          <span className="promo-section__tag">Up to 40% Off</span>
          <h3 className="promo-section__title">Summer Sale</h3>
          <a href="/shop" className="promo-section__link">Shop Sale →</a>
        </div>
      </div>
      <div className="promo-section__card promo-section__card--right">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80"
          alt="New Arrivals"
          className="promo-section__img"
        />
        <div className="promo-section__overlay">
          <span className="promo-section__tag">Just Dropped</span>
          <h3 className="promo-section__title">New Arrivals</h3>
          <a href="/shop" className="promo-section__link">Discover →</a>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sophia M.',
      role: 'Fashion Blogger',
      text: 'Shivora has completely transformed my wardrobe. Every piece is exquisitely crafted and the quality is unmatched.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
      rating: 5,
    },
    {
      name: 'Isabella R.',
      role: 'Stylist',
      text: 'I recommend Shivora to all my clients. The collections are timeless yet contemporary — perfect for every occasion.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      rating: 5,
    },
    {
      name: 'Elena K.',
      role: 'Creative Director',
      text: 'The attention to detail is remarkable. Shipping was fast and the packaging made it feel like a luxury gift to myself.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
      rating: 5,
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <p className="section-subtitle">What They Say</p>
          <h2 className="section-title">Customer Love</h2>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="testimonial-card__stars">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="#f5c518" stroke="none" className="testimonial-card__star">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <img src={t.avatar} alt={t.name} className="testimonial-card__avatar" />
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main>
      <Hero />
      <BrandBanner />
      <Categories />
      <FeaturedProducts />
      <PromoSection />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
