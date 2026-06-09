import React from 'react';
import './ProfilePanel.css'; // reuse btn-profile styles

const Header = ({ isLoggedIn, userEmail, onLoginClick, onLogoutClick, onProfileClick }) => {
  const initials = userEmail ? userEmail.slice(0, 1).toUpperCase() : '?';

  return (
    <header className="navbar">
      <div className="logo">JobFinder</div>
      <div className="nav-actions">
        {isLoggedIn ? (
          <>
            <a href="#" className="nav-link active">Browse Jobs</a>
            <a href="#" className="nav-link">Saved</a>
            <a href="#" className="nav-link">Applications</a>
            <button className="btn-profile" onClick={onProfileClick}>
              <span className="profile-avatar">{initials}</span>
              Profile
            </button>
            <button className="btn btn-outline btn-logout" onClick={onLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={onLoginClick}>Login</button>
            <button className="btn btn-primary">Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
