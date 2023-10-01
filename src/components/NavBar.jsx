import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUser } from "../redux/slice/user";
import axios from "axios";
import { setProducts } from "../redux/slice/products";
import Profile from "./profile/Profile";
import Filter from "./Filters/Filter";
import { setlogin } from "../redux/slice/login";

const NavBar = () => {
  const userstate = useSelector((state) => state.user);
  const [token, setToken] = useState();
  const [input, setinput] = useState("");
  const [FilterVisible, setFilterVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [resultDiv, setResultDiv] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileCard, setprofileCard] = useState(false);

  useEffect(() => {
    setProducts([]);
    axios("http://localhost:8000/api/user", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          dispatch(setUser(response.data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setToken(Cookies.get("token"));
    if (Cookies.get("login")) {
      dispatch(setLogin(true));
    }
  }, [token, searchResult, userstate.isLogin]);

  const clearInput = (e) => {
    const inputParent = e.target.parentElement;
    setinput("");
  };

  const hideDiv = () => {
    setResultDiv(false);
  };

  const handleInputChange = (e) => {
    setResultDiv(true);
    setinput(e.target.value);
    axios
      .get(`http://localhost:8000/search?keyword=${e.target.value}`)
      .then((products) => {
        setSearchResult(products.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleProfileCard = () => {
    setprofileCard(!profileCard);
  };

  const handleFilterClick = (e) => {
    setFilterVisible(!FilterVisible);
  };
  return (
    <>
      <nav className="sticky z-20  top-1 rounded  border-gray-200 px-5 py-1  backdrop-blur-2xl bg-white/70 m-2 ml-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center ">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-semibold  text-black p-3  border-gray-500 my-2">
                UrbanBazar
              </span>
            </Link>
            <Link to={`${userstate.SellerMode ? "seller/dashboard" : "/shop"}`}>
              <div
                className={`item px-3 ${
                  !userstate.SellerMode
                    ? location.pathname === "/shop" && "text-green-700"
                    : location.pathname === "/seller/dashboard" &&
                      "text-green-700"
                }  hover:text-green-700 transition-all duration-300 ease-linear font-semibold`}
              >
                {userstate.SellerMode ? "Dashboard" : "Shop"}
              </div>
            </Link>
            <Link
              to={`${userstate.SellerMode ? "seller/products" : "/orders"}`}
            >
              <div
                className={`item font-semibold px-3 ${
                  !userstate.SellerMode
                    ? location.pathname === "/orders" && "text-green-700"
                    : location.pathname === "/seller/products" &&
                      "text-green-700"
                } hover:text-green-700 transition-all duration-300 ease-linear`}
              >
                {userstate.SellerMode ? "My Products" : "My Orders"}
              </div>
            </Link>
            <Link
              to={`${userstate.SellerMode ? "seller/addproduct" : "/support"}`}
            >
              <div
                className={`item font-semibold px-3 ${
                  !userstate.SellerMode
                    ? location.pathname === "/support" && "text-green-700"
                    : location.pathname === "/seller/addproduct" &&
                      "text-green-700"
                } hover:text-green-700 transition-all duration-300 ease-linear`}
              >
                {userstate.SellerMode ? "Add Product" : "Customer Support"}
              </div>
            </Link>
          </div>
          {!userstate.SellerMode && (
            <div className="relative hidden md:flex w-4/12 items-center search">
              <input
                type="text"
                id="search-navbar"
                className="block w-11/12 p-2 text-sm font-semibold text-gray-900 border-gray-200 rounded-md bg-gray-50/80 backdrop-blur-lg opacity-80  focus:border-none"
                placeholder="What Are You Looking For ? "
                value={input}
                onChange={handleInputChange}
              />
              <i className="fa fa-search text-sm relative -ml-9 p-2 text-neutral-500 hover:text-green-700 transition-all duration-200 ease-linear"></i>
              {input !== "" && (
                <i
                  className="fa fa-close text-sm relative -ml-14 p-2 text-neutral-500 hover:text-red-700 transition-all duration-200 ease-linear"
                  onClick={clearInput}
                ></i>
              )}

              {input !== "" && resultDiv && (
                <div className=" w-11/12 rounded-md h-44 bg-gray-50 overflow-hidden  border  backdrop-blur-3xl absolute mt-56">
                  {searchResult.map((product) => {
                    return (
                      <Link
                        to={`product/${product._id}`}
                        state={{ id: product._id }}
                        onClick={hideDiv}
                      >
                        <div
                          className=" w-full h-1/6 text-sm px-2  flex items-center font-bold hover:bg-slate-200 cursor-pointer"
                          id={product._id}
                        >
                          {product.title}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {location.pathname.includes("/shop") && (
            <button className=" font-bold" onClick={handleFilterClick}>
              <i className="fa-solid fa-filter font-sans mr-1"></i>Filters
            </button>
          )}
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
              <span className="sr-only">Search </span>
            </button>
            {userstate.isLogin === true ? (
              <>
                {!userstate.SellerMode && (
                  <Link
                    to={"/cart"}
                    className="flex  justify-center items-center font-semibold pr-4  transition-all duration-200 ease-in mx-2 border  border-green-500 text-md rounded-xl hover:border-black hover:text-green-500"
                  >
                    <img
                      className=" mr-1 h-8  cursor-pointer rounded-lg scale-75 bg-green-500 p-1.5"
                      src="../icons/cart.png"
                      alt="cart"
                    ></img>
                    cart
                  </Link>
                )}
                <div
                  onClick={toggleProfileCard}
                  className="flex justify-center rounded-full overflow-hidden hover:bg-green-200 items-center text-sm font-semibold transition-all duration-300 ease-in p-1"
                >
                  <img
                    className="  h-6 cursor-pointer  rounded-full"
                    src="../icons/user.png"
                    alt="user"
                  ></img>
                </div>
                {profileCard && <Profile />}
              </>
            ) : (
              <Link to={"/login"}>
                <button
                  type="button"
                  className="text-gray-500   bg-green-500  transition-all duration-300 ease-in-out hover:bg-green-500/80  rounded-lg text-sm px-6 py-2 text-center font-bold mx-1 "
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
        {location.pathname.includes("/shop") && FilterVisible && <Filter />}
        {/* <div className=" font-bold text-sm flex  items-center gap-2">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            class="sr-only peer"
            id="seller-switch "
          />
          <div class="w-11 h-5 border-2  p-1    rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>
        </label>
        become seller
        </div> */}
      </nav>
    </>
  );
};

export default NavBar;
