import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquareFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-40">
      <h1 className="text-black  font-extrabold text-center mb-12 text-3xl">
        SIGN IN
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 max-w-lg"
      >
        <input
          type="text"
          placeholder="Email Address *"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password *"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        {/* <input
          type="text"
          placeholder="Re-enter password"
          className="border p-3 rounded-lg"
          id="password"  // Corrected typo: passwrod to password
          onChange={handleChange}
        /> */}
        <button
          type="submit"
          className="border text-white text-xl bg-secondary rounded-xl p-2"
          disabled={loading}
        >
          {loading ? "loading..." : "SIGN IN"}
        </button>

        <OAuth />
      </form>
      <div className="flex gap-2 mt-2 ml-1">
        <p>Don't have an account?</p> {/* Corrected typo: Dont to Don't */}
        <Link to={"/sign-up"} className="text-blue-700">
          Sign Up
        </Link>
      </div>
      {/* <i className="text-center text-2xl font-medium  ">---OR---</i> */}
      {/* <div className="flex justify-center gap-8">
        <button>
          <h1 className="rounded-full flex align-middle gap-4">
            <FontAwesomeIcon icon={faGoogle} />
            sign up with Google
          </h1>
        </button>
        <button className="border-black">
          <h1 className="">
            <FontAwesomeIcon icon={faSquareFacebook} />
            Sign up with Facebook
          </h1>
        </button>
      </div> */}
      {error && <p className="text-red-500 mt-5">{error}</p>}{" "}
      {/* Removed unnecessary semicolon */}
    </div>
  );
}

export default SignUp;
