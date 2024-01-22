import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin, setSellerMode } from "../redux/slice/user";
import { setlogin } from "../redux/slice/login";
import Cookies from "js-cookie";

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

      <Link to={"/cart"}  onClick={ ()=>{props.setmenu(!props.menu)}}>
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
          <i class="fa-solid fa-cart-shopping"></i>
          </div>
          <div>My Cart</div>
        </div>
      </Link>

      <Link to={`${userstate.SellerMode ? "seller/dashboard" : "/shop"}`} onClick={ ()=>{props.setmenu(!props.menu)}}>
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
            <i className=" fa  fa-shopping-bag"></i>
          </div>
          <div>Shop</div>
        </div>
      </Link>

      <Link to={`${userstate.SellerMode ? "seller/products" : "/orders"}`} onClick={ ()=>{props.setmenu(!props.menu)}}>
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
            <i class="fa-solid fa-box"></i>
          </div>
          <div>My Orders</div>
        </div>
      </Link>

      {userstate.SellerMode && (
        <Link to={`/seller/addproduct`}>
          <div className=" w-full h-20 border-b flex justify-start items-center" onClick={ ()=>{props.setmenu(!props.menu)}}>
            <div className=" w-1/12">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div>Add Product</div>
          </div>
        </Link>
      )}
      <Link to={"/profile"} onClick={ ()=>{props.setmenu(!props.menu)}}>
        <div className=" w-full h-20 border-b flex justify-start items-center">
          <div className=" w-1/12">
            <i class="fa-solid fa-user"></i>
          </div>
          <div>My Profile</div>
        </div>
      </Link>

      <div className=" w-full h-20 border-b flex justify-start items-center" onClick={ ()=>{props.setmenu(!props.menu)}}>
        <div className=" w-1/12" onClick={handleLogout}>
          <i class="fa-solid fa-right-from-bracket"></i>
        </div>
        <div>Logout</div>
      </div>
    </div>
  );
};

export default HambergerMenu;
