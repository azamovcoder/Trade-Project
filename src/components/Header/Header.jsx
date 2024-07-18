import "./Header.scss";

import React, { useState } from "react";

import CustomerSearch from "./CustomerSearch";
import { FaBars } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

const Header = ({ setMenu }) => {
  console.log();
  const [search, setSearch] = useState("");
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
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"search"}
              value={search}
              type="text"
            />
            {search ? <CustomerSearch search={search} /> : <></>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
