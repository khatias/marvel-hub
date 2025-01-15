import React from 'react';
import './NotFound.css'; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Page Not Found</h1>
      <p className="not-found-message">HYDRA has stolen this page from th S.H.I.E.L.D</p>
      <a href="/" className="back-home-button">Back to Home</a>
    </div>
  );
};

export default NotFound;
