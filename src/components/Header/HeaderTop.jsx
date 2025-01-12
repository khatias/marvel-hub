import { MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import MarvelLogo from "../../assets/marvelLogo.svg";
import React from "react";
import Drawer from "./Drawer";
import { LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuthToken, removeAuthToken } from "../../utils/authUtils";
import { openSideNav, closeSideNav } from "../../utils/sideNavUtils";

const HeaderTop = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = getAuthToken();

  const handleLogout = () => {
    removeAuthToken();
    navigate("/login");
  };

  return (
    <div className="header-top-container">
      <button onClick={() => openSideNav(setSideNavOpen)}>
        <MenuIcon className="burger-icon icon" />
      </button>
      <Link to="/">
        <img src={MarvelLogo} alt="Marvel Logo" />
      </Link>
      <div className="drawer-container">
      <Drawer isOpen={isSideNavOpen} onclose={() => closeSideNav(setSideNavOpen)} />
      </div>
      <div className="seassion-buttons">
        {isAuthenticated && (
          <div>
            <Link to="/Profile">
              <UserIcon className="icon" />
            </Link>
          </div>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} title="Logout">
            <LogoutIcon className="icon" />
          </button>
        ) : (
          <Link to="/login" title="Login">
            <LoginIcon className="icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeaderTop;
