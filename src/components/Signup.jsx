import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setLogin, setUser } from "../redux/slice/user";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hadleSignup = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      mobileNo: e.target.mobileNo.value,
      password: e.target.password.value,
    };
    try {
      const response = await axios.post("http://localhost:8000/user/signup", user);
      if (response) {
        if (response.data.sucess) {
          dispatch(setLogin(true))
          dispatch(setUser(response.data.user))
          navigate('/')
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className=" h-auto bg-gray-50 text-black pt-24">
        <div className="flex  flex-col items-center justify-center px-6  mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            UrbanBazar
          </Link>
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create New Account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={hadleSignup}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm  text-gray-900 font-semibold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    placeholder="Enter Username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm  text-gray-900 font-semibold"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobileNo"
                    className="block mb-2 text-sm  text-gray-900 font-semibold"
                  >
                    Your Mobile No.
                  </label>
                  <input
                    type="text"
                    name="mobileNo"
                    id="mobileNo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm  text-gray-900 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm  text-gray-900 font-semibold"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full "
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/forgotpass"
                    className="text-sm  text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-gray-700  to-black  focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center font-bold"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already Have Account?{" "}
                  <Link
                    to="/login"
                    className=" text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-52 bg-gray-50"></div>
    </>
  );
};

export default Signup;
