import React from "react";
import BasicTable from "./BasicTable";

const arr = ["a", "b", "c", "c", "c"];
const Orders = () => {
  return (
    <div className=" h-fit w-screen p-8 px-24  flex flex-col gap-5">
      <div className=" font-semibold text-xl">My Orders</div>
      {/* <div className=" h-14 rounded-md w-full flex overflow-hidden  ">
        {arr.map((ele) => {
          return <div className="h-full w-1/5 bg-slate-100 font-semibold flex items-center pl-2">ele</div>;
        })}
      </div> */}
      <BasicTable/>
    </div>
  );
};

export default Orders;
