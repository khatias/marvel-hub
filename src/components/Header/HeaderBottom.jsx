import React from "react";
import { Link } from "react-router-dom";

const HeaderBottom = () => {
  return (
    <div className="header-bottom-container">
      <nav>
        <ul className="desktop-nav-list">
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
    </div>
  );
};

export default HeaderBottom;
