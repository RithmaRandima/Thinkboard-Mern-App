import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      {/* left side */}
      <div>
        <h1>Board</h1>
      </div>
      {/* right side */}
      <div className="flex items-center justify-between">
        <Link to={"/"}>Home</Link>
        <Link to={"/create"} className="flex bg-green-300">
          +<p>Create Note</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
