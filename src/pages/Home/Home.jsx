import { Link } from "react-router-dom";
import React from "react";

const Home = () => {
  return (
    <div>
      Home
      <Link to={"admin"}>Admin</Link>
    </div>
  );
};

export default Home;
