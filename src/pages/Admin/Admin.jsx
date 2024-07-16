import "./Admin.scss";

import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Admin = ({ menu }) => {
  return (
    <div className={`admin ${menu ? "admin__show" : ""}`}>
      <Sidebar menu={menu} />
      <Outlet />
    </div>
  );
};

export default Admin;
