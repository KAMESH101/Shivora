import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MyOrders.css';

function MyOrders() {
  const { getAuthToken, isLoggedIn, isLoaded } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    if (!isLoaded) return;
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      try {
        const token = await getAuthToken();
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [isLoaded, isLoggedIn, getAuthToken]);

  // ── helpers ──────────────────────────────────────────────────────────────
  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  function statusBadge(index) {
    // Demo statuses cycling through states based on order age
    const statuses = ['Processing', 'Confirmed', 'Shipped', 'Delivered'];
    return statuses[index % statuses.length];
  }

  function statusClass(status) {
    const map = {
      Processing: 'badge--processing',
      Confirmed: 'badge--confirmed',
      Shipped: 'badge--shipped',
      Delivered: 'badge--delivered',
    };
    return map[status] || 'badge--processing';
  }

  // ── render ────────────────────────────────────────────────────────────────
  if (!isLoaded || loading) {
    return (
      <div className="my-orders-page">
        <div className="my-orders-loading">
          <div className="my-orders-spinner" />
          <p>Loading your orders…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="my-orders-page">
        <div className="my-orders-empty">
          <div className="my-orders-empty-icon">🔒</div>
          <h2>Please sign in</h2>
          <p>You need to be logged in to view your orders.</p>
          <Link to="/login" className="my-orders-action-btn">Sign In</Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders-page">
        <div className="my-orders-empty">
          <div className="my-orders-empty-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <Link to="/shop" className="my-orders-action-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="my-orders-page">
        <div className="my-orders-header">
          <div className="my-orders-container">
            <p className="my-orders-label">Account</p>
            <h1 className="my-orders-title">My Orders</h1>
          </div>
        </div>
        <div className="my-orders-empty">
          <div className="my-orders-empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>Looks like you haven't placed any orders. Start shopping!</p>
          <Link to="/shop" className="my-orders-action-btn">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      {/* Header */}
      <div className="my-orders-header">
        <div className="my-orders-container">
          <p className="my-orders-label">Account</p>
          <h1 className="my-orders-title">My Orders</h1>
          <p className="my-orders-subtitle">{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
        </div>
      </div>

      {/* Orders list */}
      <div className="my-orders-container my-orders-body">
        {orders.map(function (order, oi) {
          const status = statusBadge(oi);
          return (
            <div key={order._id} className="order-card">
              {/* Order card header */}
              <div className="order-card__header">
                <div className="order-card__meta">
                  <div className="order-card__id">
                    <span className="order-card__id-label">Order ID</span>
                    <span className="order-card__id-value">#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="order-card__date">
                    <span className="order-card__date-label">Placed on</span>
                    <span className="order-card__date-value">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-card__total">
                    <span className="order-card__total-label">Total</span>
                    <span className="order-card__total-value">₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <span className={`order-card__status-badge ${statusClass(status)}`}>
                  {status === 'Processing' && '🔄'}
                  {status === 'Confirmed' && '✅'}
                  {status === 'Shipped' && '🚚'}
                  {status === 'Delivered' && '✔️'}
                  {' '}{status}
                </span>
              </div>

              {/* Items */}
              <div className="order-card__items">
                {order.items.map(function (item, ii) {
                  return (
                    <div key={`${order._id}-${ii}`} className="order-item">
                      <div className="order-item__img-wrap">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="order-item__img"
                            onError={function (e) {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className="order-item__img-fallback" style={{ display: item.image ? 'none' : 'flex' }}>
                          👗
                        </div>
                      </div>
                      <div className="order-item__info">
                        <h3 className="order-item__name">{item.name}</h3>
                        <div className="order-item__meta">
                          <span className="order-item__size">Size: {item.size}</span>
                          <span className="order-item__qty">Qty: {item.quantity}</span>
                        </div>
                        <p className="order-item__price">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="order-item__subtotal">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card footer */}
              <div className="order-card__footer">
                <div className="order-card__address">
                  <span className="order-card__address-label">📍 Delivery address:</span>
                  <span className="order-card__address-value">{order.address}</span>
                </div>
                <Link to="/shop" className="order-card__reorder-btn">Shop Again</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyOrders;
