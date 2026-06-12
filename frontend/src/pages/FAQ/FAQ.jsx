import React from 'react';
import '../../styles/generic-page.css';

function FAQ() {
  return (
    <div className="generic-page">
      <h1 className="generic-page__title">Frequently Asked Questions</h1>
      <div className="generic-page__content">
        <h2>Ordering & Payment</h2>
        <p><strong>What payment methods do you accept?</strong><br/>We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.</p>
        <p><strong>Can I change my order after placing it?</strong><br/>We process orders quickly, but if you contact us within 1 hour of placing your order, we will do our best to accommodate any changes.</p>
        
        <h2>Shipping & Tracking</h2>
        <p><strong>How do I track my order?</strong><br/>Once your order ships, you will receive an email with a tracking link. You can also view tracking information in your account under "My Orders".</p>
        
        <h2>Returns & Exchanges</h2>
        <p><strong>What is your return policy?</strong><br/>We accept returns within 30 days of delivery. Items must be unworn, unwashed, and have original tags attached. Please see our Shipping & Returns page for full details.</p>
      </div>
    </div>
  );
}

export default FAQ;
