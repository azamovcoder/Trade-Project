import "./Header.scss";

import { FaBars } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import React from "react";

const Header = ({ setMenu }) => {
  console.log();
  return (
    <header>
      <div className=" header">
        <h1 className="header__logo">Trade</h1>

        <div className="header__items">
          <button
            onClick={() => setMenu((prev) => !prev)}
            className="navbar__menu"
          >
            <FaBars />
          </button>
          <div className="header__input">
            <button>
              <IoSearchOutline />
            </button>
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
