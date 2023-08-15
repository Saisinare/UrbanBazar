import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useSelector } from "react-redux";


const Header = () => {
  const userState = useSelector(state=>state.user)
    const [modal, setmodal] = useState(false)
  return (
    <>
      <div className="top-0 w-screen h-16 px-10 bg-gray-100 flex items-center font-semibold justify-between z-40">
        <div className="list flex">
        <Link to='/shop'>
          <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">Shop</div>
        </Link>
        <Link to='/'>
          <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">My Orders</div>
        </Link>
        <Link to='/'>
          <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">Customer Support </div>
        </Link>
        <Link to='/'>
          <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">Contact Us</div>
        </Link>
        </div>
        <div className="swiching items-center justify-center  flex h-full w-auto text-green-600">
            <button onClick={()=>{setmodal(true)}}> {((userState.user)&&(userState.user.isSeller))?"seller Mode":"Become A Seller"}</button>
        </div>
      </div>
      {modal&&<Modal setmodal={setmodal} />}  
    </>
  );
};

export default Header;
