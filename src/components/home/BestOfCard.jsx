import React from "react";
import BestOfItem from "./BestOfItem";

const BestOfCard = (props) => {
  return (
    <>
      <div class={`w-full p-2  h-16 flex justify-start items-center shadow  pr-12`}>
        <h1 className="font-bold font-sans text-2xl text-black ">
            
          Best Of {props.title}
        </h1>
      </div>
      <div class="w-full p-2 mb-2 h-64 flex justify-center bg-gray-100 shadow ">
        <BestOfItem />
        <BestOfItem />
        <BestOfItem />
        <BestOfItem />
        <BestOfItem />
        <div className="viewmore w-1/6 bg-slate-100 mx-1 flex flex-col items-center justify-center text-black">
          <button class="w-15 bg-slate-900 cursor-pointer text-white p-3  px-5 font-bold ">
            see more
          </button>
        </div>
      </div>
    </>
  );
};

export default BestOfCard;
