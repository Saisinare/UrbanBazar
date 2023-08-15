import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUser } from "../redux/slice/user";
import axios from "axios";


const NavBar = () => {
  const userstate = useSelector((state=> state.user))
  const [token, setToken] = useState();
  const location = useLocation()
  const userState  = useSelector(state=>state.user)
  
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(userState)
    axios('http://localhost:8000/api/user',{withCredentials:true}).then(response=>{
      if(response.data){
        dispatch(setUser(response.data.user))
        console.log(response.data.user)
      }
    }).catch(err=>{
      console.log(err)
    })
    console.log(userState)
    setToken(Cookies.get("token"));
    if(Cookies.get('login')){
      dispatch(setLogin(true))
      
    }
  }, [token]);
  return (
    <>
    
      <nav className="sticky z-20  top-0  border-gray-200 px-5 py-0  backdrop-blur-2xl bg-white/70" >

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
              className="block w-11/12 p-2  text-sm text-gray-900 border-gray-200 rounded-lg bg-gray-50/80 backdrop-blur-lg opacity-80 outline-none shadow"
              style={{outline:"none"}}
              placeholder="Search For Your Favoirate Item "
            />
            <button
              type="button"
              className="text-white bg-gradient-to-l transition-all duration-300 ease-in-out  from-black/90 to-slate-900/90 hover:bg-black/80  font-medium rounded-lg text-sm px-5 py-2 text-center mx-1 "
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
                <Link to={"/cart"} className="flex justify-center items-center font-semibold hover:bg-slate-300 px-4 transition-all duration-200 ease-in rounded-md mx-2">
                  <img
                    className=" mr-1 h-11 py-2.5 cursor-pointer  rounded"
                    src="../icons/cart.png"
                    alt="cart"
                  ></img>cart
                </Link >
                <Link to={"/profile"} className="flex justify-center hover:bg-slate-300 items-center text-sm font-semibold px-2 rouded-full transition-all duration-300 ease-in">
                  <img
                    className="  h-10 p-1.5 cursor-pointer scale-90 "
                    src="../icons/user.png"
                    alt="user"
                  ></img>
                </Link>
              </>
            ) : (
              <Link to={"/login"}>

            <button
              type="button"
              className="text-gray-500 shadow-lg shadow-green-300  bg-green-500  transition-all duration-300 ease-in-out hover:bg-green-500/80  rounded-lg text-sm px-6 py-2 text-center font-bold mx-1 "
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
