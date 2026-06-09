import React from 'react';

const Features = () => {
  return (
    <section className="features">
      <div className="feature-card">
        <div className="feature-icon">🔍</div>
        <h3>Smart Search</h3>
        <p>Find jobs that match your skills with advanced filters and search capabilities.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">📋</div>
        <h3>Track Applications</h3>
        <p>Keep track of all your applications and their status in one place.</p>
      </div>
      <div className="feature-card">
        <div className="feature-icon">⭐</div>
        <h3>Save Favorites</h3>
        <p>Bookmark jobs you're interested in and review them later.</p>
      </div>
    </section>
  );
};

export default Features;
