import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/Toast/Toast';
import './Checkout.css';

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { getAuthToken } = useAuth();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Payment states
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
  });
  const [upiData, setUpiData] = useState({
    vpa: '',
  });

  // Success states
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const [toast, setToast] = useState(null);

  // Form input change handlers
  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handleCardChange(e) {
    const { name, value } = e.target;
    // Format card input nicely
    let formattedValue = value;
    if (name === 'number') {
      formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim();
      if (formattedValue.endsWith('/')) {
        formattedValue = formattedValue.slice(0, -1);
      }
      formattedValue = formattedValue.slice(0, 5);
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handleUpiChange(e) {
    setUpiData({ vpa: e.target.value });
    if (errors.vpa) {
      setErrors((prev) => ({ ...prev, vpa: '' }));
    }
  }

  // Basic field validation
  function validateForm() {
    const tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }

    const phoneRegex = /^\d{10}$/;
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      tempErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!formData.address.trim()) tempErrors.address = 'Street address is required';
    if (!formData.city.trim()) tempErrors.city = 'City is required';
    if (!formData.state.trim()) tempErrors.state = 'State is required';
    
    const zipRegex = /^\d{6}$/;
    if (!formData.zipCode.trim()) {
      tempErrors.zipCode = 'Pin Code is required';
    } else if (!zipRegex.test(formData.zipCode.trim())) {
      tempErrors.zipCode = 'Pin Code must be 6 digits';
    }

    // Payment validation
    if (paymentMethod === 'card') {
      const cardNumClean = cardData.number.replace(/\s/g, '');
      if (!cardData.number) tempErrors.number = 'Card number is required';
      else if (cardNumClean.length !== 16) tempErrors.number = 'Must be a 16-digit card number';

      if (!cardData.expiry) tempErrors.expiry = 'Expiry is required';
      else if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) tempErrors.expiry = 'Use MM/YY format';

      if (!cardData.cvc) tempErrors.cvc = 'CVC is required';
      else if (cardData.cvc.length !== 3) tempErrors.cvc = 'Must be 3 digits';
    } else if (paymentMethod === 'upi') {
      if (!upiData.vpa.trim()) {
        tempErrors.vpa = 'UPI ID / VPA is required';
      } else if (!upiData.vpa.includes('@')) {
        tempErrors.vpa = 'UPI ID must contain @ (e.g. name@upi)';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: 'Please fix the errors in the form.', type: 'error' });
      return;
    }

    try {
      const token = await getAuthToken();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            image: item.image,
          })),
          total: grandTotal,
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      // Capture current details before clearing cart, using MongoDB ID from response
      const summary = {
        orderId: data.order?._id || 'SHV-' + Math.floor(100000 + Math.random() * 900000),
        items: [...cartItems],
        total: totalPrice,
        shipping: totalPrice >= 8000 ? 0 : 199,
        tax: totalPrice * 0.18,
        address: formData.address,
        city: formData.city,
        fullName: formData.fullName,
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery (COD)',
      };

      setOrderSummary(summary);
      setIsSuccess(true);
      clearCart();
      setToast({ message: 'Order placed successfully!', type: 'success' });
    } catch (err) {
      setToast({ message: err.message || 'Error placing order. Please try again.', type: 'error' });
    }
  }

  // Price calculation
  const shipping = totalPrice >= 8000 ? 0 : 199;
  const tax = totalPrice * 0.18;
  const grandTotal = totalPrice + shipping + tax;

  // Render order placement confirmation success state
  if (isSuccess && orderSummary) {
    return (
      <div className="checkout-success-page">
        <div className="checkout-success-card">
          <div className="success-icon-wrap">
            <span className="success-check">✓</span>
          </div>
          <h1 className="success-title">Order Confirmed</h1>
          <p className="success-subtitle">Thank you for shopping with Shivora. Your order has been placed successfully.</p>
          
          <div className="order-details-box">
            <div className="detail-row">
              <span className="detail-lbl">Order Reference</span>
              <span className="detail-val highlight">{orderSummary.orderId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-lbl">Delivery To</span>
              <span className="detail-val">{orderSummary.fullName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-lbl">Address</span>
              <span className="detail-val">{orderSummary.address}, {orderSummary.city}</span>
            </div>
            <div className="detail-row">
              <span className="detail-lbl">Payment Mode</span>
              <span className="detail-val">{orderSummary.paymentMethod}</span>
            </div>
            <div className="detail-row total-row">
              <span className="detail-lbl">Amount Paid</span>
              <span className="detail-val">₹{Math.round(orderSummary.total + orderSummary.shipping + orderSummary.tax).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="order-items-preview">
            <p className="items-preview-title">Items Ordered</p>
            <div className="preview-items-list">
              {orderSummary.items.map((item, i) => (
                <div key={i} className="preview-item">
                  <span className="preview-item-name">{item.name} <span className="preview-item-qty">({item.size} × {item.quantity})</span></span>
                  <span className="preview-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="success-actions">
            <Link to="/shop" className="continue-shop-btn">Continue Shopping</Link>
          </div>
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    );
  }

  // Redirect if cart is empty and order wasn't just placed
  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty-page">
        <div className="checkout-empty-card">
          <h2>Your Cart is Empty</h2>
          <p>You cannot checkout with an empty cart. Add items first!</p>
          <Link to="/shop" className="checkout-empty-btn">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="checkout-container">
          <h1 className="checkout-page-title">Checkout</h1>
        </div>
      </div>

      <div className="checkout-container checkout-body">
        {/* Left Side Forms */}
        <form onSubmit={handlePlaceOrder} className="checkout-main-form">
          
          {/* Shipping Card */}
          <div className="checkout-card">
            <h2 className="card-title">1. Shipping Details</h2>
            <div className="form-grid">
              <div className="form-field full-width">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="Enter your full name"
                  className={`checkout-input ${errors.fullName ? 'input-error' : ''}`}
                />
                {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="name@example.com"
                  className={`checkout-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="10-digit number"
                  className={`checkout-input ${errors.phone ? 'input-error' : ''}`}
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="form-field full-width">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="House No, Building, Street Name"
                  className={`checkout-input ${errors.address ? 'input-error' : ''}`}
                />
                {errors.address && <span className="error-msg">{errors.address}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  placeholder="Enter city"
                  className={`checkout-input ${errors.city ? 'input-error' : ''}`}
                />
                {errors.city && <span className="error-msg">{errors.city}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                  placeholder="Enter state"
                  className={`checkout-input ${errors.state ? 'input-error' : ''}`}
                />
                {errors.state && <span className="error-msg">{errors.state}</span>}
              </div>

              <div className="form-field">
                <label className="form-label">Pin Code / Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleFormChange}
                  placeholder="6-digit pin code"
                  className={`checkout-input ${errors.zipCode ? 'input-error' : ''}`}
                />
                {errors.zipCode && <span className="error-msg">{errors.zipCode}</span>}
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="checkout-card">
            <h2 className="card-title">2. Payment Method</h2>
            
            <div className="payment-options">
              {/* Card option */}
              <label className={`payment-option ${paymentMethod === 'card' ? 'option-active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="payment-radio"
                />
                <div className="option-info">
                  <span className="option-title">Credit / Debit Card</span>
                  <span className="option-desc">Visa, Mastercard, RuPay, Amex</span>
                </div>
              </label>

              {/* Card Inputs Form */}
              {paymentMethod === 'card' && (
                <div className="payment-subform">
                  <div className="form-field full-width">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      value={cardData.number}
                      onChange={handleCardChange}
                      placeholder="0000 0000 0000 0000"
                      className={`checkout-input ${errors.number ? 'input-error' : ''}`}
                    />
                    {errors.number && <span className="error-msg">{errors.number}</span>}
                  </div>
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        className={`checkout-input ${errors.expiry ? 'input-error' : ''}`}
                      />
                      {errors.expiry && <span className="error-msg">{errors.expiry}</span>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">CVC / CVV</label>
                      <input
                        type="password"
                        name="cvc"
                        value={cardData.cvc}
                        onChange={handleCardChange}
                        placeholder="123"
                        className={`checkout-input ${errors.cvc ? 'input-error' : ''}`}
                      />
                      {errors.cvc && <span className="error-msg">{errors.cvc}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* UPI option */}
              <label className={`payment-option ${paymentMethod === 'upi' ? 'option-active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="payment-radio"
                />
                <div className="option-info">
                  <span className="option-title">UPI</span>
                  <span className="option-desc">Google Pay, PhonePe, Paytm, BHIM</span>
                </div>
              </label>

              {/* UPI Input */}
              {paymentMethod === 'upi' && (
                <div className="payment-subform">
                  <div className="form-field full-width">
                    <label className="form-label">UPI ID / VPA</label>
                    <input
                      type="text"
                      name="vpa"
                      value={upiData.vpa}
                      onChange={handleUpiChange}
                      placeholder="username@upi"
                      className={`checkout-input ${errors.vpa ? 'input-error' : ''}`}
                    />
                    {errors.vpa && <span className="error-msg">{errors.vpa}</span>}
                  </div>
                </div>
              )}

              {/* COD option */}
              <label className={`payment-option ${paymentMethod === 'cod' ? 'option-active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="payment-radio"
                />
                <div className="option-info">
                  <span className="option-title">Cash on Delivery (COD)</span>
                  <span className="option-desc">Pay in cash when your order is delivered</span>
                </div>
              </label>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <button type="submit" className="place-order-submit-btn">
            Place Order • ₹{Math.round(grandTotal).toLocaleString('en-IN')}
          </button>
        </form>

        {/* Right Side Cart Summary */}
        <div className="checkout-summary-wrap">
          <div className="checkout-summary-card">
            <h3 className="summary-title">Order Details</h3>
            
            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id + item.size} className="summary-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="summary-item-img"
                  />
                  <div className="summary-item-details">
                    <h4 className="summary-item-name">{item.name}</h4>
                    <p className="summary-item-meta">Size: {item.size} | Qty: {item.quantity}</p>
                  </div>
                  <span className="summary-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />

            <div className="summary-price-lines">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="summary-line">
                <span>Tax (18% GST)</span>
                <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="checkout-summary-divider" />

            <div className="summary-grand-total">
              <span>Total</span>
              <span className="grand-price">₹{Math.round(grandTotal).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Checkout;
