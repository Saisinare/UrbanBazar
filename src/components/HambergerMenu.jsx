import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin, setSellerMode } from "../redux/slice/user";
import { setlogin } from "../redux/slice/login";
import Cookies from "js-cookie";
import axios from "axios";

const HambergerMenu = (props) => {
  const userstate = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSwitch = (e) => {
    if (e.target.checked) {
      dispatch(setSellerMode(true));
      navigate("/seller/products");
    } else {
      dispatch(setSellerMode(false));
      navigate("/");
    }
  };
  const [searchResultState, setsearchResultState] = useState(false);
  const [searchResult, setsearchResult] = useState([]);
  const [input, setinput] = useState("");
  const handleSearch = (e) => {
    setsearchResultState(true);
    setinput(e.target.value);

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/search?keyword=${e.target.value}`
      )
      .then((products) => {
        setsearchResult(products.data.products);
        console.log(products.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    Cookies.remove("login");
    Cookies.remove("token");
    dispatch(setLogin(false));
    dispatch(setlogin(false));
  };

  return (
    <div
      className={` top-20 bg-white px-8 h-screen w-screen fixed z-50   md:hidden transition-all duration-200 ease-linear ${
        props.menu ? " ml-0 opacity-100" : "-ml-96 opacity-0 "
      } `}
    >
      <div className=" w-full h-20 border-b flex justify-between items-center ">
        <div className=" w-full">
          <input
            type="text"
            className=" w-full h-1/2 rounded-lg border-none shadow bg-slate-50"
            placeholder="What are you looking for?"
            onChange={handleSearch}
            value={input}
          />
          <i className=" fa-solid fa-search relative -ml-8"></i>
          <i
            className=" fa-solid fa-close relative -ml-10"
            onClick={() => {
              setinput("");
              setsearchResult([]);
              setsearchResultState(false);
            }}
          ></i>
        </div>
      </div>
      <div
        className={` w-full h-full bg-white fixed z-50 ${
          searchResultState ? "flex" : "hidden"
        } flex-col `}
      >
        {searchResult.map((result) => {
          return (
            <Link
              to={`product/${result._id}`}
              state={{ id: result._id }}
              onClick={() => {
                props.setmenu(false);
                setsearchResultState(false);
              }}
            >
              <div className=" w-full h-10 flex items-center border-b">
                {result.title}
              </div>
            </Link>
          );
        })}
      </div>
      <div className=" w-full h-20 border-b flex justify-between items-center ">
        <div className=" w-fit">Seller Mode</div>
        <div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only peer"
              id="seller-switch "
              onChange={handleSwitch}
              checked={userstate.SellerMode}
            />
            <div class="w-8 h-4 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all bg-slate-200 hover:bg-slate-300 transition-all ease-in duration-100 peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>

      <Link
        to={`${userstate.SellerMode ? "seller/dashboard" : "/cart"}`}
        onClick={() => {
          props.setmenu(!props.menu);
        }}
      >
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
            <i
              class={`${
                userstate.SellerMode
                  ? "fa-solid fa-gauge"
                  : "fa-solid fa-cart-shopping"
              }`}
            ></i>
          </div>
          <div>{`${userstate.SellerMode ? "Dashboard" : "My Cart"}`}</div>
        </div>
      </Link>

      <Link
        to={`${userstate.SellerMode ? "seller/products" : "/shop"}`}
        onClick={() => {
          props.setmenu(!props.menu);
        }}
      >
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
            <i
              className={`${
                userstate.SellerMode
                  ? "fa-brands fa-product-hunt"
                  : "fa-solid fa-shopping-bag"
              }`}
            ></i>
          </div>
          <div>{`${userstate.SellerMode ? "My Products" : "Shop"}`}</div>
        </div>
      </Link>

      <Link
        to={`${userstate.SellerMode ? "/seller/addproduct" : "/orders"}`}
        onClick={() => {
          props.setmenu(!props.menu);
        }}
      >
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
            <i
              class={`${
                userstate.SellerMode ? "fa-solid fa-plus" : "fa-solid fa-box"
              }`}
            ></i>
          </div>
          <div>{`${userstate.SellerMode ? "Add Product" : "My Orders"}`}</div>
        </div>
      </Link>

      <Link
        to={"/profile"}
        onClick={() => {
          props.setmenu(!props.menu);
        }}
      >
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
            <i class="fa-solid fa-user"></i>
          </div>
          <div>My Profile</div>
        </div>
      </Link>

      <div
        className=" w-full h-20 border-b flex justify-start items-center"
        onClick={() => {
          props.setmenu(!props.menu);
        }}
      >
        <div className=" w-1/12" onClick={handleLogout}>
          <i class="fa-solid fa-right-from-bracket"></i>
        </div>
        <div>Logout</div>
      </div>
    </div>
  );
};

export default HambergerMenu;
