import React from "react";
import BasicTable from "./BasicTable";

const arr = ["a", "b", "c", "c", "c"];
const Orders = () => {
  return (
    <div className=" h-fit w-screen md:p-8 md:px-24 md:pl-48 flex flex-col gap-5">
      <div className=" font-semibold text-xl pl-10">My Orders</div>
      <BasicTable/>
    </div>
  );
};

export default Orders;
