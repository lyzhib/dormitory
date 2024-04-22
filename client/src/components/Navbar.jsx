import React from "react";
import Logo from "../img/a.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;