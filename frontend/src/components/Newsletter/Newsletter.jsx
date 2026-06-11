import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section className="newsletter">
      <div className="newsletter__bg" />
      <div className="container newsletter__inner">
        <div className="newsletter__content">
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.65)' }}>Stay Connected</p>
          <h2 className="newsletter__title">Get 15% Off Your First Order</h2>
          <p className="newsletter__sub">
            Join our newsletter for exclusive offers, new arrivals, and style inspiration delivered straight to your inbox.
          </p>

          <form className="newsletter__form" onSubmit={handleSubmit}>
            <div className="newsletter__input-wrap">
              <input
                type="email"
                className="newsletter__input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter__btn">
                Subscribe
              </button>
            </div>
            {status === 'success' && (
              <p className="newsletter__message newsletter__message--success">
                ✓ Welcome! Your 15% discount code has been sent.
              </p>
            )}
            {status === 'error' && (
              <p className="newsletter__message newsletter__message--error">
                Please enter a valid email address.
              </p>
            )}
          </form>

          <p className="newsletter__note">No spam, ever. Unsubscribe anytime.</p>
        </div>

        {/* Decorative stats */}
        <div className="newsletter__stats">
          {[
            { value: '50K+', label: 'Happy Subscribers' },
            { value: '15%', label: 'First Order Discount' },
            { value: 'Weekly', label: 'Style Updates' },
          ].map((s) => (
            <div key={s.label} className="newsletter__stat">
              <span className="newsletter__stat-value">{s.value}</span>
              <span className="newsletter__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
