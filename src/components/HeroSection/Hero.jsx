import React from 'react';
import "./Hero.css"; 
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Unleash the Marvel Universe!</h1>
          <p className="hero-tagline">Comics, Stories, and Exclusive Content – Dive into the Adventure.</p>
          <div className="hero-buttons">
            <Link to='/products' className="hero-btn primary-btn">Explore Comics</Link>
            <Link to='./login' className="hero-btn secondary-btn">Join the Action</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;