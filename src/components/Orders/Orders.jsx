import React from "react";
import BasicTable from "./BasicTable";

const arr = ["a", "b", "c", "c", "c"];
const Orders = () => {
  return (
    <div className=" h-fit w-screen p-8 px-24 pl-48 flex flex-col gap-5">
      <div className=" font-semibold text-xl">My Orders</div>
      <BasicTable/>
    </div>
  );
};

export default Orders;
