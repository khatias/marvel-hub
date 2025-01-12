import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <svg
          viewBox="0 0 36 52"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect fill="#EC1D24" width="100%" height="100%"></rect>
          <path
            fill="#FEFEFE"
            d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"
          ></path>
        </svg>
      </div>

      <div className="footer-info">
        <p>&copy; {new Date().getFullYear()} Marvel. All rights reserved.</p>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
      </div>

      <nav>
        <ul className="footer-nav-list">
          <li>
            <Link to="/" onClick={onclose}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={onclose}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/characters" onClick={onclose}>
              Characters
            </Link>
          </li>
          <li>
            <Link to="/favorites" onClick={onclose}>
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
