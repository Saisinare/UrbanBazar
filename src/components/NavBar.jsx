import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";


const NavBar = () => {
  const userstate = useSelector((state=> state.user))
  const [token, setToken] = useState();

  
  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [token]);
  return (
    <>
      <nav className="sticky z-50  top-0  border-gray-200 px-5 py-0  backdrop-blur-2xl bg-white/70" >
        <div className="flex flex-wrap items-center justify-between  ">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap   text-black p-3 rounded my-2">
              UrbanBazar
            </span>
          </Link>
          <div className="relative hidden md:flex w-4/12 items-center ">
            <input
              type="text"
              id="search-navbar"
              className="block w-11/12 p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
      "
              placeholder="Search For Your Favoirate Item "
            />
            <button
              type="button"
              className="text-white bg-gradient-to-r from-gray-700  to-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center mx-1"
            >
              Search
            </button>
          </div>

          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            {userstate.isLogin ? (
              <>
                <Link to={"/cart"}>
                  <img
                    className=" mx-4 h-11 p-2.5 cursor-pointer  rounded hover:bg-gray-100"
                    src="icons/cart.png"
                    alt="cart"
                  ></img>
                </Link>
                <Link to={"seller/addProduct"}>
                  add Product
                </Link>
                <Link to={"/profile"}>
                  <img
                    className=" mx-4 mt-1 shadow h-10 p-1.5 cursor-pointer  rounded-full hover:bg-gray-100"
                    src="icons/user.png"
                    alt="cart"
                  ></img>
                </Link>
              </>
            ) : (
              <Link to={"/login"}>
            <button
              type="button"
              className="text-black bg-transparent border-2 border-green-950 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm font-sans font-bold rounded-sm px-5 py-1.5 text-center mx-1 hover:bg-gradient-to-t from-black to-slate-900 hover:text-white transition-all duration-500 ease-in-out shadow bg-green-200"
            >
              Login
            </button>
            </Link>
            )}

            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <div className="relative mt-3 md:hidden ">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
