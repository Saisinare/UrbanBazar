import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUser } from "../redux/slice/user";
import axios from "axios";
import { setProducts } from "../redux/slice/products";
import Profile from "./profile/Profile";
import Filter from "./Filters/Filter";
import MyLoadingBar from "./MyLoadingBar";
import { setisComplete, setisWaiting } from "../redux/slice/progressBar";
import jsCookie from "js-cookie";
import HambergerMenu from "./HambergerMenu";

const NavBar = () => {
  const [progress, setprogress] = useState(0);
  const userstate = useSelector((state) => state.user);
  const [token, setToken] = useState();
  const [input, setinput] = useState("");
  const [FilterVisible, setFilterVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [resultDiv, setResultDiv] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileCard, setprofileCard] = useState(false);
  const [menu, setmenu] = useState(false)
  const disptach = useDispatch();

  useEffect(() => {
    setProducts([]);
    dispatch(setisWaiting(true));
    axios(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/user?token=${jsCookie.get(
        "token"
      )}`,
      { withCredentials: true }
    )
      .then((response) => {
        dispatch(setisComplete(true));
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
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/search?keyword=${e.target.value}`
      )
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
      <nav className="sticky z-20 top-1  border-gray-200 px-5 py-1  backdrop-blur-2xl rounded-lg bg-white/70 m-2 ml-3">
        <div className="flex flex-wrap items-center justify-between ">
          <div className="flex items-center ">
            <Link to="/" className="flex items-center" onClick={ ()=>{setmenu(false)}}>
              <span className="text-2xl font-semibold  text-black p-3  border-gray-500 my-2">
                UrbanBazar
              </span>
            </Link>
            <div className=" hidden md:flex ">
              <Link
                to={`${userstate.SellerMode ? "seller/dashboard" : "/shop"}`}
              >
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

              {userstate.SellerMode && (
                <Link to={"seller/addproduct"}>
                  <div
                    className={`item font-semibold px-3 ${
                      !userstate.SellerMode
                        ? location.pathname === "/support" && "text-green-700"
                        : location.pathname === "/seller/addproduct" &&
                          "text-green-700"
                    } hover:text-green-700 transition-all duration-300 ease-linear`}
                  >
                    {"Add Product"}
                  </div>
                </Link>
              )}
            </div>
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
            {userstate.isLogin === true ? (
              <>
                {!userstate.SellerMode && (
                  <Link
                    to={"/cart"}
                    className="hidden md:flex   justify-center items-center font-semibold pr-4  transition-all duration-200 ease-in mx-2 border  border-green-500 text-md rounded-xl hover:border-black hover:text-green-500 " 
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
                  className="hidden md:flex justify-center rounded-full overflow-hidden hover:bg-green-200 items-center text-sm font-semibold transition-all duration-300 ease-in p-1  "
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
              onClick={ ()=>{setmenu(!menu)}}
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
        </div>
        {location.pathname.includes("/shop") && FilterVisible && <Filter />}
      </nav>
      <MyLoadingBar progress={progress} />
       <HambergerMenu menu={menu} setmenu={setmenu}/>
    </>
  );
};

export default NavBar;
