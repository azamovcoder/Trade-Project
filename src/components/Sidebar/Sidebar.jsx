import "./Sidebar.scss";

import { GrUserAdmin } from "react-icons/gr";
import { IoCreateOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { SiGooglecloudstorage } from "react-icons/si";

const Sidebar = ({ menu }) => {
  return (
    <div className={`sidebar ${menu ? "sidebar__show" : ""}`}>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <NavLink to={"customers"}>
            <span>
              <IoPeopleSharp />
            </span>
            <p>Customers</p>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to={"storage"}>
            <span>
              <SiGooglecloudstorage />
            </span>
            <p>Storage</p>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to={"sellers"}>
            <span>
              <GrUserAdmin />
            </span>
            <p>Sellers</p>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to={"create"}>
            <span>
              <IoCreateOutline />
            </span>
            <p>Create Customer</p>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to={"profile"}>
            <span>
              <IoCreateOutline />
            </span>
            <p>Profile</p>
          </NavLink>
        </li>
      </ul>
      <div className="sidebar__log__out">
        <NavLink to={"/"}>
          <span>
            <RiLogoutBoxLine />
          </span>
          <p>Log Out</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
