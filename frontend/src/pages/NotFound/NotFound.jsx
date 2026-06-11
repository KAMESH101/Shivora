import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import './NotFound.css';

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="container not-found__inner">
        <div className="not-found__number">404</div>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__sub">
          The page you're looking for seems to have slipped away. Let's get you back on track.
        </p>
        <div className="not-found__actions">
          <Button href="/" variant="primary" size="lg">Back to Home</Button>
          <Button href="/shop" variant="secondary" size="lg">Shop All</Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
