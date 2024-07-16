import "./Sidebar.scss";

import { GrUserAdmin } from "react-icons/gr";
import { IoCreateOutline } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import React from "react";
import { SiGooglecloudstorage } from "react-icons/si";

const Sidebar = ({ menu }) => {
  return (
    <div>
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
