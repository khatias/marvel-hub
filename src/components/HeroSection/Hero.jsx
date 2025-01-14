import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Unleash the Marvel Universe!</h1>
          <p className="hero-tagline">
            Comics, Stories, and Exclusive Content – Dive into the Adventure.
          </p>
          <div className="hero-links">
            <Link to="/products" className="custom-button ">
              Explore Comics
            </Link>
            <Link to="./login" className="custom-button secondary-btn">
              Join the Action
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
