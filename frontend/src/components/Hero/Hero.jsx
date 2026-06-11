import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import './Hero.css';

const slides = [
  {
    id: 1,
    tag: 'New Collection 2025',
    headline: 'Dress Like\nYou Mean It',
    sub: 'Discover curated fashion that speaks before you do. Premium styles for the modern woman.',
    cta: 'Shop Collection',
    ctaLink: '/shop',
    bg: 'linear-gradient(135deg, #fdf8f3 0%, #f7efe5 40%, #f0e2d4 100%)',
    accentColor: '#c4856a',
    imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    imgAlt: 'Fashion model in elegant dress',
  },
  {
    id: 2,
    tag: 'Summer Essentials',
    headline: 'Effortless\nElegance',
    sub: 'Light fabrics, timeless cuts. Fashion that moves with you through every season.',
    cta: 'Explore Now',
    ctaLink: '/collections',
    bg: 'linear-gradient(135deg, #fef5ec 0%, #fae3cc 40%, #f5d0b0 100%)',
    accentColor: '#d4a06a',
    imgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    imgAlt: 'Summer fashion lookbook',
  },
  {
    id: 3,
    tag: 'Limited Edition',
    headline: 'Style That\nTells a Story',
    sub: 'Bold silhouettes and refined details — fashion as art for those who dare.',
    cta: 'View Lookbook',
    ctaLink: '/collections',
    bg: 'linear-gradient(135deg, #1e1612 0%, #2e1f18 40%, #3d2b20 100%)',
    accentColor: '#d9a992',
    imgUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    imgAlt: 'Fashion editorial',
    dark: true,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const goToNext = () => {
    goTo((current + 1) % slides.length);
  };

  const slide = slides[current];

  return (
    <section
      className={`hero ${slide.dark ? 'hero--dark' : ''} ${animating ? 'hero--animating' : ''}`}
      style={{ background: slide.bg }}
    >
      <div className="hero__bg-decoration" style={{ '--accent': slide.accentColor }} />

      <div className="container hero__inner">
        {/* Text content */}
        <div className="hero__content">
          <span className="hero__tag" style={{ color: slide.accentColor }}>
            — {slide.tag}
          </span>
          <h1 className="hero__headline">
            {slide.headline.split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p className="hero__sub">{slide.sub}</p>
          <div className="hero__actions">
            <Button
              href={slide.ctaLink}
              variant="primary"
              size="lg"
            >
              {slide.cta}
            </Button>
            <Link to="/about" className="hero__discover">
              <span>Discover More</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {[
              { value: '2K+', label: 'Products' },
              { value: '50+', label: 'Brands' },
              { value: '98%', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label} className="hero__stat">
                <span className="hero__stat-value" style={{ color: slide.accentColor }}>{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="hero__image-wrap">
          <div className="hero__image-frame">
            <img
              src={slide.imgUrl}
              alt={slide.imgAlt}
              className="hero__image"
              loading="eager"
            />
            <div className="hero__image-tag" style={{ '--accent': slide.accentColor }}>
              <span>✦ New In</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider dots */}
      <div className="hero__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            style={i === current ? { background: slide.accentColor } : {}}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
