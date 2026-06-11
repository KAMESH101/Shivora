import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      alert('Error sending message. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12.01a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: 'Phone',
      value: '+91 9876543210',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: 'hello@shivora-fashion.com',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Address',
      value: 'Door No. 45, 2nd Main RoadGandhi Nagar, AdyarChennai, Tamil Nadu 600020,India',
    },
  ];

  return (
    <main className="contact-page">
      {/* Header */}
      <div className="contact-page__header">
        <div className="container">
          <p className="section-subtitle">Get In Touch</p>
          <h1 className="section-title">Contact Us</h1>
          <p className="contact-page__sub">We'd love to hear from you. Our team is always here to help.</p>
        </div>
      </div>

      <div className="container contact-page__body">
        {/* Info cards */}
        <div className="contact-info">
          {contactInfo.map((info) => (
            <div key={info.label} className="contact-info-card">
              <div className="contact-info-card__icon">{info.icon}</div>
              <div>
                <span className="contact-info-card__label">{info.label}</span>
                <span className="contact-info-card__value">{info.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="contact-content">
          {/* Form */}
          <div className="contact-form-card">
            <h2 className="contact-form-card__title">Send a Message</h2>
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <p>Your message has been sent! We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="contact-form__input"
                      required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="contact-form__input"
                      required
                    />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="contact-form__input"
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={5}
                    className="contact-form__input contact-form__textarea"
                    required
                  />
                </div>
                <button type="submit" className="contact-form__submit">
                  Send Message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22 11 13 2 9l20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Hours */}
          <div className="contact-hours">
            <h3 className="contact-hours__title">Business Hours</h3>
            <ul className="contact-hours__list">
              {[
                { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
                { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
                { day: 'Sunday', hours: 'Closed' },
              ].map(({ day, hours }) => (
                <li key={day} className="contact-hours__item">
                  <span className="contact-hours__day">{day}</span>
                  <span className="contact-hours__time">{hours}</span>
                </li>
              ))}
            </ul>

            <div className="contact-social-links">
              <p className="contact-social-links__label">Follow us</p>
              <div className="contact-social-links__list">
                {['Instagram', 'Pinterest', 'TikTok'].map((s) => (
                  <a key={s} href="#" className="contact-social-link">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
