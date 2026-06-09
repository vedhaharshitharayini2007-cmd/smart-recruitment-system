import React from 'react';
const Hero = ({ onLoginClick, onAiMatchClick }) => {
  return (
    <section className="hero">
      <h1>Find Your Next Opportunity</h1>
      <p>Search thousands of jobs, apply with confidence, <br />and track your applications all in one place.</p>
      
      <div className="hero-actions">
        <button className="btn btn-primary btn-lg">Get Started Now</button>
        <button className="btn btn-outline btn-lg" onClick={onLoginClick}>Login to Continue</button>
      </div>
      
      <div className="ai-feature-trigger">
        <button className="btn btn-ai" onClick={onAiMatchClick}>
          <span className="sparkle-icon">✨</span> AI Auto-Match
        </button>
      </div>
    </section>
  );
};

export default Hero;
