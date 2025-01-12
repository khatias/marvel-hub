import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import MarvelLogo from "../../assets/marvelLogo.svg";
import React from "react";
import Drawer from "./Drawer";
import { LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline"; // Added UserIcon
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("authTokenMarvel");

  const handleOpenSideNav = () => {
    setSideNavOpen(true);
    console.log("open");
  };

  const handleCloseSideNav = () => {
    setSideNavOpen(false);
    console.log("closed");
  };

  const handleLogout = () => {
    localStorage.removeItem("authTokenMarvel");
    navigate("/login");
  };

  return (
    <div className="mobile-nav-container">
      <button className="mobile-nav-button" onClick={handleOpenSideNav}>
        <MenuIcon className="burger-icon icon" />
      </button>

      <img src={MarvelLogo} alt="Marvel Logo" />
      <Drawer isOpen={isSideNavOpen} onclose={handleCloseSideNav} />

      <div className="mobile-buttons">
      {isAuthenticated && (
          <div className="user-info">
            <UserIcon className="icon text-green-500" />
          </div>
        )}
        {isAuthenticated ? (
          <button
            className="mobile-nav-button logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <LogoutIcon className="icon" />
          </button>
        ) : (
          <Link to="/login" title="Login">
            <LoginIcon className="icon text-blue-500" />
          </Link>
        )}
 
      </div>
    </div>
  );
};

export default MobileMenu;
