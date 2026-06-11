import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { label: 'New Arrivals', to: '/shop' },
      { label: 'Bestsellers', to: '/shop' },
      { label: 'Collections', to: '/collections' },
      { label: 'Sale', to: '/shop' },
    ],
    Help: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Shipping & Returns', to: '/shipping' },
      { label: 'Size Guide', to: '/size-guide' },
      { label: 'Contact Us', to: '/contact' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press', to: '/press' },
      { label: 'Sustainability', to: '/sustainability' },
    ],
  };

  const socials = [
    {
      label: 'Instagram',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      label: 'Pinterest',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.22 1.23-5.22s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.26-.87 3.51-.25 1.05.52 1.9 1.55 1.9 1.86 0 3.3-1.96 3.3-4.8 0-2.51-1.8-4.26-4.38-4.26-2.98 0-4.73 2.23-4.73 4.54 0 .9.35 1.86.78 2.38.09.1.1.2.07.3l-.29 1.17c-.05.18-.16.22-.37.13C5.88 14.14 5 12.08 5 10.32 5 7.18 7.35 4.3 11.48 4.3c3.31 0 5.88 2.36 5.88 5.51 0 3.28-2.07 5.93-4.94 5.93-1.18 0-2.15-.51-2.7-1.4l-.59 2.17c-.21.82-.79 1.85-1.18 2.48.89.27 1.84.42 2.82.42 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
      ),
    },
    {
      label: 'TikTok',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-text">SHIVORA</span>
            <span className="footer__logo-sub">FASHION</span>
          </Link>
          <p className="footer__tagline">
            Curated fashion for the modern woman. Premium quality, timeless style.
          </p>
          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="footer__social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="footer__col">
            <h4 className="footer__col-title">{title}</h4>
            <ul className="footer__links">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">© {currentYear} Shivora Fashion. All rights reserved.</p>
          <div className="footer__payment">
            {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((p) => (
              <span key={p} className="footer__payment-badge">{p}</span>
            ))}
          </div>
          <div className="footer__legal">
            <a href="/privacy" className="footer__legal-link">Privacy Policy</a>
            <a href="/terms" className="footer__legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
