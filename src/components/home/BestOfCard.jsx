import React from "react";
import BestOfItem from "./BestOfItem";
import ProductCard from "../ProductStore/ProductCard";

const BestOfCard = (props) => {
  return (
    <>
      <div class={`w-full p-2  h-16 flex justify-start items-center pl-4 `}>
        <h1 className="font-semibold font-sans text-2xl text-black ">
          Best Of {props.title}
        </h1>
      </div>
      <div class="w-full p-2 mb-2 h-auto flex justify-center ">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </>
  );
};

export default BestOfCard;
