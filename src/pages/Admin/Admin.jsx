import "./Admin.scss";

import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Admin;
