import React from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-left">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
          alt="Shivora Fashion"
          className="login-bg-img"
        />
        <div className="login-brand">
          <h2 className="login-brand-name">SHIVORA</h2>
          <p className="login-brand-tag">Fashion that speaks for you</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box" style={{ alignItems: 'center' }}>
          <Link to="/" className="login-back" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>← Back to Home</Link>
          <SignIn signUpUrl="/register" forceRedirectUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default Login;
