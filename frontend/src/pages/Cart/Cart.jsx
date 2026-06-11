import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart() {

  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  // if cart is empty show empty state
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍</div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-text">Looks like you have not added anything yet.</p>
          <Link to="/shop" className="cart-shop-btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice >= 8000 ? 0 : 199;
  const tax = totalPrice * 0.18;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="cart-page">
      <div className="cart-header-bar">
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-count">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="cart-container cart-body">

        {/* cart items list */}
        <div className="cart-items">

          {/* table header - only on desktop */}
          <div className="cart-table-header">
            <span>Product</span>
            <span>Size</span>
            <span>Quantity</span>
            <span>Price</span>
            <span></span>
          </div>

          {cartItems.map(function(item) {
            return (
              <div key={item.id + item.size} className="cart-item">

                {/* image + name */}
                <div className="cart-item-product">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <p className="cart-item-category">{item.category}</p>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </div>
                </div>

                {/* size */}
                <div className="cart-item-size">
                  <span className="cart-size-badge">{item.size}</span>
                </div>

                {/* quantity controls */}
                <div className="cart-item-qty">
                  <button
                    className="cart-qty-btn"
                    onClick={function() { updateQuantity(item.id, item.size, item.quantity - 1); }}
                  >
                    −
                  </button>
                  <span className="cart-qty-num">{item.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={function() { updateQuantity(item.id, item.size, item.quantity + 1); }}
                  >
                    +
                  </button>
                </div>

                {/* price */}
                <div className="cart-item-price">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>

                {/* remove button */}
                <button
                  className="cart-item-remove"
                  onClick={function() { removeFromCart(item.id, item.size); }}
                  title="Remove item"
                >
                  ✕
                </button>

              </div>
            );
          })}

          {/* clear cart */}
          <div className="cart-actions">
            <Link to="/shop" className="cart-continue-link">← Continue Shopping</Link>
            <button className="cart-clear-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>

        {/* order summary */}
        <div className="cart-summary">
          <h2 className="cart-summary-title">Order Summary</h2>

          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
            </div>
            <div className="cart-summary-row">
              <span>Tax (18% GST)</span>
              <span>₹{Math.round(tax).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {shipping > 0 && (
            <p className="cart-free-shipping-note">
              Add ₹{(8000 - totalPrice).toLocaleString('en-IN')} more for free shipping!
            </p>
          )}

          <div className="cart-summary-total">
            <span>Total</span>
            <span>₹{Math.round(orderTotal).toLocaleString('en-IN')}</span>
          </div>

          {/* promo code */}
          <div className="cart-promo">
            <input
              type="text"
              placeholder="Promo code"
              className="cart-promo-input"
            />
            <button className="cart-promo-btn">Apply</button>
          </div>

          <Link to="/checkout" className="cart-checkout-btn" style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}>
            Proceed to Checkout
          </Link>

          {/* trust badges */}
          <div className="cart-trust">
            <span>🔒 Secure Checkout</span>
            <span>↩ Free Returns</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
