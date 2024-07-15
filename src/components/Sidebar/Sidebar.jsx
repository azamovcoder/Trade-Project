import "./Sidebar.scss";

import { GrUserAdmin } from "react-icons/gr";
import { IoPeopleSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import React from "react";
import { SiGooglecloudstorage } from "react-icons/si";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <ul className="sidebar__list">
          <NavLink to={"customers"}>
            <li className="sidebar__item">
              <IoPeopleSharp />
              <span>Customers</span>
            </li>
          </NavLink>
          <NavLink to={"storage"}>
            <li className="sidebar__item">
              <SiGooglecloudstorage />
              <span>Storage</span>
            </li>
          </NavLink>
          <NavLink to={"sellers"}>
            <li className="sidebar__item">
              <GrUserAdmin />
              <span>Sellers</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
