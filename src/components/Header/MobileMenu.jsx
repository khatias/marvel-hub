import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import MarvelLogo from '../../assets/marvelLogo.svg'
import React from "react";
import Drawer from "./Drawer";
import Search from "./Search";

const MobileMenu = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);

  const handleOpenSideNav = () => {
    setSideNavOpen(true);
    console.log("open");
  };

  const handleCloseSideNav = () => {
    setSideNavOpen(false);
    console.log("closed");
  };
  return (
    <div className="mobile-nav-container">
      <button className="burger-button" onClick={handleOpenSideNav}>
        <MenuIcon className="burger-icon icon" />
      </button>

      <img src={MarvelLogo} alt="Marvel Logo" />
      <Drawer isOpen={isSideNavOpen} onclose={handleCloseSideNav} />
      <Search/>
    </div>
  );
};

export default MobileMenu;