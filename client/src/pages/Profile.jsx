import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const currentUser = useSelector((state) => state.user);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-bold my-7   ">Profile</h1>
      <form className="flex flex-col gap-y-4 ">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full w-32 h-32 text-center  object-cover cursor-pointer self-center border-2 border-red-600"
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border p-3  rounded-lg outline-none "
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3  rounded-lg outline-none   "
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3  rounded-lg outline-none  "
        />
        <button className="bg-primary rounded-lg p-3">Upgrade</button>
      </form>
      <div className="flex justify-between mt-5 ">
        <span className="text-red-700 cursor-pointer m-1">Delete account </span>
        <span className="text-red-700 cursor-pointer m-1">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
