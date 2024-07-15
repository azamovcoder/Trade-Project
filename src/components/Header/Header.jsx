import "./Header.scss";

import React from "react";

const Header = () => {
  return (
    <header>
      <div className=" header container">
        <h1>Trade</h1>
        <div className="">
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </header>
  );
};

export default Header;
