import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Toast from '../../components/Toast/Toast';
import './ProductDetail.css';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);

  // find product by id from data
  const product = products.find(function(p) {
    return String(p.id) === String(id);
  });

  // if product not found
  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>Product not found</h2>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  // single image per product in gallery
  const images = [product.image];

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  function handleAddToCart() {
    addToCart(product, selectedSize, quantity);
    setToast({ message: `${product.name} added to cart!`, type: 'success' });
  }

  function handleWishlist() {
    const wasWishlisted = isWishlisted(product.id);
    toggleWishlist(product);
    setToast({
      message: wasWishlisted
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist!`,
      type: wasWishlisted ? 'error' : 'success',
    });
  }

  const wishlisted = isWishlisted(product.id);

  // related products - same category but not this product
  const related = products.filter(function(p) {
    return p.category === product.category && p.id !== product.id;
  }).slice(0, 3);

  return (
    <div className="pd-page">

      {/* breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="pd-container">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to="/shop">Shop</Link>
          <span> / </span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* main product section */}
      <div className="pd-container pd-main">

        {/* images */}
        <div className="pd-images">
          {/* thumbnails */}
          <div className="pd-thumbs">
            {images.map(function(img, i) {
              return (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  className={`pd-thumb ${selectedImage === i ? 'pd-thumb--active' : ''}`}
                  onClick={function() { setSelectedImage(i); }}
                />
              );
            })}
          </div>

          {/* main image */}
          <div className="pd-main-img-wrap">
            {discount && <span className="pd-badge">-{discount}%</span>}
            {product.isNew && <span className="pd-badge pd-badge--new">New</span>}
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="pd-main-img"
            />
          </div>
        </div>

        {/* product info */}
        <div className="pd-info">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-name">{product.name}</h1>

          {/* rating */}
          {product.rating && (
            <div className="pd-rating">
              {[...Array(5)].map(function(_, i) {
                return (
                  <span key={i} className={`pd-star ${i < product.rating ? 'pd-star--filled' : ''}`}>
                    ★
                  </span>
                );
              })}
              <span className="pd-rating-count">({product.reviews} reviews)</span>
            </div>
          )}

          {/* price */}
          <div className="pd-price-row">
            <span className="pd-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="pd-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            {discount && <span className="pd-discount-tag">Save {discount}%</span>}
          </div>

          <p className="pd-description">
            A beautifully crafted piece from our {product.category} collection.
            Made with premium materials for lasting comfort and style.
            Perfect for both casual and formal occasions.
          </p>

          {/* colors */}
          {product.colors && (
            <div className="pd-colors">
              <p className="pd-option-label">Color</p>
              <div className="pd-color-list">
                {product.colors.map(function(color, i) {
                  return (
                    <span
                      key={i}
                      className="pd-color"
                      style={{ background: color }}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* sizes */}
          <div className="pd-sizes">
            <p className="pd-option-label">Size — <span>{selectedSize}</span></p>
            <div className="pd-size-list">
              {sizes.map(function(size) {
                return (
                  <button
                    key={size}
                    className={`pd-size-btn ${selectedSize === size ? 'pd-size-btn--active' : ''}`}
                    onClick={function() { setSelectedSize(size); }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <a href="#" className="pd-size-guide">Size Guide →</a>
          </div>

          {/* quantity */}
          <div className="pd-quantity">
            <p className="pd-option-label">Quantity</p>
            <div className="pd-qty-controls">
              <button
                className="pd-qty-btn"
                onClick={function() { setQuantity(Math.max(1, quantity - 1)); }}
              >
                −
              </button>
              <span className="pd-qty-num">{quantity}</span>
              <button
                className="pd-qty-btn"
                onClick={function() { setQuantity(quantity + 1); }}
              >
                +
              </button>
            </div>
          </div>

          {/* action buttons */}
          <div className="pd-actions">
            <button className="pd-add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`pd-wishlist-btn ${wishlisted ? 'pd-wishlist-btn--active' : ''}`}
              onClick={handleWishlist}
              title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {wishlisted ? '♥' : '♡'}
            </button>
          </div>

          {/* info strips */}
          <div className="pd-strips">
            <div className="pd-strip">
              <span>🚚</span>
              <span>Free shipping on orders over ₹8,000</span>
            </div>
            <div className="pd-strip">
              <span>↩</span>
              <span>Free returns within 30 days</span>
            </div>
            <div className="pd-strip">
              <span>🔒</span>
              <span>Secure & encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* related products */}
      {related.length > 0 && (
        <div className="pd-related">
          <div className="pd-container">
            <h2 className="pd-related-title">You May Also Like</h2>
            <div className="pd-related-grid">
              {related.map(function(p) {
                return (
                  <Link to={`/product/${p.id}`} key={p.id} className="pd-related-card">
                    <img src={p.image} alt={p.name} className="pd-related-img" />
                    <div className="pd-related-info">
                      <p className="pd-related-category">{p.category}</p>
                      <h3 className="pd-related-name">{p.name}</h3>
                      <p className="pd-related-price">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={function() { setToast(null); }}
        />
      )}

    </div>
  );
}

export default ProductDetail;
