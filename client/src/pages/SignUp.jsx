import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquareFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" max-w-lg mx-auto mt-40 ">
      <h1 className="text-black  font-extrabold text-center mb-12 text-3xl">
        SIGN UP
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4 max-w-lg  "
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        {/* <input
          type="text"
          placeholder="Re-enter password"
          className="border p-3 rounded-lg"
          id="passwrod"
          onChange={handleChange}
        /> */}
        <button
          className="border text-white text-xl bg-secondary rounded-xl p-2"
          disabled={loading}
        >
          {loading ? "loading..." : "SIGN UP"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to={"/sign-in"} className="text-blue-700">
          Sign In
        </Link>
      </div>
      {/* <i className="text-center text-2xl font-medium  ">---OR---</i> */}
      {/* <div className="flex justify-center  gap-8 ">
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
    </div>
  );
}

export default SignUp;
