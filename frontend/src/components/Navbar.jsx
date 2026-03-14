import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEarlybirds } from "react-icons/fa6";
const Navbar = ({ currentStatus, setCurrentStatus }) => {
  return (
    <div className="fixed w-[100%] bottom-2 left-1/2 -translate-x-1/2 p-2 rounded-full flex  items-center justify-between z-10">
      {/* left side */}
      <Link
        to={"/"}
        className="w-20 h-20 bg-gray-200 rounded-full relative flex items-center justify-start ml-4"
      >
        <FaEarlybirds className="text-6xl" />
        <p className="absolute -bottom-1 -right-6 font-bold text-[20px] tracking-[2px]">
          notify
        </p>
      </Link>
      {/* right side */}
      <div>
        {currentStatus === "create" ? (
          <Link
            to={"/create"}
            onClick={() => setCurrentStatus("back")}
            className="w-13 h-13 flex items-center justify-center bg-black text-white rounded-full font-bold mr-5 hover:bg-gray-100 hover:text-black duration-300 hover:-translate-y-2 hover:shadow-[1px_1px_3px_black]"
          >
            <p className="text-[30px] font-extrabold">+</p>
          </Link>
        ) : (
          <Link
            to={"/"}
            onClick={() => setCurrentStatus("create")}
            className=" flex items-center px-4 py-2 justify-center bg-black text-white rounded-full font-bold mr-5 hover:bg-gray-100 hover:text-black duration-300 hover:-translate-y-2 hover:shadow-[1px_1px_3px_black]"
          >
            <p className="text-[16px] font-extrabold flex items-center gap-2">
              <FaArrowLeft />
              Back to Home
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
