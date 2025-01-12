import React from "react";
import "./Header.css";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

const Header = () => {
  return (
    <header>
      <HeaderTop />
      <HeaderBottom/>
    </header>
  );
};

export default Header;
