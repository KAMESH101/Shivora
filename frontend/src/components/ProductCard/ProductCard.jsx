import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [addedToCart, setAddedToCart] = useState(false);

  const wishlisted = isWishlisted(product.id);

  function handleAddToCart(e) {
    e.stopPropagation();
    addToCart(product, 'M');
    setAddedToCart(true);
    setTimeout(function() { setAddedToCart(false); }, 1800);
  }

  function handleWishlist(e) {
    e.stopPropagation();
    toggleWishlist(product);
  }

  function handleCardClick() {
    navigate(`/product/${product.id}`);
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card__image-wrap">
        {discount && <span className="product-card__badge">-{discount}%</span>}
        {product.isNew && <span className="product-card__badge product-card__badge--new">New</span>}

        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />

        {/* overlay shown on hover */}
        <div className="product-card__overlay">
          <button
            className={`product-card__action-btn ${addedToCart ? 'product-card__action-btn--added' : ''}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? '✓ Added!' : '+ Add to Cart'}
          </button>

          {/* heart / wishlist button */}
          <button
            className={`product-card__icon-btn ${wishlisted ? 'product-card__icon-btn--active' : ''}`}
            onClick={handleWishlist}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wishlisted ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <div className="product-card__category">{product.category}</div>
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__pricing">
          <span className="product-card__price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="product-card__original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {product.colors && (
          <div className="product-card__colors">
            {product.colors.map(function(color, i) {
              return (
                <span
                  key={i}
                  className="product-card__color"
                  style={{ background: color }}
                />
              );
            })}
          </div>
        )}

        {product.rating && (
          <div className="product-card__rating">
            {[...Array(5)].map(function(_, i) {
              return (
                <span
                  key={i}
                  style={{ color: i < product.rating ? '#f5c518' : '#ddd', fontSize: '12px' }}
                >
                  ★
                </span>
              );
            })}
            <span className="product-card__reviews">({product.reviews})</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
