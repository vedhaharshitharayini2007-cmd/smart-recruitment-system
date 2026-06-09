import React, { useEffect, useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsRendered(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onLoginSuccess(email);
    }
  };

  if (!isRendered) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? '' : 'hidden-anim'}`}
      onClick={onClose}
      onTransitionEnd={handleAnimationEnd}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>JobFinder</h2>
          <p>Sign in to your account</p>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          <p className="form-footer">
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
