import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Search from "../Search/Search";

const HeaderBottom = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const handleSearchChange = (value) => {
    setSearchParams({ search: value });
  };

  const handleClearSearch = () => {
    setSearchParams({ search: "" });
  };

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
      <Search
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
      />
    </div>
  );
};

export default HeaderBottom;
