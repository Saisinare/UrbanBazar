import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import axios from "axios";

const ProfilePage = () => {
  const [user, setuser] = useState("")
  
  useEffect(() => {
    axios.get("http://localhost:8000/api/user",{withCredentials:true}).then(res=>{
      console.log(res)
      setuser("username")
      console.log(user)
    }).catch(err=>{
      console.log(err)
    })
  }, [])

  return (
    <div className="w-full h-fit  ">
      <Navigation />
      <div className="  p-12 pt-0 w-full flex ">
        <div className="p-12 w-full flex border rounded-xl bg-slate-50 shadow-xl">
          <div className=" w-1/3 h-96 flex items-center justify-center flex-col gap-2 ">
            <div className=" h-40 w-40 rounded-full border flex items-center justify-center overflow-hidden">
              <img src="" alt="user" />
            </div>
            <div className=" flex flex-col items-center justify-center">
              <div>Saisinare</div>
              <div>saisinare19@gmail.com</div>
            </div>
          </div>
          <div className=" p-12 w-2/3 h-fit ">
            <div className=" w-full h-16 border">
            </div>
            <div className=" w-full h-16 border"></div>
            <div className=" w-full h-16 border"></div>
            <div className=" w-full h-16 border"></div>
            <div className=" w-full h-16 border"></div>
            <div className=" w-full h-16 border"></div>
            <div className=" w-full h-16 border"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
