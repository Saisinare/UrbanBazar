import React, { useEffect, useState } from "react";

import axios from "axios";
import PropertyCard from "./PropertyCard";
import jsCookie from "js-cookie";

const ProfilePage = () => {
  const [user, setuser] = useState("");
  const [profile, setprofile] = useState("");

  const updateData = {};

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/user?token=${jsCookie.get("token")}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setuser(res.data.user);
        setprofile(res.data.user.profilePhoto);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [profile]);

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profile", file);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_API_URL}/user/profile/photo?token=${jsCookie.get("token")}`,
      formData,
      { withCredentials: true }
    );
    if (res.data.success) {
      setprofile(res.data.profilePhoto);
    }
  };

  const handleInputChange = async (title, val) => {
    updateData[title] = val;
    const res = await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/user?token=${jsCookie.get("token")}`, updateData, {
      withCredentials: true,
    });
  };
  return (
    <div className="w-full h-fit top-20">
      <div className=" font-bold px-12 text-base">My Profile</div>
      <div className="  md:p-12 pt-10 w-full flex ">
        <div className="p-12 pt-0 w-full flex flex-col md:flex-row shadow bg-slate-50 rounded-xl ">
          <div className=" w-full md:w-1/3 h-96 flex items-center justify-center flex-col gap-2  ">
            <div className=" flex">
              <div className=" h-40 w-40 rounded-full border flex items-center justify-center overflow-hidden shadow">
                <img
                  src={
                    profile != ""
                      ? `${process.env.REACT_APP_BACKEND_API_URL}/user_profile/` + profile
                      : "../icons/user.png"
                  }
                  alt="user"
                />
              </div>
              <i
                class="fa-solid fa-edit"
                onClick={() => {
                  document.getElementById("image").click();
                }}
              ></i>
              <input
                type="file"
                onChange={handleProfileChange}
                id="image"
                hidden
              />
            </div>
            <div className=" flex flex-col text-sm font-semibold items-center">
              <div>{user.email}</div>
              <div>{user.username}</div>
            </div>
          </div>
          <div className=" w-full md:w-2/3 md:p-12">
            <div className="w-full h-fit">
              <div className=" h-8 rounded-md w-fit text-sm  flex items-center justify-center px-2 gap-2 font-bold">
                <i class="fa-solid fa-address-card"></i> Personal Details
              </div>
              <div className="flex flex-col md:flex-row  flex-wrap">
                <PropertyCard
                  title={"Username"}
                  field={"username"}
                  value={user.username}
                  onInputChange={handleInputChange}
                />
                <PropertyCard
                  title={"Full Name"}
                  field={"fullname"}
                  value={user.fullname}
                  onInputChange={handleInputChange}
                />
                <PropertyCard
                  title={"Email Id"}
                  field={"email"}
                  value={user.email}
                  onInputChange={handleInputChange}
                />
                <PropertyCard
                  title={"Mobile No."}
                  field={"mobileNO"}
                  value={user.mobileNo}
                  onInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full h-fit ">
              <div className=" h-8 rounded-md w-fit text-sm  flex items-center justify-center px-2 gap-2 font-bold">
                <i class="fa-solid fa-location-dot"></i> Address
              </div>
              <div className="flex-row flex flex-wrap">
                <PropertyCard
                  title={"Country"}
                  field={"country"}
                  value={user.country}
                  onInputChange={handleInputChange}
                />
                <PropertyCard
                  title={"State"}
                  field={"state"}
                  value={user.state}
                  onInputChange={handleInputChange}
                />
                <PropertyCard
                  title={"Local Address"}
                  field={"localAddress"}
                  value={user.localAddress}
                  onInputChange={handleInputChange}
                />
                <PropertyCard
                  title={"Pincode "}
                  field={"pincode"}
                  value={user.pincode}
                  onInputChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
