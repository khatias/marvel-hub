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
            <Link to="/"> Home </Link>
          </li>
          <li>
          <Link to="/products"> products </Link>
          </li>
         
          <li>
          <Link to="/characters"> characters </Link>
          </li>
          <li>          <Link to="/favorites"> favorites </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Drawer;
