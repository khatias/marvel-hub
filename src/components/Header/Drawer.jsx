import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Drawer = ({ isOpen, onclose }) => {
  return (
    <div className={`side-nav ${isOpen ? "open" : "closed"}`}>
      <button onClick={onclose} className="close-btn">
        <XIcon className="close-icon icon" />
      </button>
      <nav>
        <ul className="mobile-nav-list">
          <li>
            <Link to="/" onClick={onclose}>Home</Link>
          </li>
          <li>
            <Link to="/products" onClick={onclose}>Products</Link>
          </li>
          <li>
            <Link to="/characters" onClick={onclose}>Characters</Link>
          </li>
          <li>
            <Link to="/favorites" onClick={onclose}>Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Drawer;
