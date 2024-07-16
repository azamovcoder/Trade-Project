import { Link } from "react-router-dom";
import Login from "./Login/Login";
import React from "react";

const Home = () => {
  return (
    <div>
      <Login />
      <Link to={"admin"}>Admin</Link>
    </div>
  );
};

export default Home;
