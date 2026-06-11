import React from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import './Register.css';

function Register() {
  return (
    <div className="register-page">
      <div className="register-left">
        <img
          src="https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80"
          alt="Shivora Fashion"
          className="register-bg-img"
        />
        <div className="register-brand">
          <h2 className="register-brand-name">SHIVORA</h2>
          <p className="register-brand-tag">Join our fashion community</p>
        </div>
      </div>

      <div className="register-right">
        <div className="register-box" style={{ alignItems: 'center' }}>
          <Link to="/" className="register-back" style={{ alignSelf: 'flex-start', marginBottom: '10px' }}>← Back to Home</Link>
          <SignUp signInUrl="/login" forceRedirectUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default Register;
