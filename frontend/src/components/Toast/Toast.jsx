import React, { useEffect } from 'react';
import './Toast.css';

// simple toast popup for showing messages like "Added to cart"

function Toast({ message, type = 'success', onClose }) {

  // auto close after 3 seconds
  useEffect(function() {
    const timer = setTimeout(function() {
      onClose();
    }, 3000);
    return function() { clearTimeout(timer); };
  }, [onClose]);

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✓' : '✕'}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;
