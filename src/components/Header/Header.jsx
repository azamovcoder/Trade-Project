import "./Header.scss";

import React, { useState } from "react";

import CustomerSearch from "./CustomerSearch";
import { FaBars } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useGetProfileQuery } from "../../context/api/AdminApi";

const Header = ({ setMenu }) => {
  const { data } = useGetProfileQuery();
  console.log(data);
  const [search, setSearch] = useState("");
  return (
    <header>
      <div className=" header">
        <div className="header__logo">
          <h2>
            {data?.innerData?.user?.lname?.slice(0, 1)}
            {data?.innerData?.user?.fname?.slice(0, 1)}
          </h2>
        </div>

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
