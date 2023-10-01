import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Success = () => {
    const navigator = useNavigate()

  let sessionId;
  useEffect(() => {
    sessionId = Cookies.get("chekoutsessionId");
    console.log("sessionId =");
    console.log(sessionId);
    axios
      .post(`http://localhost:8000/order`,{sessionId:sessionId},{
      withCredentials:true,
      })
      .then((res) => {
        if(res.data.success){
            navigator('/orders')
        }
        console.log(res);
      });
  });
  return <div>Confirming Your Payment Please Wait...</div>;
};

export default Success;
