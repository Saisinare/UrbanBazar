import React, {  useState } from "react";
import { Link, useNavigate,} from "react-router-dom";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { setSellerMode } from "../redux/slice/user";

const Header = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSwitch = (e) => {
    if (e.target.checked) {
      dispatch(setSellerMode(true));
      navigate('/seller/products')
    } else {
      dispatch(setSellerMode(false));
      navigate('/')
    }
  };

  const [modal, setmodal] = useState(false);
  return (
    <>
      <div className="top-0 w-screen h-16 px-10 bg-gray-100 flex items-center font-semibold justify-between z-40">
        <div className="list flex">
          <Link to={`${userState.SellerMode ? "seller/dashboard" : "/shop"}`}>
            <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">
            {(userState.SellerMode)? "Dashboard" : "Shop" }
            </div>
          </Link>
          <Link to={`${userState.SellerMode ? "seller/products" : "/orders"}`}>
            <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">
            {(userState.SellerMode)? "My Products" : "My Orders" }
            </div>
          </Link>
          <Link
            to={`${userState.SellerMode ? "seller/addproduct" : "/support"}`}
          >
            <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">
            {(userState.SellerMode)? "Add Product" : "Customer Support" }
            </div>
          </Link>
          {!userState.SellerMode && (
            <Link to="/">
              <div className="item px-3 hover:text-green-700 transition-all duration-300 ease-linear">
                Contact Us
              </div>
            </Link>
          )}
        </div>
        <div className="swiching items-center justify-center  flex h-full w-auto text-green-600">
          <button
            onClick={() => {
              setmodal(true);
            }}
          >
            {(userState && (userState.user) && userState.user.isSeller) ? (
              <div className=" font-bold text-sm flex  items-center gap-2">
                {(userState.SellerMode)?'Seller':'Customer'} 
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  id="seller-switch "
                  onChange={handleSwitch}
                  checked={userState.SellerMode}
                />
                <div class="w-11 h-5 border-2  p-1    rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all  peer-checked:bg-green-600"></div>
              </label>
              </div>
            ) : (
              "Become A Seller"
            )}
          </button>
        </div>
      </div>
      {userState && userState.user && !userState.user.isSeller && modal && <Modal setmodal={setmodal} />}
    </>
  );
};

export default Header;
