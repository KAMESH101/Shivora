import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './Wishlist.css';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">♡</div>
          <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
          <p className="wishlist-empty-text">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link to="/shop" className="wishlist-shop-btn">Browse Products</Link>
        </div>
      </div>
    );
  }

  function handleMoveToCart(product) {
    addToCart(product, 'M');
    removeFromWishlist(product.id);
  }

  return (
    <div className="wishlist-page">

      {/* header */}
      <div className="wishlist-header">
        <div className="wishlist-container">
          <p className="wishlist-label">My Wishlist</p>
          <h1 className="wishlist-title">Saved Items</h1>
          <p className="wishlist-count">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="wishlist-container wishlist-body">
        <div className="wishlist-grid">
          {wishlistItems.map(function(product) {
            return (
              <div key={product.id} className="wishlist-card">

                {/* remove from wishlist */}
                <button
                  className="wishlist-card-remove"
                  onClick={function() { removeFromWishlist(product.id); }}
                  title="Remove from wishlist"
                >
                  ✕
                </button>

                {/* image */}
                <Link to={`/product/${product.id}`} className="wishlist-card-img-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="wishlist-card-img"
                  />
                </Link>

                {/* info */}
                <div className="wishlist-card-info">
                  <p className="wishlist-card-category">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="wishlist-card-name">{product.name}</h3>
                  </Link>

                  <div className="wishlist-card-price-row">
                    <span className="wishlist-card-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="wishlist-card-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  {/* colors */}
                  {product.colors && (
                    <div className="wishlist-card-colors">
                      {product.colors.map(function(color, i) {
                        return (
                          <span
                            key={i}
                            className="wishlist-card-color"
                            style={{ background: color }}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* move to cart button */}
                  <button
                    className="wishlist-card-add-btn"
                    onClick={function() { handleMoveToCart(product); }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* continue shopping */}
        <div className="wishlist-footer">
          <Link to="/shop" className="wishlist-continue-link">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
