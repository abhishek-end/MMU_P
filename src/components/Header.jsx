import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-primary shadow-md">
      <div className="flex justify-between items-center mx-auto p-3 max-w-6xl">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-gray-700">Estate</span>
        </h1>
        <form className="bg-white rounded-lg p-3 flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <FaSearch />
        </form>
        <ul className="flex gap-4 ">
          <Link
            to={"/"}
            className="hidden sm:inline text-slate-700 hover:underline"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="hidden sm:inline  text-slate-700 hover:undeLinkne"
          >
            About
          </Link>
          <Link to={"/sign-in"} className=" text-slate-700 hover:underline">
            Sign in
          </Link>
        </ul>
      </div>
    </header>
  );
}
