import React, { useContext } from "react";
import { assets } from '../assets/assets.js'

import { AdminContext } from "../context/AdminContext.js";
import { useNavigate } from "react-router-dom";
import { DocterContext } from "../context/DocterContext.js";

const Navbar = () => {
  const { aToken, SetAToken } = useContext(AdminContext);
  const {dtoken , setDToken} = useContext(DocterContext)

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && SetAToken("");
    aToken && localStorage.removeItem("aToken");
    dtoken && setDToken("");
    dtoken && localStorage.removeItem("dtoken");
  };

  return (
    <div className=" flex justify-between  items-center px-4 sm:px-10 border-b bg-white ">
      <div className=" flex items-center text-sm gap-2">
        <img
          className="w-36 sm:w-40  cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full">
          {" "}
          {aToken ? "admin" : "docter"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-blue-500 text-white text-sm px-10 py-2.5 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
