import Cookies from "js-cookie";
import React from "react";
import { setLogin, setSellerMode } from "../../redux/slice/user";
import { useDispatch, useSelector } from "react-redux";
import { setlogin } from "../../redux/slice/login";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

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
    <>
      <div className={`flex flex-col h-max fixed  w-60 bg-slate-50 border backdrop-blur-lg rounded-md font-semibold text-sm mt-16 -translate-x-28 ${userState.SellerMode && ' -translate-x-52'} `}>
        <div className="w-full p-3 cursor-pointer">
          Hello <span className="text-blue-600">Sai</span>
          <span />
        </div>
        <Link to={'/profile'}>
        <div className="w-full p-3 hover:text-green-600 cursor-pointer">
          View Profile
        </div>
        </Link>
        <div className="w-full p-3  cursor-pointer flex justify-between ">
          <p>Seller Mode</p>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              class="sr-only peer"
              id="seller-switch "
              onChange={handleSwitch}
              checked={userState.SellerMode}
            />
            <div class="w-8 h-4 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[5px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all bg-slate-200 hover:bg-slate-300 transition-all ease-in duration-100 peer-checked:bg-green-600"></div>
          </label>
        </div>
        <div
          className="w-full p-3 hover:text-red-600 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </>
  );
};

export default Profile;
