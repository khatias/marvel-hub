import React from 'react';
import "./Hero.css"; 

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Unleash the Marvel Universe!</h1>
          <p className="hero-tagline">Comics, Stories, and Exclusive Content – Dive into the Adventure.</p>
          <div className="hero-buttons">
            <button className="hero-btn primary-btn">Explore Comics</button>
            <button className="hero-btn secondary-btn">Join the Action</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;