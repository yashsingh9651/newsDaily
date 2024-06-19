import React from "react";
import { useDispatch } from "react-redux";
import { newsByCategory, setCategory } from "../redux/newsSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const categories = [
    "cricket",
    "bussiness",
    "automobiles",
    "tech",
    "health",
    "politics",
  ];
  const dispatch = useDispatch();
  return (
    <div className="sticky w-full top-0 p-5 flex justify-between items-center backdrop-blur-md border-b border-gray-300">
      <Link
        to={"/"}
        className="hover:scale-110 duration-150 lg:text-2xl text-lg lg:font-bold font-semibold"
      >
        Daily-News
      </Link>
      {/* responsive design */}
      <div className="hidden lg:flex items-center gap-5 text-lg font-semibold capitalize">
        {categories.map((category) => {
          return (
            <h1
              className="hover:scale-110 duration-200 cursor-pointer"
              key={category}
              onClick={() => {
                dispatch(setCategory(category));
                dispatch(newsByCategory(category));
              }}
            >
              {category}
            </h1>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
