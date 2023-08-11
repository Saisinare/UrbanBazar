import React from "react";

const BestOfItem = () => {
  return (
  <div className="w-1/6 bg-slate-200  mx-1 flex flex-col items-center text-black py-2">
    <div className="image h-52">
        <img src="icons/user.png" alt="" />
    </div>
    <div className="title">
        <h1 className="font-bold pb-2">This is Title</h1>
    </div>
    <div className="price text-slate-600">
    From 6969
    </div>
  </div>
  );
};

export default BestOfItem;
