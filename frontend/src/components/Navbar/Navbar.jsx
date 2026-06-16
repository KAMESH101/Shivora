import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const location = useLocation();
  const { totalItems } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { totalWishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  useEffect(function() {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll);
    return function() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // close mobile menu when page changes
  useEffect(function() {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // close user dropdown when clicking outside
  useEffect(function() {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return function() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Collections', to: '/collections' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  // hide navbar on login / register pages
  const hideNav = location.pathname === '/login' || location.pathname === '/register';
  if (hideNav) return null;

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-text">SHIVORA</span>
            <span className="navbar__logo-sub">FASHION</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="navbar__links">
            {navLinks.map(function(link) {
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action icons */}
          <div className="navbar__actions">

            {/* Theme Toggle */}
            <button
              className="navbar__icon-btn navbar__theme-btn"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Search icon — opens overlay on click */}
            <button
              className="navbar__icon-btn"
              aria-label="Search"
              onClick={function() { setSearchOpen(true); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Wishlist icon with count badge */}
            <Link to="/wishlist" className="navbar__icon-btn navbar__wishlist-btn" aria-label="Wishlist">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {totalWishlist > 0 && (
                <span className="navbar__cart-badge">{totalWishlist}</span>
              )}
            </Link>

            {/* Cart icon with count badge */}
            <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label="Cart">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="navbar__cart-badge">{totalItems}</span>
              )}
            </Link>

            {/* Login / user */}
            {isLoggedIn ? (
              <div className="navbar__user" ref={userMenuRef}>
                <button
                  className="navbar__user-trigger"
                  onClick={function() { setUserMenuOpen(!userMenuOpen); }}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                >
                  Hi, {user?.name?.split(' ')[0] || 'User'}
                  <svg className={`navbar__user-chevron ${userMenuOpen ? 'navbar__user-chevron--open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="navbar__user-dropdown">
                    <Link to="/my-orders" className="navbar__dropdown-link" onClick={function() { setUserMenuOpen(false); }}>
                      📦 My Orders
                    </Link>
                    <button className="navbar__logout-btn" onClick={function() { setUserMenuOpen(false); logout(); }}>
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="navbar__login-btn">Login</Link>
            )}

            {/* Hamburger for mobile */}
            <button
              className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={function() { setMenuOpen(!menuOpen); }}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
          <ul className="navbar__mobile-links">
            {navLinks.map(function(link) {
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`navbar__mobile-link ${location.pathname === link.to ? 'navbar__mobile-link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link to="/wishlist" className="navbar__mobile-link">
                Wishlist {totalWishlist > 0 && `(${totalWishlist})`}
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <div className="navbar__mobile-link navbar__mobile-user-greeting">
                    Hi, {user?.name?.split(' ')[0] || 'User'}
                  </div>
                </li>
                <li>
                  <Link to="/my-orders" className="navbar__mobile-link">📦 My Orders</Link>
                </li>
                <li>
                  <button className="navbar__mobile-link navbar__mobile-logout" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="navbar__mobile-link">Login</Link></li>
                <li><Link to="/register" className="navbar__mobile-link">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Search overlay - rendered outside nav so it covers whole screen */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={function() { setSearchOpen(false); }}
      />
    </>
  );
}

export default Navbar;
