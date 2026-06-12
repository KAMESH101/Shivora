import React from 'react';
import '../../styles/generic-page.css';

function Shipping() {
  return (
    <div className="generic-page">
      <h1 className="generic-page__title">Shipping & Returns</h1>
      <div className="generic-page__content">
        <h2>Shipping Information</h2>
        <p>We offer standard and express shipping options to ensure you receive your Shivora pieces exactly when you need them.</p>
        <ul>
          <li><strong>Standard Shipping:</strong> 3-5 business days. Free on orders over $150.</li>
          <li><strong>Express Shipping:</strong> 1-2 business days. Flat rate of $15.</li>
          <li><strong>International Shipping:</strong> 7-14 business days. Rates calculated at checkout based on destination.</li>
        </ul>
        <p>Orders are processed Monday through Friday, excluding major holidays. Orders placed after 2 PM EST will be processed the following business day.</p>

        <h2>Return Policy</h2>
        <p>We want you to love your Shivora pieces. If you are not completely satisfied, we accept returns within 30 days of the delivery date.</p>
        <ul>
          <li>Items must be unworn, unwashed, and in their original condition with all tags attached.</li>
          <li>Final sale items, intimates, and customized pieces are not eligible for return.</li>
          <li>A $5 return shipping fee will be deducted from your refund for use of our prepaid return label.</li>
        </ul>
        <p>To initiate a return, please visit your account dashboard or contact our customer support team.</p>
      </div>
    </div>
  );
}

export default Shipping;
